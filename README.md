# Lab-Demo
  #Project Overview
  ==============================================================================================
  The Medical Analysis Management Program is a desktop data management program for medical laboratories.
  It helps manage medical data for each patient and their condition, the tests performed by the patient in the laboratory and their results.
  It also stores the different types of tests available in the laboratory.
  It works as a client-server program, and this program is considered the first version of the program.
  ----------------------------------------------------------------------------------------------
  The project is a digital system used by lab technicians or doctors to register patient data, store test results,
  and retrieve them later without re-entering patient information on every visit. The system also stores common
  medical test types to streamline the work
  ==============================================================================================
  
  #Folder-structure
  ==============================================================================================
  lab-system/
  ├── backend/                           # Express + Prisma Backend
  │   ├── prisma/                        # Prisma schema and DB seed
  │   │   ├── schema.prisma
  │   │   └── seed.ts
  │   │
  │   ├── src/
  │   │   ├── controllers/              # Logic per resource (e.g. patient.controller.ts)
  │   │   ├── routes/                   # Express route handlers
  │   │   ├── middlewares/             # Logging, error handling, validation
  │   │   ├── services/                # Business logic layer (optional)
  │   │   ├── app.ts                   # Express app config
  │   │   └── server.ts                # Entry point (port, DB connect)
  │   │
  │   ├── logs/                        # request.log / error.log
  │   ├── .env                         # DATABASE_URL, PORT, etc.
  │   ├── package.json
  │   └── tsconfig.json
  │
  ├── frontend/                         # React Frontend
  │   ├── public/
  │   ├── src/
  │   │   ├── components/
  │   │   ├── pages/
  │   │   ├── services/                # Calls to backend via fetch/axios
  │   │   ├── App.tsx
  │   │   └── main.tsx
  │   ├── index.html
  │   ├── tailwind.config.js
  │   ├── vite.config.ts
  │   ├── package.json
  │   └── tsconfig.json
  │
  ├── README.md
  └── .gitignore
  ==============================================================================================

