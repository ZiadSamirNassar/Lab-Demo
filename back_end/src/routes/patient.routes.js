const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');

// إنشاء مريض جديد
router.post('/', patientController.createPatient);

// جلب كل المرضى
router.get('/', patientController.getAllPatients);

// جلب مريض حسب ID
router.get('/:id', patientController.getPatientById);

// تعديل مريض
router.put('/:id', patientController.updatePatient);

// لاحقًا ممكن نضيف: حذف مريض (إذا لزم الأمر)

module.exports = router;
