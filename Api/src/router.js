const express = require('express');
const loginController = require('./controllers/loginController');
const pontosController = require('./controllers/pontosController');
const authenticate = require('./middleware/authenticate');


const router = express.Router();
router.post('/login', loginController.login);
router.get('/pontos', authenticate.authenticate, pontosController.getAll);
module.exports = router;