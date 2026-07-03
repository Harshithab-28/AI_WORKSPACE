from app.ai.pdf_reader import extract_text_from_pdf

text = extract_text_from_pdf(
    r"C:\Users\HARSHITHA\Downloads\Harshitha B Resume(1).pdf"
)

print(text)