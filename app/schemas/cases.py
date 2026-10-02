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

# Keys yaratish va ko'rish sxemasi
class CaseStudyBase(BaseModel):
    title: str = Field(..., description="Keys nomi, masalan: Uzum ekotizimi logistika strategiyasi")
    company_name: str = Field(..., description="Kompaniya nomi: Uzum, Korzinka, Artel, BYD va h.k.")
    course_name: str = Field(..., description="Fan nomi: Xalqaro biznes, Biznes strategiyasi va h.k.")
    complexity: str = Field("medium", description="Murakkablik: oson, o'rta, qiyin")
    description: str = Field(..., description="Keysning to'liq tavsifi va muammoli vaziyat")
    attachments: Optional[List[str]] = Field(default=[], description="Biriktirilgan fayllar yoki jadvallar")

class CaseStudyCreate(CaseStudyBase):
    pass

class CaseStudyResponse(CaseStudyBase):
    id: int

# Mustaqil ta'lim mikrotopshirig'i sxemasi
class MicroTaskUpdate(BaseModel):
    status: TaskStatusEnum
    spent_hours: Optional[float] = Field(None, description="Talaba tomonidan sarflangan vaqt (soatda)")
    notes: Optional[str] = Field(None, description="Talaba eslatmasi yoki qisqa hisoboti")
