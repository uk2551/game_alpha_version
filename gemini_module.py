import google.generativeai as genai
import time
from dotenv import load_dotenv
import os
import json



class ai_model():
    def __init__(self):
        load_dotenv()
        gemini_key = os.getenv("api_key")
        genai.configure(gemini_key)

        # ── Upload PDF ONCE at game start ──────────────────────────
        with open("prompts/game_master.txt", "r", encoding="utf-8") as f:
            SYSTEM_PROMPT = f.read()

        # ── System instruction is separate from chat ───────────────
        model = genai.GenerativeModel(
            model_name="gemini-3.1-flash-lite-preview",
            system_instruction=SYSTEM_PROMPT  # ← sent once to server, never in chat history
        )
        self.chat = model.start_chat(history=[])

    def send_with_retry(self, message: str, max_retries: int = 5, ):
        """Auto retry when hitting rate limit."""
        wait = 15  # seconds to wait on first retry

        for attempt in range(max_retries):
            try:
                response = self.chat.send_message(message)

                return response.text

            except Exception as e:
                if "429" in str(e):
                    print(f"⏳ Rate limit hit — waiting {wait}s before retry ({attempt + 1}/{max_retries})...")
                    time.sleep(wait)
                    wait *= 2  # double wait each retry: 15 → 30 → 60 → 120
                else:
                    return "error"  # different error, don't retry



    def send_massage(self, message: str):
        input_message = message
        raw_respond = self.send_with_retry(input_message.strip())
        if "error" == raw_respond:
            return {"error": "มีบางอย่างผิดปกติ"}
        elif "loding" in raw_respond:
            return raw_respond
        else:
            respond = self.extract_and_convert(raw_respond)
            return respond

    def extract_and_convert(self, text):
        # ใช้ Regex ค้นหาข้อความที่เริ่มด้วย { และจบด้วย }
        start_index = text.find('{')
        if start_index == -1:
            return "not have {}"

        brace_count = 0
        # 2. วนลูปนับปีกกาจนกว่าจะเจอตัวปิดที่เข้าคู่กัน
        for i in range(start_index, len(text)):
            if text[i] == '{':
                brace_count += 1
            elif text[i] == '}':
                brace_count -= 1

            # เมื่อ brace_count กลับมาเป็น 0 แสดงว่าเจอจุดจบของ JSON ก้อนนอกสุดแล้ว
            if brace_count == 0:
                json_str = text[start_index: i + 1]
                try:
                    return json.loads(json_str)
                except json.JSONDecodeError:
                    return None
        return None
    def check_value(self):
        with open("prompts/semi_output.txt", "r", encoding="utf-8") as f:
            test_value = f.read()
            value = self.extract_and_convert(test_value)

            return value








