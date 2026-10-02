import re
from typing import List, Dict, Any

def smart_autonomous_professor(msg: str, round_idx: int, case_title: str) -> Dict[str, Any]:
    text = (msg or "").strip().lower()
    length = len(text)
    
    # 1. Yuzaki javoblarni tekshirish (qisqa yoki ma'nosiz bo'lsa o'tkazmaydi)
    numbers = re.findall(r'\d+', text)
    has_numbers = len(numbers) > 0

    if length < 15 or text in ["yaxshi", "tushundim", "ha", "togri", "rentabellik", "tannarx"]:
        return {
            "reply": "Bu ilmiy asos emas, balki shunchaki yuzaki gap. Aniq raqamli ko'rsatkichlar qani? Tanlangan parametrlar bo'yicha tannarx, rentabellik yoki xarajatlar dinamikasini ko'rsating!",
            "defense_score": 35,
            "round_complete": False
        }

    # Iqtisodiy mezonlar
    has_cost = any(w in text for w in ["tannarx", "xarajat", "yoqilgi", "ombor", "ijara", "oylik", "autsorsing", "birlik"])
    has_margin = any(w in text for w in ["rentabellik", "marja", "foyda", "daromad", "tushum", "bep", "zararsizlik"])
    has_risk = any(w in text for w in ["zaxira", "kassa", "uzilish", "inqiroz", "fors-major", "xavf", "bufer", "likvidlik"])
    has_finance = any(w in text for w in ["npv", "wacc", "investitsiya", "diskont", "fcff", "qoplanish", "kapital"])
    has_market = any(w in text for w in ["ulush", "raqobat", "elastiklik", "mijoz", "talab", "lokalizatsiya", "eksport"])

    arg_count = sum([has_cost, has_margin, has_risk, has_finance, has_market])
    base_score = 55 + (arg_count * 8) + (10 if has_numbers else 0)
    score = min(98, max(42, base_score))

    if arg_count < 1 and not has_numbers:
        return {
            "reply": "Fikringizda boshqaruv mantig'i ko'rinmayapti. Qaroringiz korxona moliyaviy barqarorligiga qanday ta'sir qiladi? Aniq ko'rsatkichlar (marja, tannarx yoki likvidlik) bilan qayta tushuntiring.",
            "defense_score": 45,
            "round_complete": False
        }

    # 1-RAUND: QARORNING ZAIF TOMONLARI
    if round_idx == 1:
        if any(w in case_title.lower() for w in ["uzum", "logistika"]) or any(w in text for w in ["hub", "kuryer"]):
            reply = (
                "Hublar sonini oshirish yetkazish vaqtini qisqartirishi mumkin, biroq omborlarning doimiy operatsion xarajati (OPEX) keskin o'sadi. "
                "Agar kuryerlarni autsorsingdan ichki shtatga olgan bo'lsangiz, oylik maosh fondi va risklar oshadi. "
                "Ushbu qaroringiz buyurtmalar kamaygan mavsumda o'zini qanday oqlaydi?"
            )
        elif any(w in case_title.lower() for w in ["korzinka", "narx"]) or any(w in text for w in ["marja", "chegirma"]):
            reply = (
                "Chakana narx ustamasini va chegirmalarni o'zgartirganingizda talab elastikligini (Ed) hisobga oldingizmi? "
                "Chegirma orqali jalb qilingan mijozlar savat hajmi xarajatlarni qoplashga yetarlimi? "
                "Zararsizlik nuqtasi (Break-even point) necha xaridorni tashkil etdi?"
            )
        elif any(w in case_title.lower() for w in ["byd", "avto"]) or any(w in text for w in ["lokalizatsiya", "eksport"]):
            reply = (
                "Lokalizatsiyani oshirish dastlabki bosqichda katta texnologik CAPEX talab qiladi. "
                "Eksport bozoridagi narx raqobati sharoitida o'zbek komplektatsiyasining birlik tannarxi "
                "Xitoydagi masshtab effekti (Economies of Scale) bilan raqobatlasha oladimi?"
            )
        else:
            reply = (
                "Tanlangan parametrlar bo'yicha birlik tannarx va operatsion marja o'rtasidagi ziddiyatni qanday yechdingiz? "
                "Qabul qilingan o'zgarishlar qaysi xarajat moddasi (doimiy yoki o'zgaruvchan) hisobiga qoplandi?"
            )
        return {"reply": reply, "defense_score": score, "round_complete": True}

    # 2-RAUND: STRESS-TEST VA INQIROZ BOSHQARUVI
    elif round_idx == 2:
        if not has_risk and not has_finance:
            return {
                "reply": "Xatarlarni hisobga olmadingiz! Bozor har doim barqaror bo'lmaydi. Bozor zarbasi (fors-major, devalvatsiya yoki kassa uzilishi) yuz berganda korxona qanday qutqariladi? Kassa buferingiz qani?",
                "defense_score": 50,
                "round_complete": False
            }
        
        reply = (
            "Inqirozga qarshi taklifingiz mantiqan qabul qilindi. Endi eng muhim masala: "
            "Agar Markaziy bank qayta moliyalash stavkasini oshirsa yoki so'm devalvatsiyaga uchrasa, "
            "korxonangizning Erkin Pul Oqimi (FCFF) defitsitga kirmasligiga qanday kafolat berasiz? Likvidlik koeffitsiyenti saqlanadimi?"
        )
        return {"reply": reply, "defense_score": min(94, score + 6), "round_complete": True}

    # 3-RAUND: YAKUNIY ILMIY XULOSA
    else:
        final_score = min(99, max(82, score + 8))
        verdict = "Imtiyozli muvaffaqiyat (Honors) darajasida" if final_score >= 90 else "Standart akademik talablar darajasida"

        reply = (
            f"Boshqaruv himoyangiz muvaffaqiyatli yakunlandi! Siz makroiqtisodiy xatarlarni, "
            f"operatsion xarajatlar dinamikasini va korxona qiymatini hisobga olgan holda qaror qabul qildingiz. "
            f"Kafedra ilmiy kengashi qaroringizni {final_score}/100 ball bilan baholadi ({verdict}). "
            f"Sertifikat shakllantirildi."
        )
        return {"reply": reply, "defense_score": final_score, "round_complete": True}

# endpoints.py talab qilgan asinxron chaqiruv funksiyasi
async def query_llm_professor(history: List[Dict[str, str]], case_summary: str, round_index: int) -> Dict[str, Any]:
    last_msg = history[-1]["content"] if history else ""
    return smart_autonomous_professor(last_msg, round_index, case_summary)
