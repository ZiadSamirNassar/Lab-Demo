const { sqldb } = require('./sql.utils')

const findPatients = async() => {
    try{
        const getAllPatients = sqldb.prepare('SELECT * FROM patients');
        let patients = await getAllPatients.all();
        return patients;
    }catch(error) {
        console.error("data acsses error in patients tabel(find all) : ",error.message);
        throw new Error(error.message);
    }

}

const findPatientByid = async(id) => {
    try{
        const getPatientByid = sqldb.prepare('SELECT * FROM patients WHERE id = ?')
        const patient = await getPatientByid.get(id);
        return patient;
    }catch(error) {
        console.error("data acsses error in patients tabel(find one) : ",error.message);
        throw new Error(error.message);
    }
}

const insertPatient = async(name, age, gender, phone) => {
    try{
        const insertPatient = sqldb.prepare('INSERT INTO patients (name, age, gender, phone) VALUES (?, ?, ?, ?)');
        const createdPatient = insertPatient.run(name, age, gender, phone);
        return createdPatient;
    }catch(error) {
        console.error("data acsses error in patients tabel(create) : ",error.message);
        throw new Error(error.message);
    }
}

const updatePatient = async (name, age, gender, phone, id) => {
    try{
        const updatePatient = sqldb.prepare('UPDATE patients SET name = ?, age = ?, gender = ?, phone = ? WHERE   id = ?');

        const updated = updatePatient.run(name, age, gender, phone, id)
        return updated;
    }catch(error) {
        console.error("data acsses error in patients tabel(update) : ",error.message);
        throw new Error(error.message);
    }
}


module.exports = {
    findPatients,
    findPatientByid,
    insertPatient,
    updatePatient,
}