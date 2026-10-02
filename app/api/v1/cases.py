from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.schemas.cases import CaseStudyCreate, CaseStudyResponse, MicroTaskUpdate, TaskStatusEnum

router = APIRouter(prefix="/cases", tags=["Case Study Bank & Tracker"])

# Boshlang'ich test keyslar bazasi (Hujjat talabidagi O'zbekiston kompaniyalari misolida)
cases_db = [
    {
        "id": 1,
        "title": "Uzum Market: Hududlarda logistika va yetkazib berish tannarxini optimallashtirish",
        "company_name": "Uzum",
        "course_name": "Biznesda operatsion boshqaruv",
        "complexity": "medium",
        "description": "Farg'ona vodiysida yangi tarqatish markazlari ochilishi munosabati bilan transport logistikasi va zaxira xarajatlarini hisoblash.",
        "attachments": ["logistics_data.xlsx"]
    },
    {
        "id": 2,
        "title": "Korzinka: Yangi formatdagi do'konlar uchun narx va marja strategiyasi",
        "company_name": "Korzinka",
        "course_name": "Biznesda narx siyosati",
        "complexity": "hard",
        "description": "Raqobat sharoitida Break-even va elastiklik tahlili asosida mahsulot toifalariga optimal narx belgilash.",
        "attachments": ["pricing_model.csv"]
    },
    {
        "id": 3,
        "title": "BYD Uzbekistan: Mahalliy ishlab chiqarish va xalqaro bozorga chiqish strategiyasi",
        "company_name": "BYD Uzbekistan",
        "course_name": "Xalqaro biznes",
        "complexity": "medium",
        "description": "Markaziy Osiyo bozorida elektromobillar eksporti va raqobat ustunliklarini PESTEL va SWOT orqali tahlil qilish.",
        "attachments": []
    }
]

# Talabalar mustaqil ta'lim mikrotopshiriqlari monitoringi
student_tracker_db = {}

@router.get("/", response_model=List[CaseStudyResponse])
def list_cases(
    company: Optional[str] = Query(None, description="Kompaniya bo'yicha filter (Uzum, Korzinka va h.k.)"),
    course: Optional[str] = Query(None, description="Fan bo'yicha filter")
):
    """Kafedraning 1000 Business Cases bazasidan qidirish va saralash"""
    results = cases_db
    if company:
        results = [c for c in results if company.lower() in c["company_name"].lower()]
    if course:
        results = [c for c in results if course.lower() in c["course_name"].lower()]
    return results

@router.post("/", response_model=CaseStudyResponse)
def create_case(payload: CaseStudyCreate):
    """O'qituvchi/kafedra tomonidan yangi biznes keys qo'shish"""
    new_id = len(cases_db) + 1
    new_case = {"id": new_id, **payload.model_dump()}
    cases_db.append(new_case)
    return new_case

@router.get("/{case_id}", response_model=CaseStudyResponse)
def get_case(case_id: int):
    """Keysning to'liq ma'lumotlarini olish"""
    for c in cases_db:
        if c["id"] == case_id:
            return c
    raise HTTPException(status_code=404, detail="Bunday keys topilmadi")

@router.patch("/tracker/{student_id}/{case_id}")
def update_task_progress(student_id: int, case_id: int, payload: MicroTaskUpdate):
    """Mustaqil ta'lim mikrotopshirig'i statusi va vaqtini yangilash (Assigned -> In progress -> Submitted va h.k.)"""
    key = f"{student_id}_{case_id}"
    record = student_tracker_db.get(key, {"student_id": student_id, "case_id": case_id, "spent_hours": 0.0})
    
    record["status"] = payload.status
    if payload.spent_hours is not None:
        record["spent_hours"] += payload.spent_hours
    if payload.notes:
        record["notes"] = payload.notes
        
    student_tracker_db[key] = record
    return {"message": "Mustaqil ta'lim jarayoni yangilandi", "progress": record}
