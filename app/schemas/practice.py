from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum

class TaskStatusEnum(str, Enum):
    assigned = "assigned"
    started = "started"
    in_progress = "in_progress"
    submitted = "submitted"
    reviewed = "reviewed"
    completed = "completed"

# 1. 7 bosqichli amaliy topshiriq sxemasi (Practice Lab)
class SubmissionStepUpdate(BaseModel):
    step_problem: Optional[str] = Field(None, description="1. Muammoni aniqlash va bayon qilish")
    step_data: Optional[str] = Field(None, description="2. Boshlang'ich ma'lumotlar va ko'rsatkichlar")
    step_analysis: Optional[str] = Field(None, description="3. Tahlil usullari (SWOT, PESTEL, Porter, BCG)")
    step_options: Optional[str] = Field(None, description="4. Yechim variantlari va alternativlar")
    step_decision: Optional[str] = Field(None, description="5. Qabul qilingan yakuniy yechim")
    step_justification: Optional[str] = Field(None, description="6. Qarorning iqtisodiy asosi va hisob-kitoblari")
    step_conclusion: Optional[str] = Field(None, description="7. Yakuniy xulosalar")

# 2. 100 ballik ochiq baholash rubrikasi (Assessment Center)
class EvaluationCreate(BaseModel):
    submission_id: int
    score_problem: int = Field(..., ge=0, le=10, description="Muammoni tushunish (maks 10 ball)")
    score_theory: int = Field(..., ge=0, le=15, description="Nazariy yondashuv (maks 15 ball)")
    score_data_analysis: int = Field(..., ge=0, le=20, description="Ma'lumotlar tahlili (maks 20 ball)")
    score_calculation: int = Field(..., ge=0, le=20, description="Hisob-kitob (maks 20 ball)")
    score_decision: int = Field(..., ge=0, le=20, description="Qarorni asoslash (maks 20 ball)")
    score_conclusion: int = Field(..., ge=0, le=10, description="Xulosa (maks 10 ball)")
    score_sources: int = Field(..., ge=0, le=5, description="Manbalardan foydalanish (maks 5 ball)")
    feedback: Optional[str] = Field(None, description="O'qituvchining shakllantiruvchi fikr-mulohazasi")

# 3. Keys yaratish sxemasi (Case Study Bank)
class CaseStudyCreate(BaseModel):
    title: str = Field(..., description="Keys nomi")
    company_name: str = Field(..., description="Kompaniya nomi (Uzum, Korzinka, Artel, BYD va h.k.)")
    course_name: str = Field(..., description="Fan nomi")
    complexity: str = Field("medium", description="Murakkablik darajasi")
    description: str = Field(..., description="Keysning to'liq tavsifi")

# 4. Mustaqil ta'lim mikrotopshirig'i sxemasi (Independent Study Tracker)
class MicroTaskUpdate(BaseModel):
    status: TaskStatusEnum
    spent_hours: Optional[float] = Field(None, description="Sarflangan vaqt (soat)")
    notes: Optional[str] = Field(None, description="Talaba qisqa eslatmasi")

# 5. Pricing Simulator hisob-kitob sxemasi
class BreakEvenCalcRequest(BaseModel):
    fixed_costs: float = Field(..., description="Doimiy xarajatlar (masalan: ijara, oyliklar - so'mda)")
    price_per_unit: float = Field(..., description="Birlik mahsulot sotish narxi (so'm)")
    variable_cost_per_unit: float = Field(..., description="Birlik mahsulot o'zgaruvchan xarajati (tannarxi)")
    target_profit: Optional[float] = Field(0.0, description="Kutilayotgan maqsadli sof foyda")

# 6. AI Tutor bilan muloqot va tahlil so'rovi
class AITutorFeedbackRequest(BaseModel):
    step_name: str = Field(..., description="Qaysi qadam tahlil qilinmoqda: masalan, step_analysis yoki step_problem")
    user_text: str = Field(..., description="Talaba yozgan tahlil matni")
    context_case: Optional[str] = Field(None, description="Keys konteksti (masalan, Uzum yoki Korzinka)")
