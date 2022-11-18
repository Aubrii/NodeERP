require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//const errorHandler = require('_middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const corsOptions = {
    origin: 'http://localhost:4200',

}
app.use(cors(corsOptions));

// api routes
app.use('/users', require('./app/controller/user.controller'));
app.use('/entreprises', require('./app/controller/entreprise.controller'))
app.use('/ouvrages', require('./app/controller/ouvrage.controller'))
app.use('/devis', require('./app/controller/devis.controller'))
app.use('/couts',require('./app/controller/cout.controller'));
app.use('/clients',require('./app/controller/client.controller'));



// app.use('/ouvrage', require('./app/controller/ouvrage.controller'));


// global error handler
//app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));