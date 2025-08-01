import { Patient } from "../../DB/index.js";

export const getAllPatients = async(req, res) => {
        
    const patients = await Patient.findAll();

    if(!patients || patients.length <= 0){
        const error = new Error('no patients found');
        error.statusCode = 404;
        throw error
    }

    return res.json({massage: "done", data: patients, sucsses: true })

}


export const getPatientByid = async(req, res) => {

    const {id} = req.params

    const patient = await Patient.findByPk(id);

    if(!patient){
        const error = new Error('no patients found');
        error.statusCode = 404;
        throw error
    }

    return res.json({massage: "done", data: patient, sucsses: true })


}


export const createPatient = async(req, res) => {

    let {name, age, phone, gender} = req.body;

    const insertedPatient = await Patient.create({name, age, gender, phone});

    if(!insertedPatient){
            const error = new Error('no patients created');
            error.statusCode = 401;
            throw error
        }

    return res.json({massage: "Patient Created Sucssesfully", patientId: insertedPatient.lastInsertRowid, sucsses: true })

}


export const updatedPatient = async(req, res) => {
    const {id} = req.params;
    let {name, age, gender, phone} = req.body;

    let patient = await Patient.findByPk(id);

    if(!patient){
        const error = new Error('no patients found');
        error.statusCode = 404;
        throw error
    }

    name = name || patient.name;
    age = age || patient.age;
    gender = gender || patient.gender;
    phone = phone || patient.phone;

    const updated = await Patient.update({name, age, gender, phone}, {
        where: {id:id}
    })

    if(!updated){
        const error = new Error('no patients found');
        error.statusCode = 401;
        throw error
    }

    patient = await Patient.findByPk(id);

    return res.json({massage: "Patient Updated Sucssesfully", data: patient, sucsses: true })

}