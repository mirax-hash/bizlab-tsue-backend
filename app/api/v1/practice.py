from fastapi import APIRouter, HTTPException
from app.schemas.practice import SubmissionStepUpdate, EvaluationCreate

router = APIRouter(prefix="/practice", tags=["Practice Lab & Assessment"])

# Xotirada test qilish uchun sodda baza (in-memory mock)
mock_submissions = {}
mock_evaluations = {}

@router.get("/submission/{student_id}/{assignment_id}")
def get_submission(student_id: int, assignment_id: int):
    """Talabaning mavjud javoblarini olish"""
    key = f"{student_id}_{assignment_id}"
    if key not in mock_submissions:
        return {"status": "assigned", "data": None}
    return mock_submissions[key]

@router.post("/submission/{student_id}/{assignment_id}/save-draft")
def save_draft(student_id: int, assignment_id: int, payload: SubmissionStepUpdate):
    """Bosqichma-bosqich avtomatik qoralamani saqlash (Auto-save)"""
    key = f"{student_id}_{assignment_id}"
    current = mock_submissions.get(key, {"status": "in_progress", "data": {}})
    
    # Kiritilgan qadamlarni yangilaymiz
    update_dict = payload.model_dump(exclude_unset=True)
    current["data"].update(update_dict)
    current["status"] = "in_progress"
    mock_submissions[key] = current
    
    return {"message": "Qoralama saqlandi", "status": "in_progress", "data": mock_submissions[key]}

@router.post("/submission/{student_id}/{assignment_id}/submit")
def submit_assignment(student_id: int, assignment_id: int):
    """Talaba ishini yakuniy tekshirishga topshirish"""
    key = f"{student_id}_{assignment_id}"
    if key not in mock_submissions or not mock_submissions[key].get("data"):
        raise HTTPException(status_code=400, detail="Topshirishdan avval topshiriqni to'ldiring")
    
    mock_submissions[key]["status"] = "submitted"
    return {"message": "Topshiriq tekshirishga yuborildi", "status": "submitted"}

@router.post("/evaluate")
def evaluate_submission(payload: EvaluationCreate):
    """O'qituvchi tomonidan 100 ballik rubrika asosida baholash"""
    total = (
        payload.score_problem +
        payload.score_theory +
        payload.score_data_analysis +
        payload.score_calculation +
        payload.score_decision +
        payload.score_conclusion +
        payload.score_sources
    )
    
    result = {
        "submission_id": payload.submission_id,
        "total_score": total,
        "max_score": 100,
        "details": payload.model_dump(),
        "passed": total >= 60
    }
    mock_evaluations[payload.submission_id] = result
    return {"message": "Baholash muvaffaqiyatli yakunlandi", "result": result}
