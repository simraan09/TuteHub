const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const PORT = 3000;

const routes = require('./routes/appRoutes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/',routes);

http.createServer(app).listen(PORT,() => console.log('Server running on '+PORT))
