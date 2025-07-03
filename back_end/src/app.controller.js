const bootstrap = (app, express) => {

    app.use(express.json());

    app.get('/', (req, res) => {
        res.json({massage: "Hello, This is Medical_Lab Application", sucsses: true})
    })

}

module.exports = bootstrap;