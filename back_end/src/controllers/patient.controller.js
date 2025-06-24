// back_end/src/controllers/patient.controller.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function isValidGender(gender) {
  return ['male', 'female'].includes(gender);
}

// 🆕 إنشاء مريض
exports.createPatient = async (req, res) => {
  try {
    const { name, gender, age, phone } = req.body;


    if (!isValidGender(gender)) {
    return res.status(403).json({ success: false, message: 'Gender not allowed!' });
    }


    const patient = await prisma.patient.create({
      data: { name, gender, age, phone },
    });

    res.status(201).json({ success: true, message: 'patient Created Succesfully', data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error Creating Patient', error: error.message });
  }
};

// 📄 جلب كل المرضى
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await prisma.patient.findMany();

    if(!Array.isArray(patients) || patients.length === 0){
        return res.status(404).json({ success: false, message: 'No patients found'})
    }
    res.json({ success: true, data: patients });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failure to attract patients', error: error.message });
  }
};

// 🔍 جلب مريض بـ ID
exports.getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await prisma.patient.findUnique({
      where: { id: Number(id) },
    });

    if (!patient) return res.status(404).json({ success: false, message: 'Patient not present' });

    res.json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
  }
};

// ✏️ تعديل بيانات مريض
exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gender, age, phone } = req.body;
    const newPatient = {};

    if(name) newPatient.name = name
    if (gender && isValidGender(gender)) newPatient.gender = gender
    if(age) newPatient.age = age
    if(phone) newPatient.phone = phone

    const updated = await prisma.patient.update({
      where: { id: Number(id) },
      data: newPatient,
    });

    res.json({ success: true, message: 'patient modified successfully', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Patient modification failed', error: error.message });
  }
};
