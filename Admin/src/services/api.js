import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3333',
})


//params tem que ser id e email para criar a sessão
export const createSession = async (params) => {
    return api.post('/login', params)
}

// parametros tem que ser id e token
export const verifyToken = async (params) => {
    return api.post('/auth/token', params)
}