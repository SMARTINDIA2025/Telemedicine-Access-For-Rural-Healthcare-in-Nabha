
# FRA Atlas & Decision Support System (DSS)

An AI-powered Forest Rights Act (FRA) Atlas and WebGIS-based Decision Support System to monitor and enhance the implementation of the Forest Rights Act, 2006 in the Indian states of Madhya Pradesh, Tripura, Odisha, and Telangana.

## Project Overview

The Forest Rights Act (FRA) recognizes the rights of forest-dwelling communities over land and forest resources. However, challenges such as fragmented legacy records, lack of centralized visual data, and limited integration with satellite-based asset mapping hinder effective implementation.

This project addresses these challenges by:

- Digitizing and standardizing FRA legacy records using OCR and Named Entity Recognition (NER).
- Developing an interactive WebGIS FRA Atlas integrating satellite imagery and AI-based asset mapping.
- Building a Decision Support System (DSS) to recommend targeted Central Sector Schemes (CSS) for FRA patta holders.
- Providing policymakers and stakeholders with data-driven tools for transparent and efficient FRA implementation.

## Key Features

- Automated data extraction from scanned FRA documents using OCR and NER.
- AI/ML models for satellite image analysis and asset detection (e.g., agricultural land, water bodies, forest cover).
- Interactive WebGIS platform with filtering and visualization of FRA claims and assets.
- Rule-based and AI-enhanced DSS engine for scheme eligibility and intervention prioritization.

## Technology Stack

- **Frontend:** HTML, CSS, JavaScript, Leaflet/OpenLayers  
- **Backend:** Python (Flask/Django), PostgreSQL with PostGIS  
- **AI/ML:** TensorFlow/PyTorch, SpaCy, Scikit-learn  
- **Satellite Data:** Sentinel-2, ISRO Bhuvan  
- **OCR/NER:** Tesseract, Google Cloud Vision, BERT-based models  
- **Hosting:** Cloud platforms (AWS, Azure)

## Getting Started

### Prerequisites

- Python 3.8+  
- PostgreSQL with PostGIS extension  
- Node.js and npm (for frontend dependencies)  

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   Configure the database and environment variables (see .env.example).

Run database migrations:
flask db upgrade  # or equivalent for your framework
Start the backend server:
flask run
Contributing
Contributions are welcome! Please read CONTRIBUTING.md for guidelines.
License
This project is licensed under the MIT License - see the LICENSE file for details.
Contact
For questions or support, please contact 12devsharma10c@gmail.com
