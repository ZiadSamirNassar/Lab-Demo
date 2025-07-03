const patientRouter = require('./modules/patients/patient.controller')

const bootstrap = (app, express) => {

    app.use(express.json());

    app.use('/patient', patientRouter);

    app.get('/', (req, res) => {
        res.json({massage: "Hello, This is Medical_Lab Application", sucsses: true})
    })

}

module.exports = bootstrap;