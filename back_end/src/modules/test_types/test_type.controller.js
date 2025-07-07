const { Router } = require("express");
const { 
    getAllTestTypes, 
    searchTestTypesByPartialId, 
    createTestType, 
    updateTestTypeAndFieldsContent 
} = require("./test_type.service")
const testTypeRouter = Router();

const data = new Date();


// const addDocs = async () => {
//   try {

//     const popularTestTypes = [
//         {
//         _id: "cbc",
//         name: "Complete Blood Count (CBC)",
//         fields: [
//             { label: "WBC", unit: "10^9/L", normal: "4–10" },
//             { label: "RBC", unit: "10^12/L", normal: "4.5–5.5" },
//             { label: "Hemoglobin", unit: "g/dL", normal: "13–17" },
//             { label: "Platelets", unit: "10^9/L", normal: "150–400" },
//         ],
//         },
//         {
//         _id: "bmp",
//         name: "Basic Metabolic Panel (BMP)",
//         fields: [
//             { label: "Glucose", unit: "mg/dL", normal: "70–99" },
//             { label: "Calcium", unit: "mg/dL", normal: "8.5–10.5" },
//         ],
//         },
//         {
//         _id: "cmp",
//         name: "Comprehensive Metabolic Panel (CMP)",
//         fields: [
//             { label: "Albumin", unit: "g/dL", normal: "3.5–5.0" },
//             { label: "ALT", unit: "U/L", normal: "< 56" },
//             { label: "AST", unit: "U/L", normal: "< 40" },
//         ],
//         },
//         {
//         _id: "lipid",
//         name: "Lipid Profile",
//         fields: [
//             { label: "Cholesterol", unit: "mg/dL", normal: "< 200" },
//             { label: "HDL", unit: "mg/dL", normal: "> 40" },
//             { label: "LDL", unit: "mg/dL", normal: "< 100" },
//             { label: "Triglycerides", unit: "mg/dL", normal: "< 150" },
//         ],
//         },
//         {
//         _id: "thyroid",
//         name: "Thyroid Panel",
//         fields: [
//             { label: "TSH", unit: "mIU/L", normal: "0.4–4.0" },
//             { label: "T3", unit: "ng/dL", normal: "80–200" },
//             { label: "T4", unit: "μg/dL", normal: "5–12" },
//         ],
//         },
//         {
//         _id: "lft",
//         name: "Liver Function Test (LFT)",
//         fields: [
//             { label: "Bilirubin", unit: "mg/dL", normal: "< 1.2" },
//             { label: "ALT", unit: "U/L", normal: "< 56" },
//             { label: "AST", unit: "U/L", normal: "< 40" },
//             { label: "ALP", unit: "U/L", normal: "44–147" },
//         ],
//         },
//         {
//         _id: "rft",
//         name: "Renal Function Test (RFT)",
//         fields: [
//             { label: "Creatinine", unit: "mg/dL", normal: "0.7–1.3" },
//             { label: "Urea", unit: "mg/dL", normal: "7–20" },
//             { label: "BUN", unit: "mg/dL", normal: "6–24" },
//         ],
//         },
//         {
//         _id: "pt",
//         name: "Prothrombin Time (PT)",
//         fields: [
//             { label: "PT", unit: "seconds", normal: "11–13.5" },
//             { label: "INR", unit: "", normal: "0.8–1.1" },
//         ],
//         },
//         {
//         _id: "hba1c",
//         name: "HbA1c",
//         fields: [{ label: "HbA1c", unit: "%", normal: "< 5.7%" }],
//         },
//         {
//         _id: "vitd",
//         name: "Vitamin D",
//         fields: [{ label: "25(OH)D", unit: "ng/mL", normal: "30–100" }],
//         },
//         {
//         _id: "vitb12",
//         name: "Vitamin B12",
//         fields: [{ label: "Vitamin B12", unit: "pg/mL", normal: "200–900" }],
//         },
//         {
//         _id: "fbs",
//         name: "Fasting Blood Sugar (FBS)",
//         fields: [{ label: "FBS", unit: "mg/dL", normal: "70–99" }],
//         },
//         {
//         _id: "urine",
//         name: "Urinalysis",
//         fields: [
//             { label: "Color", type: "text" },
//             { label: "pH", unit: "", normal: "4.5–8" },
//             { label: "Protein", type: "text" },
//             { label: "Glucose", type: "text" },
//         ],
//         },
//         {
//         _id: "crp",
//         name: "C-Reactive Protein (CRP)",
//         fields: [{ label: "CRP", unit: "mg/L", normal: "< 10" }],
//         },
//         {
//         _id: "esr",
//         name: "Erythrocyte Sedimentation Rate (ESR)",
//         fields: [{ label: "ESR", unit: "mm/hr", normal: "0–20" }],
//         },
//         {
//         _id: "tsh",
//         name: "TSH only",
//         fields: [{ label: "TSH", unit: "mIU/L", normal: "0.4–4.0" }],
//         },
//         {
//         _id: "covid",
//         name: "COVID-19 PCR",
//         fields: [{ label: "Result", options: ["Positive", "Negative"] }],
//         },
//         {
//         _id: "stool",
//         name: "Stool Analysis",
//         fields: [
//             { label: "Color", type: "text" },
//             { label: "Parasites", type: "text" },
//         ],
//         },
//         {
//         _id: "semen",
//         name: "Semen Analysis",
//         fields: [
//             { label: "Volume", unit: "mL", normal: "≥ 1.5" },
//             { label: "Motility", unit: "%", normal: "> 40%" },
//         ],
//         },
//         {
//         _id: "bloodgroup",
//         name: "Blood Group & Rh",
//         fields: [
//             { label: "Blood Group", options: ["A", "B", "AB", "O"] },
//             { label: "Rh Factor", options: ["+", "-"] },
//         ],
//         },
//         {
//             _id: 'cbc',
//             name: 'Complete Blood Count',
//             category: 'hematology',
//             fields: [
//             { label: 'Hemoglobin', unit: 'g/dL', normal: '13-17', type: 'number' },
//             { label: 'WBC', unit: '10^9/L', normal: '4-11', type: 'number' },
//             { label: 'Platelets', unit: 'x10^3/μL', normal: '150-450', type: 'number' },
//             { label: 'RBC', unit: 'x10^6/μL', normal: '4.5-6.0', type: 'number' }
//             ]
//         },
//         {
//             _id: 'rbs',
//             name: 'Random Blood Sugar',
//             category: 'biochemistry',
//             fields: [
//             { label: 'Glucose (Random)', unit: 'mg/dL', normal: '70-140', type: 'number' }
//             ]
//         },
//         {
//             _id: 'fbs',
//             name: 'Fasting Blood Sugar',
//             category: 'biochemistry',
//             fields: [
//             { label: 'Glucose (Fasting)', unit: 'mg/dL', normal: '70-110', type: 'number' }
//             ]
//         },
//         {
//             _id: 'pps',
//             name: 'Postprandial Sugar',
//             category: 'biochemistry',
//             fields: [
//             { label: 'Glucose (2hr after meal)', unit: 'mg/dL', normal: '<140', type: 'number' }
//             ]
//         },
//         {
//             _id: 'urine',
//             name: 'Urine Analysis',
//             category: 'urine',
//             fields: [
//             { label: 'Color', type: 'text' },
//             { label: 'Specific Gravity', normal: '1.005-1.030', type: 'number' },
//             { label: 'pH', normal: '4.5-8.0', type: 'number' },
//             { label: 'Protein', type: 'text', normal: 'Negative' },
//             { label: 'Glucose', type: 'text', normal: 'Negative' },
//             { label: 'Ketones', type: 'text', normal: 'Negative' }
//             ]
//         },
//         {
//             _id: 'stool',
//             name: 'Stool Analysis',
//             category: 'stool',
//             fields: [
//             { label: 'Color', type: 'text' },
//             { label: 'Consistency', type: 'text' },
//             { label: 'Mucus', type: 'text' },
//             { label: 'Blood', type: 'text' },
//             { label: 'Parasites', type: 'text' }
//             ]
//         },
//         {
//             _id: 'got',
//             name: 'SGOT (AST)',
//             category: 'liver',
//             fields: [
//             { label: 'SGOT (AST)', unit: 'U/L', normal: '10-40', type: 'number' }
//             ]
//         },
//         {
//             _id: 'gpt',
//             name: 'SGPT (ALT)',
//             category: 'liver',
//             fields: [
//             { label: 'SGPT (ALT)', unit: 'U/L', normal: '7-56', type: 'number' }
//             ]
//         },
//         {
//             _id: 'urea',
//             name: 'Urea',
//             category: 'renal',
//             fields: [
//             { label: 'Urea', unit: 'mg/dL', normal: '15-40', type: 'number' }
//             ]
//         },
//         {
//             _id: 'creat',
//             name: 'Creatinine',
//             category: 'renal',
//             fields: [
//             { label: 'Creatinine', unit: 'mg/dL', normal: '0.6-1.3', type: 'number' }
//             ]
//         }
//     ];

//     await testTypesDB.bulkDocs(popularTestTypes);
//   } catch (err) {
//     console.log("error to add :", err.message);
//   }
// };

//========================Get All Test Types=====================
testTypeRouter.get("/", getAllTestTypes);

//======================Search Test Types By Partial id================
testTypeRouter.get("/:id", searchTestTypesByPartialId);

//======================Create One Test Type===================
testTypeRouter.post("/", createTestType);

//======================update Test Type (name or category)=================
testTypeRouter.put("/:id", updateTestTypeAndFieldsContent)

module.exports = testTypeRouter;
