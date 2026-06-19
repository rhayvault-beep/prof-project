#!/usr/bin/env python3
import os

# Try different PDF libraries
try:
    import pdfplumber
    library = "pdfplumber"
except ImportError:
    try:
        import PyPDF2
        library = "PyPDF2"
    except ImportError:
        library = None

pdf_path = r"C:\Users\DELL\Desktop\just call me prof\JustCallMeProf's VIP Testimonies.pdf"

if not os.path.exists(pdf_path):
    print(f"File not found: {pdf_path}")
    # Try with escaped apostrophe
    alt_pdf_path = r"C:\Users\DELL\Desktop\just call me prof" + "\\" + "JustCallMeProf's VIP Testimonies.pdf"
    if os.path.exists(alt_pdf_path):
        pdf_path = alt_pdf_path
        print(f"Using: {pdf_path}")
    else:
        print("Trying alternative paths...")
        for file in os.listdir(r"C:\Users\DELL\Desktop\just call me prof"):
            if file.endswith(".pdf"):
                pdf_path = os.path.join(r"C:\Users\DELL\Desktop\just call me prof", file)
                print(f"Found PDF: {pdf_path}")
                break

try:
    if library == "pdfplumber":
        import pdfplumber
        with pdfplumber.open(pdf_path) as pdf:
            for i, page in enumerate(pdf.pages):
                print(f"\n--- PAGE {i+1} ---")
                text = page.extract_text()
                print(text)
    elif library == "PyPDF2":
        import PyPDF2
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for i, page in enumerate(reader.pages):
                print(f"\n--- PAGE {i+1} ---")
                text = page.extract_text()
                print(text)
    else:
        print("No PDF library available. Install pdfplumber or PyPDF2")
        print(f"PDF file location: {pdf_path}")
except Exception as e:
    print(f"Error: {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()
