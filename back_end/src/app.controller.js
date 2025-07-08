const patientRouter = require('./modules/patients/patient.controller')
const testTypeRouter = require('./modules/test_types/test_type.controller')

const bootstrap = (app, express) => {

    app.use(express.json());

    app.use('/patient', patientRouter);
    app.use('/test-type', testTypeRouter)

    app.get('/', (req, res) => {
        res.json({massage: "Hello, This is Medical_Lab Application", sucsses: true})
    })

}

module.exports = bootstrap;