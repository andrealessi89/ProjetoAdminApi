const express = require('express');
const router = require('./router');
const app = express();
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
};
app.use(cors(corsOptions));


app.use(express.json());
app.use(router);
module.exports = app;