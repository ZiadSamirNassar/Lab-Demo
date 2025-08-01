import * as modules from './modules/index.js'
import { globalError } from './utils/index.js'

const bootstrap = (app, express) => {

    app.use(express.json());

    app.use('/patient', modules.patientRouter);
    app.use('/test-type', modules.testTypeRouter);
    app.use('/patient-test', modules.patientTestRouter);
    app.use('/test-result', modules.testResultRouter);

    app.get('/', (req, res) => {
        res.json({massage: "Hello, This is Medical_Lab Application", sucsses: true})
    })

    //global error handler
    app.use(globalError)
}

export default bootstrap;