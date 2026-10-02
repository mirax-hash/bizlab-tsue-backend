import os
import asyncio
import httpx
from dotenv import load_dotenv

load_dotenv()
key = os.getenv("GEMINI_API_KEY", "").strip()

if key:
    print(f"Kalit topildi: {key[:8]}... (Jami uzunligi: {len(key)})")
else:
    print("XATO: .env faylida GEMINI_API_KEY topilmadi yoki bo'sh!")

async def test_gemini():
    if not key:
        return
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={key}"
    payload = {"contents": [{"parts": [{"text": "Salom, TDIU talabalariga bitta qisqa iqtisodiy maslahat ber."}]}]}
    
    print("Gemini serveriga ulanish tekshirilmoqda...")
    async with httpx.AsyncClient(timeout=15.0) as client:
        try:
            r = await client.post(url, json=payload)
            if r.status_code == 200:
                text = r.json()["candidates"][0]["content"]["parts"][0]["text"]
                print("\n[MUVAFFAQIYAT] Gemini API to'liq ishlamoqda!")
                print("Javob:", text.strip()[:150] + "...")
            else:
                print(f"\n[XATOLIK] Status: {r.status_code}")
                print("Server javobi:", r.text)
        except Exception as e:
            print("\n[TARMOQ XATOSI]:", e)

asyncio.run(test_gemini())
