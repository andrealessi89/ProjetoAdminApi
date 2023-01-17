const pontosModel = require('../models/pontosModel');

const getAll = async(request, response) => {
    const pontos = await pontosModel.getAll();
    return response.status(200).json(pontos);
};

module.exports = {
    getAll
};