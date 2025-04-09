# ♻️ ECOBIN - Smart Waste Management System 
**AI-Powered Waste Optimization Platform | Spring Boot + React + Python**  
*Version 3.0.0 | [![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) | [![CI/CD](https://github.com/ecobin/smart-waste/actions/workflows/pipeline.yml/badge.svg)](https://github.com/ecobin/smart-waste/actions)*

---
## 🚀 Overview

This project is a digital solution designed to tackle the challenges of inefficient waste collection, illegal dumping, and lack of public engagement. The system utilizes modern technologies to enhance waste classification, collection scheduling, and reporting.

---

## 📌 Features

### 🔍 AI/ML-Based Waste Classification
- Image recognition for waste categorization
- Real-time sorting of waste
- Data analytics on waste patterns and recycling efficiency

### 🗓️ Collection Scheduling
- Real-time collection schedule updates
- GPS-enabled truck tracking
- AI-powered route optimization

### 📢 Waste Reporting
- Users can report issues with location and images
- Admins monitor and act on incoming reports
- Eco-friendly reward system for responsible users

### 🚚 Request Pickup
- Request pickups for bulk/special waste
- Automated task assignment to collection services
- Real-time SMS/email notifications

---

## 💡 Why Use This System?

- **Innovative**: Integrates AI and blockchain for optimized operations
- **Sustainable**: Promotes proper waste disposal habits
- **User-Friendly**: Accessible via web and mobile
- **Scalable**: Designed to support both urban and community-level deployment

---

## 🏗 System Architecture
![Architecture Diagram](https://via.placeholder.com/1200x600?text=ECOBIN+System+Architecture+Diagram)  
*Three-Tier Architecture:*
1. **Frontend**: React PWA + Mobile App
2. **Backend**: Spring Boot Microservices
3. **AI Layer**: Python Flask API

---

## 🛠 Tech Stack
| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18 + TypeScript | Responsive UI with TensorFlow.js |
| **Backend** | Spring Boot 3 + Java 17 | REST API with JWT Auth |
| **Database** | PostgreSQL + TimescaleDB | Time-series data storage |
| **AI/ML** | PyTorch + OpenCV | Waste classification |
| **DevOps** | Docker + Kubernetes | Container orchestration |
| **Analytics** | Apache Kafka + Spark | Real-time processing |

---

## 📂 Project Structure
### Frontend (React)
```bash
src/
├── assets/               # Static files
├── components/
│   ├── auth/             # Auth forms
│   ├── dashboard/        # Analytics widgets
│   ├── map/             # Live route visualization
│   └── scanner/         # Waste classification UI
├── hooks/               # Custom React hooks
├── models/              # TypeScript interfaces
├── services/            # API clients
└── utils/               # Helper functions


Backend (Spring Boot)

src/main/java/com/ecobin/
├── config/              # Security & Bean configs
├── controller/          # REST endpoints
├── dto/                # Data transfer objects
├── exception/          # Custom exceptions
├── model/              # JPA entities
├── repository/         # Spring Data interfaces
├── service/            # Business logic
└── util/               # Helpers

AI Service (Python)

ml_service/
├── model_training/      # Jupyter notebooks
├── api/                # Flask endpoints
├── models/             # Saved model files
└── tests/              # Model validation


```

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- Java 11+
- MySQL Server
- Docker (optional for deployment)

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/senu02/EcoBin.git
cd smart-waste-management

# Setup Frontend
cd frontend
npm install
npm start

# Setup Backend
cd ../backend
# Import into IDE or run using Maven/Gradle
```

Configure `.env` files or `application.properties` with your database credentials.

---
##  🔌 API Endpoints
🔐 Authentication Module
```bash

POST    /api/auth/register          - User registration
POST    /api/auth/login             - User login
POST    /api/auth/refresh           - Refresh JWT token
GET     /api/auth/profile           - Get user profile
PUT     /api/auth/profile           - Update user profile

```
🗑️ Waste Reporting Module
 ```bash
POST    /api/reports                - Create new waste report
GET     /api/reports                - List all reports (filterable)
GET     /api/reports/{id}           - Get specific report
PUT     /api/reports/{id}           - Update report status
DELETE  /api/reports/{id}           - Delete report
GET     /api/reports/stats          - Get reporting statistics
POST    /api/reports/{id}/images    - Upload images for report


```
🚛 Collection Management Module
 ```bash
POST    /api/collections            - Create collection request
GET     /api/collections            - List collections (filterable)
GET     /api/collections/{id}       - Get collection details
PUT     /api/collections/{id}       - Update collection status
GET     /api/collections/optimize   - Get optimized routes
GET     /api/collections/vehicles   - List available collection vehicles
POST    /api/collections/assign     - Assign vehicle to collection

```
🖼️ Waste Classification Module
```bash
POST    /api/classification/predict - Submit image for classification
GET     /api/classification/types   - List supported waste types
GET     /api/classification/stats   - Get classification statistics
POST    /api/classification/train   - Retrain model (admin only)
```
## 🤝 Contributing

We welcome contributions!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

**Group:** Y3.S1.WE.IT.02.01_45  


---

> _Let’s build a smarter, cleaner future together!_

  
