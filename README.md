# Rural Telemedicine System

## Project Overview
The Rural Telemedicine System improves healthcare access for underserved rural areas, starting with Nabha and surrounding villages in Punjab, India. It provides a multilingual telemedicine platform for video consultations, offline-accessible digital health records, real-time medicine availability, and AI-powered symptom analysis.

---

## Problem Statement
Nabha Civil Hospital serves 173 villages but operates at less than 50% staff capacity (11 out of 23 doctors). Patients travel long distances, often missing work, only to find specialists unavailable or medicines out of stock. Poor road conditions further hinder access, leading to worsened health outcomes and financial strain.

**Impact:**
- Delayed or inaccessible healthcare  
- Increased financial burden for daily-wage workers and farmers  
- Preventable complications and decline in community well-being  

---

## Key Features
1. **Telemedicine Video Consultation**  
   - Schedule and start video calls with doctors via Jitsi Meet API.  

2. **Digital Health Records**  
   - Offline-accessible patient records  
   - Upload/download health documents  
   - Patient history logging  

3. **AI Symptom Checker**  
   - AI-powered analysis using Hugging Face/OpenAI models  
   - Optimized for low-bandwidth areas  

4. **Medicine Availability Tracker**  
   - Real-time updates from local pharmacies  
   - Accessible offline  

5. **Admin Dashboard**  
   - Manage doctors, patients, and pharmacy inventory  
   - Monitor consultations and AI symptom checks  

---

## Target Users
- Rural patients in Nabha and nearby villages  
- Civil Hospital staff  
- Punjab Health Department  
- Local pharmacies  
- Daily-wage workers and farmers  

---

## Technology Stack

| Component                   | Technology/Tool                 |
|------------------------------|---------------------------------|
| Frontend                     | React.js / HTML / CSS / Tailwind |
| Backend                      | Python (Flask or FastAPI)      |
| Database                     | SQLite / PostgreSQL             |
| Video Consultation           | Jitsi Meet API                  |
| AI Symptom Checker           | Hugging Face / OpenAI API       |
| Cloud Hosting / Deployment   | GitHub Codespaces / Render / Vercel |
| Dev Environment              | GitHub Codespaces + Devcontainer |

---

## System Architecture

+-------------------+          +--------------------+         +-------------------+
|                   |          |                    |         |                   |
|   Frontend        |  <---->  |  Backend API       |  <----> |  Database         |
|  (React UI)       |          | (Flask / FastAPI)  |         | (SQLite / Postgres)|
|                   |          |                    |         |                   |
+-------------------+          +--------------------+         +-------------------+
        |                             |                                |
        |                             |                                |
        v                             v                                v
+-------------------+        +-------------------+            +-------------------+
| AI Symptom Checker |        | Video Consultation|            | Medicine Availability|
| (HuggingFace/OpenAI)|      |   (Jitsi API)     |            |   Tracker / Offline |
+-------------------+        +-------------------+            +-------------------+

Architecture Explanation

Frontend (React UI)

Provides user interfaces for patients, doctors, and admins.

Pages include patient registration, symptom input, video consultation, medicine tracker, and dashboard.

Backend API (Flask / FastAPI)

Handles all client requests, user authentication, database CRUD operations, and AI module integration.

Serves data to frontend and communicates with AI symptom checker and video consultation modules.

Database (SQLite / Postgres)

Stores patient records, doctor profiles, consultation logs, and pharmacy inventory.

Supports offline caching for rural areas with low connectivity.

AI Symptom Checker

Processes patient symptom inputs.

Uses Hugging Face or OpenAI models to suggest likely conditions and next steps.

Returns results to backend API and frontend UI.

Video Consultation (Jitsi API)

Embedded in frontend for real-time doctor-patient video calls.

Backend handles room creation and scheduling if needed.

Medicine Availability Tracker

Fetches real-time data from local pharmacies.

Can be cached locally for offline access.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-organization/rural-telemedicine.git
cd rural-telemedicine

# Backend dependencies
pip install -r requirements.txt

# Frontend dependencies
cd frontend
npm install
# Backend
cd backend
python app.py   # or uvicorn main:app --reload for FastAPI

# Frontend
cd frontend
npm start

rural-telemedicine/
│
├── backend/                # Flask or FastAPI APIs
│   ├── app.py
│   ├── routes/
│   └── models/
│
├── frontend/               # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── ai_modules/             # AI symptom checker
│   └── symptom_checker.py
│
├── database/               # SQLite DB files
│
├── .devcontainer/          # Devcontainer for Codespaces
│   └── devcontainer.json
│
├── README.md
└── requirements.txt

from ai_modules.symptom_checker import analyze_symptoms
result = analyze_symptoms("Fever and headache for 2 days")
print(result)
<Iframe
  url="https://meet.jit.si/YourRoomName"
  width="100%"
  height="600px"
  allow="camera; microphone; fullscreen"
/>

Contributing

Fork the repository

Create a feature branch (git checkout -b feature-name)

Commit changes (git commit -m "Description")

Push to branch (git push origin feature-name)

Create a Pull Request
License

MIT License
