import os
from typing import Dict
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# --------- Config ---------
LLM_MODEL = os.environ.get("LLM_MODEL", "google/flan-t5-large")  # or "google/flan-t5-base", "google/flan-t5-small"

# MarianMT translation models (English, Hindi, Punjabi)
MT_MODELS = {
    ("hi", "en"): "Helsinki-NLP/opus-mt-hi-en",
    ("en", "hi"): "Helsinki-NLP/opus-mt-en-hi",
    ("pa", "en"): "Helsinki-NLP/opus-mt-pa-en",
    ("en", "pa"): "Helsinki-NLP/opus-mt-en-pa",
}

SUPPORTED_LANGS = {"en": "English", "hi": "Hindi", "pa": "Punjabi"}

# --------- Load models once ---------
print("[BOOT] Loading LLM:", LLM_MODEL)
gen_pipeline = pipeline(
    "text2text-generation",
    model=LLM_MODEL,
    device_map="auto" if os.environ.get("DEVICE_AUTO", "0") == "1" else None,
)

# Cache translation pipelines per direction
_translation_pipes: Dict = {}

def get_translator(src: str, tgt: str):
    if src == tgt:
        return None
    key = (src, tgt)
    if key not in MT_MODELS:
        raise ValueError(f"Translation {src}->{tgt} not configured.")
    if key not in _translation_pipes:
        model_name = MT_MODELS[key]
        print(f"[BOOT] Loading MT: {model_name}")
        _translation_pipes[key] = pipeline("translation", model=model_name)
    return _translation_pipes[key]

def translate(text: str, src: str, tgt: str) -> str:
    if not text:
        return text
    if src == tgt:
        return text
    pipe = get_translator(src, tgt)
    out = pipe(text, max_length=512)
    return out[0]["translation_text"].strip()

def build_prompt(user_en: str) -> str:
    system = (
        "You are a safe, concise telemedicine assistant for rural clinics. "
        "Answer in plain language, bullet where helpful. "
        "Never give definitive diagnoses; recommend seeing a doctor for urgent or severe symptoms. "
        "If it looks like an emergency (chest pain, difficulty breathing, severe bleeding, loss of consciousness), "
        "advise immediate medical attention."
    )
    return f"{system}\n\nUser question: {user_en}\n\nHelpful answer:"

# ---------- Routes ----------
@app.route("/")
def index():
    # source.html must be inside a 'templates/' folder
    return render_template("source.html")

@app.get("/health")
def health():
    return {"status": "ok", "langs": SUPPORTED_LANGS}

@app.post("/chat")
def chat():
    data = request.get_json(force=True)
    user_text = (data.get("text") or "").strip()
    lang = (data.get("lang") or "en").lower()

    if lang not in SUPPORTED_LANGS:
        return jsonify({"error": f"Unsupported lang '{lang}'. Use one of: {list(SUPPORTED_LANGS)}"}), 400
    if not user_text:
        return jsonify({"error": "Empty text"}), 400

    try:
        # 1) Normalize to English
        text_en = translate(user_text, lang, "en") if lang != "en" else user_text

        # 2) Generate answer in English
        prompt = build_prompt(text_en)
        gen = gen_pipeline(
    text,
    max_new_tokens=200,       # allow longer answers
    do_sample=True,           # enable sampling
    temperature=0.8,          # creativity
    top_p=0.9                 # nucleus sampling
)

        answer_en = gen[0]["generated_text"].strip()

        # 3) Translate back to user language
        answer_out = translate(answer_en, "en", lang) if lang != "en" else answer_en

        return jsonify({
            "ok": True,
            "lang": lang,
            "answer": answer_out,
            "debug": {"normalized_en": text_en}
        })
    except Exception as e:
        # Fail soft to English if translation errors
        try:
            prompt = build_prompt(user_text if lang == "en" else translate(user_text, lang, "en"))
            gen = gen_pipeline(prompt, max_new_tokens=200)
            fallback_en = gen[0]["generated_text"].strip()
            fallback = fallback_en if lang == "en" else translate(fallback_en, "en", lang)
            return jsonify({"ok": True, "lang": lang, "answer": fallback, "warn": str(e)})
        except Exception as inner:
            return jsonify({"ok": False, "error": str(inner)}), 500

if __name__ == "__main__":
    # For local dev only
    app.run(host="0.0.0.0", port=5000, debug=True)
