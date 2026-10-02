from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import math
import uuid
import datetime
from app.services.llm_service import query_llm_professor

router = APIRouter()

# 1. Milliy Keyslar Ro'yxati
interactive_missions = [
    {
        "id": 1,
        "title": "Uzum Market: Mintaqaviy logistika va inqiroz boshqaruvi",
        "company": "Uzum Market",
        "course": "Biznesda operatsion boshqaruv & Logistika",
        "badge": "E-Commerce Strategy",
        "type": "logistics",
        "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "theory_brief": "Mintaqaviy fulfillment markazlari tarmog'ini optimallashtirish, kuryerlar modelini tanlash va yoqilg'i inqirozi sharoitida yetkazish tannarxini minimal darajada ushlab qolish strategiyasini ishlab chiqing.",
        "quiz": [
            {
                "id": "q1",
                "question": "Fulfillment markazining elektron tijorat logistika zanjiridagi bosh vazifasi nima?",
                "options": [
                    "Tovarlarni omborda faqat uzoq muddat saqlash",
                    "Buyurtmalarni saralash, qadoqlash va yetkazib berishga tezkor tayyorlash",
                    "Mahsulot tannarxini sun'iy ko'tarish",
                    "Soliq to'lovlarini kechiktirish"
                ],
                "correct": 1
            },
            {
                "id": "q2",
                "question": "Yetkazish vaqtining 2 barobar qisqarishi qaysi ko'rsatkichga eng katta ijobiy turtki beradi?",
                "options": [
                    "Kompaniya binosining bozor bahosiga",
                    "Mijozning qayta xarid (Retention) va konversiya darajasiga",
                    "Doimiy xarajatlarning butunlay yo'qolishiga",
                    "Faqat kuryerlarning maoshiga"
                ],
                "correct": 1
            }
        ],
        "shocks": [
            {
                "id": "fuel_crisis",
                "title": "Yoqilg'i inqirozi: Benzin/Metan 30% ga oshdi!",
                "impact_cost": 5500,
                "description": "Logistika transport xarajatlari keskin ko'tariladi."
            }
        ]
    },
    {
        "id": 2,
        "title": "Korzinka: Dinamik narx, chegirmalar va chakana savdo marjasi",
        "company": "Korzinka",
        "course": "Biznesda narx siyosati & FMCG",
        "badge": "Retail Pricing",
        "type": "retail",
        "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "theory_brief": "Raqobat sharoitida Break-even (zararsizlik) va talab elastikligi tahlili asosida FMCG mahsulot toifalariga optimal narx va savdo marjasini belgilang.",
        "quiz": [
            {
                "id": "q1",
                "question": "Birinchi ehtiyoj mollari uchun talab elastikligi koeffitsiyenti odatda qanday bo'ladi?",
                "options": [
                    "Noelastik (E < 1)",
                    "Yuqori elastik (E > 2)",
                    "Mutlaqo elastik",
                    "Nolga teng"
                ],
                "correct": 0
            }
        ],
        "shocks": [
            {
                "id": "supplier_inflation",
                "title": "Tashqi inflyatsiya: Yetkazib beruvchilar narxni 18% ga oshirdi!",
                "impact_cost": 4000,
                "description": "Mahsulot tannarxi ko'tarildi, savdo marjasini saqlash qiyinlashadi."
            }
        ]
    },
    {
        "id": 3,
        "title": "BYD Uzbekistan: Ishlab chiqarish quvvati va eksport strategiyasi",
        "company": "BYD Uzbekistan",
        "course": "Xalqaro biznes & Korporativ strategiya",
        "badge": "Automotive Export",
        "type": "automotive",
        "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "theory_brief": "Jizzax avtomobil zavodida ishlab chiqarish hajmi, butlovchi qismlar lokalizatsiyasi va Markaziy Osiyo bozoriga eksport rentabelligini tahlil qiling.",
        "quiz": [
            {
                "id": "q1",
                "question": "Lokalizatsiya darajasining ortishi avtomobil tannarxiga qanday ta'sir ko'rsatadi?",
                "options": [
                    "Bojxona to'lovlari va tashqi logistika tejalishi hisobiga tannarx pasayadi",
                    "Avtomobil tannarxi 2 barobar qimmatlashadi",
                    "Zavod faoliyati to'xtaydi",
                    "Hech qanday o'zgarish bo'lmaydi"
                ],
                "correct": 0
            }
        ],
        "shocks": [
            {
                "id": "tariff_change",
                "title": "Bojxona to'siqlari: Utilizatsiya yig'imi 20% oshirildi!",
                "impact_cost": 15000000,
                "description": "Eksport bozoridagi sotish narxiga salbiy ta'sir ko'rsatadi."
            }
        ]
    },
    {
        "id": 4,
        "title": "Artel Electronics: Yangi korxona investitsion DCF/NPV baholash loyihasi",
        "company": "Artel",
        "course": "Biznesni baholash & Korporativ moliya",
        "badge": "Corporate Valuation",
        "type": "valuation",
        "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "theory_brief": "Yangi energiya tejamkor liniyaga kiritilayotgan investitsiyalar, WACC kapital qiymati va erkin pul oqimlarini (FCFF) modellashtiring.",
        "quiz": [
            {
                "id": "q1",
                "question": "Diskont stavkasi (WACC) oshganda investitsiya loyihasining NPV (Sof joriy qiymat) ko'rsatkichi qanday o'zgaradi?",
                "options": [
                    "NPV kamayadi",
                    "NPV ortadi",
                    "O'zgarmaydi",
                    "Har doim nolga teng bo'ladi"
                ],
                "correct": 0
            }
        ],
        "shocks": [
            {
                "id": "rate_hike",
                "title": "Kredit stavkalari: Markaziy bank qayta moliyalashni 3% ga oshirdi!",
                "impact_cost": 3,
                "description": "Kompaniyaning qarz qiymati va WACC diskont stavkasi ko'tariladi."
            }
        ]
    }
]

student_records_db = [
    {"name": "Mirzarakhim B.", "group": "MM-24", "case": "Turnaround Audit & Arena", "score": 98, "status": "A'lo (Top-1)", "date": "Bugun"},
    {"name": "Jasur Aliyev", "group": "MM-24", "case": "Supply Chain EOQ", "score": 90, "status": "Tasdiqlangan", "date": "Kecha"},
    {"name": "Madina Rahimova", "group": "MM-23", "case": "BYD Localization", "score": 93, "status": "Tasdiqlangan", "date": "01.10.2026"},
    {"name": "Azizbek Normatov", "group": "MM-24", "case": "Artel DCF Valuation", "score": 85, "status": "Tasdiqlangan", "date": "30.09.2026"}
]

# Pydantic Modellari
class QuizSubmitRequest(BaseModel):
    mission_id: int
    answers: Dict[str, int]

class DynamicSimRequest(BaseModel):
    mission_id: int
    active_shock: Optional[str] = None
    hub_count: Optional[int] = 2
    courier_model: Optional[str] = "ichki_shtat"
    marketing_budget: Optional[float] = 15000000.0
    retail_markup: Optional[int] = 22
    retail_discount: Optional[int] = 5
    store_count: Optional[int] = 25
    production_volume: Optional[int] = 1200
    export_share: Optional[int] = 30
    localization_rate: Optional[int] = 45
    capex_investment: Optional[float] = 50000000000.0
    wacc_rate: Optional[float] = 16.0
    operating_cash_flow_growth: Optional[int] = 15

class TeamDecision(BaseModel):
    name: str = "Jamoa"
    price: int = Field(..., ge=6000, le=30000)
    marketing: int = Field(..., ge=0)
    quality: int = Field(..., ge=0)

class DualBattleRequest(BaseModel):
    round_number: int = Field(1, ge=1, le=10)
    team_a: TeamDecision
    team_b: TeamDecision

class ForensicAuditRequest(BaseModel):
    cut_admin_expenses_pct: int = Field(20, ge=0, le=50)
    restructure_debt_months: int = Field(12, ge=0, le=24)
    layoff_redundant_staff_pct: int = Field(15, ge=0, le=40)
    discount_slow_inventory_pct: int = Field(25, ge=0, le=30)

class SupplyChainEOQRequest(BaseModel):
    annual_demand: int = Field(24000, ge=1000)
    order_cost: float = Field(250000.0, ge=10000.0)
    holding_cost_unit: float = Field(12000.0, ge=1000.0)
    lead_time_days: int = Field(5, ge=1, le=30)
    safety_factor_z: float = Field(1.65, ge=1.0, le=3.0)

class DynamicPricingRequest(BaseModel):
    base_price: float = Field(50000.0, ge=10000.0)
    price_change_pct: int = Field(10, ge=-40, le=50)
    elasticity_coefficient: float = Field(-1.6, le=0.0)
    unit_cost: float = Field(32000.0)

class SecurityStressTestRequest(BaseModel):
    fx_devaluation_pct: int = Field(20, ge=0, le=60)
    customs_tariff_pct: int = Field(15, ge=0, le=40)
    compliance_reserve_fund: float = Field(50000000.0, ge=0)

class AIChatMessage(BaseModel):
    role: str
    content: str

class AIChatRequest(BaseModel):
    mission_id: int
    history: List[AIChatMessage]
    decision_summary: str
    round_index: int = 1

# API Yo'nalishlari
@router.get("/missions", tags=["Keyslar"])
def get_missions():
    return interactive_missions

@router.post("/missions/quiz-check", tags=["Keyslar"])
def check_quiz(req: QuizSubmitRequest):
    mission = next((m for m in interactive_missions if m["id"] == req.mission_id), interactive_missions[0])
    total = len(mission["quiz"])
    correct = sum(1 for q in mission["quiz"] if req.answers.get(q["id"]) == q["correct"])
    score = (correct / total) * 100
    return {
        "score_percent": score,
        "correct": correct,
        "total": total,
        "passed": score >= 50,
        "message": "Sinovdan o'tdingiz! Simulyatsiya ochildi." if score >= 50 else "Ball yetarli emas. Qayta urinib ko'ring."
    }

@router.post("/missions/simulate-advanced", tags=["Keyslar"])
def dynamic_simulation(req: DynamicSimRequest):
    mission = next((m for m in interactive_missions if m["id"] == req.mission_id), interactive_missions[0])
    m_type = mission.get("type", "logistics")
    shock_applied = req.active_shock is not None

    if m_type == "logistics":
        extra_cost = 5500 if req.active_shock == "fuel_crisis" else 0
        time = max(8, 36 - (req.hub_count * 5))
        cost_unit = 21000 - (req.hub_count * 1500) + extra_cost + (-1800 if req.courier_model == "ichki_shtat" else 1200)
        orders = 8500 + int(req.marketing_budget / 8000)
        revenue = orders * 48000
        total_cost = (orders * max(10000, cost_unit)) + (req.hub_count * 2000000) + req.marketing_budget
        profit = revenue - total_cost
        share = min(58, max(15, 25 + (req.hub_count * 4) - (8 if shock_applied else 0)))
        return {
            "type": "logistics",
            "kpis": [
                {"label": "Yetkazish tezligi", "val": f"{time} soat", "color": "emerald"},
                {"label": "Birlik tannarx", "val": f"{cost_unit:,.0f} so'm", "color": "indigo"},
                {"label": "Kunlik sof foyda", "val": f"{profit:,.0f} so'm", "color": "teal"}
            ],
            "chart_bar": {"labels": ["Tushum", "Xarajat", "Foyda"], "data": [revenue, total_cost, max(0, profit)]},
            "chart_pie": {"labels": ["Bizning Ulush", "Raqobatchilar"], "data": [share, 100 - share]}
        }
    elif m_type == "retail":
        base_cost = 14000 + (4000 if req.active_shock == "supplier_inflation" else 0)
        effective_price = base_cost * (1 + (req.retail_markup - req.retail_discount) / 100.0)
        daily_clients = req.store_count * (1800 - (req.retail_markup * 25))
        revenue = daily_clients * effective_price
        cogs = daily_clients * base_cost
        fixed_store = req.store_count * 4500000
        profit = revenue - cogs - fixed_store
        bep = int(fixed_store / max(1, (effective_price - base_cost)))
        share = min(45, max(10, 18 + (req.store_count // 2)))
        return {
            "type": "retail",
            "kpis": [
                {"label": "Chakana marja", "val": f"{req.retail_markup - req.retail_discount}%", "color": "emerald"},
                {"label": "Zararsizlik (BEP)", "val": f"{bep:,} mijoz", "color": "indigo"},
                {"label": "Kunlik sof foyda", "val": f"{profit:,.0f} so'm", "color": "teal"}
            ],
            "chart_bar": {"labels": ["Tushum", "Xarajat", "Sof Foyda"], "data": [revenue, cogs + fixed_store, max(0, profit)]},
            "chart_pie": {"labels": ["Korzinka Ulushi", "Boshqalar"], "data": [share, 100 - share]}
        }
    elif m_type == "automotive":
        base_cost = 210000000 + (15000000 if req.active_shock == "tariff_change" else 0)
        unit_cost = base_cost - (req.localization_rate * 600000)
        selling_price = 260000000
        revenue = req.production_volume * selling_price
        total_cost = (req.production_volume * unit_cost) + 12000000000
        profit = revenue - total_cost
        export_val = (req.production_volume * (req.export_share / 100.0) * selling_price) / 12800
        return {
            "type": "automotive",
            "kpis": [
                {"label": "Avtomobil tannarxi", "val": f"{unit_cost/1000000:,.1f} mln so'm", "color": "emerald"},
                {"label": "Oylik eksport", "val": f"${export_val:,.0f}", "color": "indigo"},
                {"label": "Oylik sof foyda", "val": f"{profit/1000000:,.0f} mln so'm", "color": "teal"}
            ],
            "chart_bar": {"labels": ["Avto Tushum", "Zavod Xarajatlari", "Sof Foyda"], "data": [revenue, total_cost, max(0, profit)]},
            "chart_pie": {"labels": ["Eksport Ulushi", "Mahalliy Bozor"], "data": [req.export_share, 100 - req.export_share]}
        }
    else:
        wacc = req.wacc_rate + (3.0 if req.active_shock == "rate_hike" else 0.0)
        annual_cf = 16000000000 * (1 + req.operating_cash_flow_growth / 100.0)
        r = wacc / 100.0
        d_cfs = [annual_cf / ((1 + r) ** y) for y in range(1, 6)]
        npv = sum(d_cfs) - req.capex_investment
        payback = round(req.capex_investment / annual_cf, 1) if annual_cf > 0 else 0
        return {
            "type": "valuation",
            "kpis": [
                {"label": "Haqiqiy WACC", "val": f"{wacc:.1f}%", "color": "emerald"},
                {"label": "Qoplanish muddati", "val": f"{payback} yil", "color": "indigo"},
                {"label": "Loyihaning NPV qiymati", "val": f"{npv/1000000000:,.1f} mlrd so'm", "color": "teal"}
            ],
            "chart_bar": {"labels": ["Disk. Pul Oqimi", "Boshl. Investitsiya", "NPV"], "data": [sum(d_cfs), req.capex_investment, max(0, npv)]},
            "chart_pie": {"labels": ["Kutilayotgan NPV", "Xavflar Zaxirasi"], "data": [max(10, min(90, int(npv/1000000000))), 30]}
        }

# Modul 3: Financial Forensic
@router.post("/lab/forensic-audit", tags=["Yangi Modullar"])
def forensic_audit_sim(req: ForensicAuditRequest):
    initial_revenue = 450000000.0
    initial_cogs = 290000000.0
    initial_admin_cost = 95000000.0
    initial_salary_cost = 85000000.0
    initial_debt_service = 40000000.0

    saved_admin = initial_admin_cost * (req.cut_admin_expenses_pct / 100.0)
    saved_salary = initial_salary_cost * (req.layoff_redundant_staff_pct / 100.0)
    debt_relief_factor = min(0.6, req.restructure_debt_months * 0.025)
    adjusted_debt_service = initial_debt_service * (1.0 - debt_relief_factor)
    cash_injection_from_inventory = 120000000.0 * (req.discount_slow_inventory_pct / 100.0) * 0.85

    new_total_expenses = initial_cogs + (initial_admin_cost - saved_admin) + (initial_salary_cost - saved_salary) + adjusted_debt_service
    operational_profit = initial_revenue - new_total_expenses
    final_cash_flow = operational_profit + (cash_injection_from_inventory / 6.0)
    is_recovered = final_cash_flow > 0 and operational_profit > 10000000.0

    return {
        "initial_gap": -60000000.0,
        "operational_profit": operational_profit,
        "final_cash_flow": final_cash_flow,
        "monthly_burn_rate_saved": saved_admin + saved_salary + (initial_debt_service - adjusted_debt_service),
        "is_recovered": is_recovered,
        "verdict": "Ajoyib audit! Korxona kassa uzilishidan chiqarildi va rentabellik tiklandi." if is_recovered else "Xarajatlar hali ham yuqori, kassa uzilishi to'liq yopilmadi."
    }

# Modul 4: Supply Chain & EOQ
@router.post("/lab/supply-chain-eoq", tags=["Yangi Modullar"])
def supply_chain_eoq_sim(req: SupplyChainEOQRequest):
    eoq = math.sqrt((2 * req.annual_demand * req.order_cost) / req.holding_cost_unit)
    optimal_orders_per_year = req.annual_demand / eoq
    daily_demand = req.annual_demand / 365.0
    lead_time_demand = daily_demand * req.lead_time_days
    sigma_demand = daily_demand * 0.2
    safety_stock = req.safety_factor_z * math.sqrt(req.lead_time_days) * sigma_demand
    reorder_point = lead_time_demand + safety_stock
    annual_order_cost = optimal_orders_per_year * req.order_cost
    annual_holding_cost = (eoq / 2.0) * req.holding_cost_unit
    total_inventory_cost = annual_order_cost + annual_holding_cost

    return {
        "eoq_units": round(eoq),
        "orders_per_year": round(optimal_orders_per_year, 1),
        "safety_stock_units": round(safety_stock),
        "reorder_point_units": round(reorder_point),
        "total_annual_inventory_cost": round(total_inventory_cost)
    }

# Modul 5: Dynamic Pricing
@router.post("/lab/dynamic-pricing", tags=["Yangi Modullar"])
def dynamic_pricing_sim(req: DynamicPricingRequest):
    price_ratio = 1 + (req.price_change_pct / 100.0)
    new_price = req.base_price * price_ratio
    demand_change_pct = req.elasticity_coefficient * req.price_change_pct
    base_sales_volume = 10000
    new_sales_volume = max(0, int(base_sales_volume * (1 + (demand_change_pct / 100.0))))
    base_profit = base_sales_volume * (req.base_price - req.unit_cost)
    new_revenue = new_sales_volume * new_price
    new_profit = new_sales_volume * (new_price - req.unit_cost)

    return {
        "new_price": round(new_price),
        "new_volume": new_sales_volume,
        "volume_change_pct": round(demand_change_pct, 1),
        "new_revenue": round(new_revenue),
        "new_profit": round(new_profit),
        "profit_delta": round(new_profit - base_profit),
        "is_optimal": new_profit > base_profit
    }

# Modul 6: Security Stress-Test
@router.post("/lab/security-stress-test", tags=["Yangi Modullar"])
def security_stress_test_sim(req: SecurityStressTestRequest):
    base_import_costs = 250000000.0
    devaluation_hit = base_import_costs * (req.fx_devaluation_pct / 100.0)
    customs_hit = base_import_costs * (req.customs_tariff_pct / 100.0)
    total_risk_exposure = devaluation_hit + customs_hit
    net_vulnerability = total_risk_exposure - req.compliance_reserve_fund
    survival_score = max(0, min(100, int(100 - (net_vulnerability / 2500000.0))))

    return {
        "total_risk_exposure": round(total_risk_exposure),
        "devaluation_hit": round(devaluation_hit),
        "customs_hit": round(customs_hit),
        "coverage_ratio": round((req.compliance_reserve_fund / max(1.0, total_risk_exposure)) * 100, 1),
        "survival_score": survival_score,
        "risk_status": "Himoyalangan" if survival_score >= 70 else ("Xavfli Hudud" if survival_score >= 40 else "Kritik Xatar")
    }

# Bozor Jangi (Duel)
@router.post("/battle/play-round", tags=["Bozor Dueli"])
def play_dual_battle(req: DualBattleRequest):
    total_market_demand = 25000
    r_num = req.round_number
    t_a = req.team_a
    t_b = req.team_b

    a_price_score = max(1.0, (26000 - t_a.price) / 1000.0)
    b_price_score = max(1.0, (26000 - t_b.price) / 1000.0)
    a_mkt_score = t_a.marketing / 2000000.0
    b_mkt_score = t_b.marketing / 2000000.0
    a_qual_score = t_a.quality / 1500000.0
    b_qual_score = t_b.quality / 1500000.0

    a_power = (a_price_score * 1.8) + a_mkt_score + a_qual_score
    b_power = (b_price_score * 1.8) + b_mkt_score + b_qual_score
    total_power = a_power + b_power

    a_share = round((a_power / total_power) * 100, 1)
    b_share = round(100.0 - a_share, 1)

    a_orders = int((a_share / 100.0) * total_market_demand)
    b_orders = total_market_demand - a_orders

    a_unit_cost = 8500 + int(t_a.quality / 5000.0)
    b_unit_cost = 8500 + int(t_b.quality / 5000.0)

    a_revenue = a_orders * t_a.price
    a_costs = (a_orders * a_unit_cost) + t_a.marketing + t_a.quality
    a_net_profit = a_revenue - a_costs

    b_revenue = b_orders * t_b.price
    b_costs = (b_orders * b_unit_cost) + t_b.marketing + t_b.quality
    b_net_profit = b_revenue - b_costs

    return {
        "round": r_num,
        "team_a": {"name": t_a.name, "orders": a_orders, "market_share": a_share, "revenue": a_revenue, "net_profit": a_net_profit},
        "team_b": {"name": t_b.name, "orders": b_orders, "market_share": b_share, "revenue": b_revenue, "net_profit": b_net_profit},
        "analysis": f"{r_num}-chorak yakunlandi. Shiddatli raqobat qayd etildi.",
        "winner": "team_a" if a_net_profit > b_net_profit else ("team_b" if b_net_profit > a_net_profit else "draw")
    }

# Sokratik SI Himoyasi API
@router.post("/missions/ai-debate", tags=["Keyslar"])
async def ai_debate_chat(req: AIChatRequest):
    round_idx = req.round_index
    conv_history = [{"role": m.role, "content": m.content} for m in req.history]

    eval_result = await query_llm_professor(
        history=conv_history,
        case_summary=req.decision_summary,
        round_index=round_idx
    )

    reply_text = eval_result.get("reply", "Qaroringiz qabul qilindi.")
    defense_score = eval_result.get("defense_score", 85)
    is_round_done = eval_result.get("round_complete", True)

    next_r = round_idx + 1 if (is_round_done and round_idx < 3) else round_idx
    is_final = round_idx >= 3 and is_round_done

    response_data = {
        "reply": reply_text,
        "next_round": next_r,
        "round_complete": is_round_done,
        "defense_score": defense_score,
        "is_ready_for_certificate": is_final
    }

    if is_final:
        cert_id = f"TSUE-BIZLAB-{uuid.uuid4().hex[:8].upper()}"
        today_str = datetime.date.today().strftime("%d.%m.%Y")
        
        # Mantiqiy to'g'rilash: Natijani Kafedra Paneli reyting bazasiga avtomatik qo'shish
        student_records_db.insert(0, {
            "name": "Mirzarakhim B.",
            "group": "MM-24",
            "case": req.decision_summary[:28],
            "score": defense_score,
            "status": "Imtiyozli" if defense_score >= 90 else "Tasdiqlangan",
            "date": "Hozirgina"
        })
        today_str = datetime.date.today().strftime("%d.%m.%Y")
        response_data["certificate_data"] = {
            "cert_id": cert_id,
            "date": today_str,
            "score": defense_score,
            "verdict": "Imtiyozli muvaffaqiyat (Honors)" if defense_score >= 90 else "Muvaffaqiyatli himoya",
            "qr_url": f"https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://tsue.uz/verify/{cert_id}"
        }

    return response_data

@router.get("/battle/scoreboard", tags=["Scoreboard"])
def get_scoreboard_data():
    return {
        "tournament_name": "TDIU BIZLAB CHEMPIONATI 2026",
        "market_status": "Jonli Savdo Sessiyasi",
        "total_rounds": 4,
        "current_round": 2,
        "active_match": {
            "team_a": {"name": "Uzum Express", "members": "Mirzarakhim B., Azizbek N.", "treasury": 284500000, "market_share": 58.4, "daily_orders": 14600, "net_profit": 34500000},
            "team_b": {"name": "Yandex / Express24", "members": "Jasur A., Madina R.", "treasury": 235000000, "market_share": 41.6, "daily_orders": 10400, "net_profit": 15200000}
        },
        "standings": [
            {"rank": 1, "team": "Uzum Express", "group": "MM-24", "wins": 3, "losses": 1, "treasury": 342000000, "score": 98},
            {"rank": 2, "team": "Yandex Delivery", "group": "MM-24", "wins": 2, "losses": 2, "treasury": 289000000, "score": 91},
            {"rank": 3, "team": "Korzinka Go", "group": "MM-23", "wins": 2, "losses": 2, "treasury": 265000000, "score": 88},
            {"rank": 4, "team": "Bringo Express", "group": "MM-23", "wins": 1, "losses": 3, "treasury": 210000000, "score": 82}
        ]
    }

class BoardPitchRequest(BaseModel):
    battle_profit: float = 25000000.0
    forensic_cash_flow: float = 15000000.0
    eoq_annual_cost: float = 12000000.0
    pricing_profit_delta: float = 8000000.0
    survival_score: int = 78
    student_name: str = "Mirzarakhim B."

@router.post("/board/evaluate-pitch", tags=["Boshqaruv Kengashi"])
def evaluate_board_pitch(req: BoardPitchRequest):
    # 6 modul ma'lumotlarini yaxlit kapitallashuvga aylantirish
    annual_ebitda = (req.battle_profit * 4) + (req.forensic_cash_flow * 12) + req.pricing_profit_delta - (req.eoq_annual_cost * 0.5)
    base_multiple = 4.2 + (req.survival_score / 50.0)
    company_valuation = max(100000000.0, annual_ebitda * base_multiple)

    # 3 yillik kapitallashuv prognozi
    proj_y1 = round(company_valuation)
    proj_y2 = round(company_valuation * 1.22)
    proj_y3 = round(company_valuation * 1.48)

    # 3 ta Virtual Direktor Xulosasi
    cfo_status = "Tasdiqlandi" if req.forensic_cash_flow > 0 else "Rad etildi (Kassa defitsiti)"
    cfo_comment = "Kassa oqimi ijobiy hududda. Korxona likvidligi qayta tiklandi va bankrotlik xavfi bartaraf etildi." if req.forensic_cash_flow > 0 else "Operatsion pul oqimi manfiy! Qarz yuklamasi va ma'muriy xarajatlarni zudlik bilan qisqartirish shart."

    coo_status = "Optimal" if req.eoq_annual_cost < 20000000.0 else "Xarajatlar yuqori"
    coo_comment = "EOQ va xavfsizlik zaxirasi optimal darajada. Ta'minot uzilishlariga qarshi bufer mavjud." if req.eoq_annual_cost < 20000000.0 else "Ombor saqlash xarajatlari shishirilgan. Buyurtma partiyalari hajmini qayta ko'rib chiqing."

    cro_status = "Himoyalangan" if req.survival_score >= 70 else ("Xavfli" if req.survival_score >= 40 else "Kritik")
    cro_comment = f"Stress-test natijasi: {req.survival_score}/100. Tashqi devalvatsiya va soliq to'siqlariga chidamlilik kafolatlangan." if req.survival_score >= 70 else "Tashqi valyuta shoklariga nisbatan korxona himoyalanmagan. Zaxira fondini oshirish kerak."

    board_score = min(99, max(50, int((req.survival_score * 0.4) + (35 if req.forensic_cash_flow > 0 else 10) + (25 if req.battle_profit > 0 else 5))))
    board_decision = "LOYIHA BIR OVOZDAN MA'QULLANDI" if board_score >= 80 else "QAYTA ISHLASH SHARTI BILAN QABUL QILINDI"

    return {
        "board_score": board_score,
        "board_decision": board_decision,
        "annual_ebitda": round(annual_ebitda),
        "company_valuation": round(company_valuation),
        "valuation_forecast": [proj_y1, proj_y2, proj_y3],
        "reviews": [
            {"role": "CFO (Moliyaviy direktor)", "name": "Prof. A. Yusupov", "status": cfo_status, "comment": cfo_comment, "color": "emerald" if req.forensic_cash_flow > 0 else "rose"},
            {"role": "COO (Operatsion direktor)", "name": "Dots. M. Ergashev", "status": coo_status, "comment": coo_comment, "color": "indigo"},
            {"role": "CRO (Xavflar bo'yicha direktor)", "name": "Kafedra eksperti S. Rajabov", "status": cro_status, "comment": cro_comment, "color": "amber" if req.survival_score >= 70 else "rose"}
        ]
    }
