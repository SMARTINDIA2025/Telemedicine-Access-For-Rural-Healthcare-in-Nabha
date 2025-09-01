Telemedicine-Access-For-Rural-Healthcare-in-Nabha

Project Overview
The Rural Telemedicine System aims to improve healthcare access for underserved rural areas, starting with Nabha and surrounding villages in Punjab, India. This system provides a multilingual telemedicine platform that allows patients to consult doctors online, access digital health records offline, check medicine availability in real-time, and receive AI-powered symptom analysis.

Problem Statement

Nabha Civil Hospital serves 173 villages but operates at less than 50% staff capacity (11 out of 23 sanctioned doctors). Patients travel long distances, often missing work, only to find specialists unavailable or medicines out of stock. Poor roads and sanitation further hinder access, leading to worsened health outcomes and financial strain.

Impact:

Delayed or inaccessible healthcare for rural residents

Increased financial burden for daily-wage workers and farmers

Preventable complications and decline in community well-being

Key Features

Telemedicine Video Consultation

Patients can schedule and start video calls with doctors using Jitsi Meet API.

Digital Health Records

Offline-accessible patient records

Upload/download health documents

Patient history logging

AI Symptom Checker

AI-powered analysis of patient symptoms using Hugging Face/OpenAI models

Optimized for low-bandwidth areas

Medicine Availability Tracker

Real-time updates from local pharmacies

Accessible offline for rural patients

Admin Dashboard

Manage doctors, patients, and pharmacy inventory

Monitor consultations and AI symptom checks

Target Users

Rural patients in Nabha and nearby villages

Civil Hospital staff

Punjab Health Department

Local pharmacies

Daily-wage workers and farmers

Technology Stack
Component	Technology/Tool
Frontend	React.js / HTML / CSS / Tailwind
Backend	Python (Flask or FastAPI)
Database	SQLite (offline) / PostgreSQL (optional)
Video Consultation	Jitsi Meet API
AI Symptom Checker	Hugging Face Transformers / OpenAI API
Cloud Hosting / Deployment	GitHub Codespaces / Render / Vercel
Dev Environment	GitHub Codespaces + Devcontainer
