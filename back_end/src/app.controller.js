import * as modules from './modules/index.js'

const bootstrap = (app, express) => {

    app.use(express.json());

    app.use('/patient', modules.patientRouter);
    app.use('/test-type', modules.testTypeRouter);
    app.use('/patient-test', modules.patientTestRouter);
    app.use('/test-result', modules.testResultRouter);

    app.get('/', (req, res) => {
        res.json({massage: "Hello, This is Medical_Lab Application", sucsses: true})
    })

}

export default bootstrap;