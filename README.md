
# 📊 Assisted Account Mapping (Prototype)

## 🧾 Overview

This project is a prototype that maps a trial balance to a Norwegian standard chart of accounts using a simple assisted (rule-based) approach.

The solution consists of:

-   **Backend (C# / .NET API)** – parses input and generates mapping suggestions
-   **Frontend (React + TypeScript)** – displays and allows user interaction

----------

## ⚙️ Functionality

### Input

-   Upload trial balance (Excel) via Swagger
-   Contains:
    -   account number
    -   account name

### Mapping (AI logic)

-   Rule-based matching using:
    -   account number
    -   account group
    -   keyword matching (e.g. bank, lønn, kunde)

Each account returns:

-   suggested standard account
-   category
-   confidence score
-   status


----------

## 💻 Frontend

Displays mappings in a table with:

-   original account
-   suggested mapping
-   confidence
-   status

User can:

-   change mapping (dropdown)
-   confirm mapping

----------

## 🔁 Status

-   `Suggested` → system suggestion
-   `Edited` → user changed mapping
-   `Confirmed` → user approved mapping
-   `NeedsReview` → low confidence

----------

## 🚀 Run the project

### Download file "Saldobalanse - Eksempel til case.xlsx" from repository - used in Swagger as told below

### Backend
```
cd backend  
dotnet run
```

#### How to test
```
1. Start backend
2. Open Swagger:
   http://localhost:5272/swagger/index.html
3. Use POST /api/Mapping to upload Excel file (accountname and accountnumber)
4. Open frontend to view results
```
<img width="1153" height="433" alt="Skjermbilde 2026-04-27 kl  23 24 15" src="https://github.com/user-attachments/assets/da9a9614-2d4f-4ecd-995d-2b49bcb31cc1" />

### Frontend
```
cd frontend  
npm install  
npm run dev
press "o" to open in browser
```
<img width="1136" height="459" alt="Skjermbilde 2026-04-27 kl  23 26 25" src="https://github.com/user-attachments/assets/df57ba0e-3009-4690-a0e1-8e2e4d3c6a06" />


----------

## 👨‍💻 **Author**
*Anders Bellsund Beil  
Frontend & Mobile Developer  
React  | TypeScript | C# | .NET*
