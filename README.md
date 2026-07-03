# User_Chatboat (Backend)

A Node.js + Express backend that:
1. Accepts a PDF upload
2. Extracts text using `pdf-parse`
3. Stores the extracted text in MongoDB (Mongoose)
4. Answers questions using Google Gemini (`@google/genai`) using the stored document text

---

## Tech Stack
- Node.js / Express
- MongoDB (Mongoose)
- multer (PDF upload)
- pdf-parse (PDF text extraction)
- @google/genai (Gemini)

---

## Project Structure
- `index.js` - Express server + route mount (`/documentapi`)
- `config/db.js` - MongoDB connection
- `routes/doumentroute.js` - API routes
- `controller/documentcontroller.js` - upload + chat logic
- `model/doument.js` - Mongo schema/model
- `middleware/upload.js` - multer configuration
- `utils/gemini.js` - Gemini client

> Note: File/folder names are spelled `doument*` in the repo (current code uses those names as-is).

---

## API Endpoints
Base URL:
- `http://localhost:3000/documentapi`

### 1) Upload PDF
**POST** `/upload`

- Content-Type: `multipart/form-data`
- Field name: `file`

Example (cURL):
```bash
curl -X POST "http://localhost:3000/documentapi/upload" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@./LawFirm_CRM_Detailed_Business_Explanation (1).pdf"
```

### 2) Chat / Ask Question
**POST** `/chat`

Request body (JSON):
```json
{
  "question": "Your question here"
}
```

Example (cURL):
```bash
curl -X POST "http://localhost:3000/documentapi/chat" \
  -H "Content-Type: application/json" \
  -d "{\"question\":\"What is mentioned about XYZ?\"}"
```

---

## Data Flow
1. **Upload**: PDF is received by multer in memory
2. **Extract**: `pdf-parse` converts PDF buffer → `data.text`
3. **Store**: The extracted text is saved in MongoDB (`Document` collection)
4. **Chat**: `/chat` finds the stored document and sends its text to Gemini

---

## Setup & Run
1. Install dependencies:
```bash
npm install
```

2. Start server:
```bash
npm start
```

Server runs on:
- `http://localhost:3000`

---

## Environment Variables
This backend uses:
- `GEMINI_API_KEY` (for Gemini)

Gemini key is loaded in `utils/gemini.js` via `process.env.GEMINI_API_KEY`.

> MongoDB connection is currently hardcoded inside `config/db.js`.

