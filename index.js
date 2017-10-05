const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })

const port = process.env.PORT;
mongoose.connect(process.env.DATABASE_URL);
mongoose.Promise = global.Promise;

const providers = require('./routes/providers');
const apiRoutes = express.Router();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '2mb', type: 'application/json'}));
app.use('/api', apiRoutes)

// Company
app.get('/', (req, res) => {
    res.json('Welcome to our awesome API')
})

apiRoutes.post('/providers', providers.register)
apiRoutes.get('/providers', providers.getProviders)
apiRoutes.get('/provider/:email', providers.getProviderByEmail)
apiRoutes.put('/provider/:id', providers.updateProvider)
apiRoutes.delete('/provider/:id', providers.deleteProviderById)

app.listen(port, () => {
    console.log(`running on port ${port}`)
})
