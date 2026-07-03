from app.ai.gemini import ask_gemini

response = ask_gemini(
    "Explain Machine Learning in 5 simple lines."
)

print(response)