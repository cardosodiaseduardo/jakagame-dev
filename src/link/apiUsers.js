const API_URL = "https://jakagame-api.herokuapp.com/"
// const API_URL = "http://localhost:8000/"
import axios from 'axios'
import { async } from 'q';

export default{
    

    // Buscar USUÁRIOS do Banco
    async buscarUsuarios(){
        return axios.get(API_URL + 'usuarios').then(response => response.data)
    },

    // Buscar por USUÁRIO específico
    async buscarUsuarioPorId(usuario){
        return axios.post(API_URL + 'usuarioporid', usuario).then(response => response.data)
    },

    // Autenticar login do USUÁRIO
    async autenticarLogin(usuarioLogando){
        return axios.post(API_URL + 'usuariologar', usuarioLogando).then(response => response.data)
    },
    
    // Cadastrar novo USUÁRIO
    async adicionarUsuario(usuarioNovo) {
        return axios.post(API_URL + 'usuarios', usuarioNovo).then(response => response.data);
    },
    
    // Deletar USUÁRIO
    async deletarUsuario(usuario){
        return axios.post(API_URL + 'deletaraluno', alunoAserDeletado).then(response => response.data)
    },

    // Editar dados do USUÁRIO
    async editarUsuario(usuario){
        return axios.post(API_URL + 'editarusuario', usuario).then(response => response.data)
    },

    async incrementUsers(player){
        return axios.post(API_URL + 'playertime', player).then(response => response.data)
    },

    async contagemPlayers(anonimo){
        return axios.post(API_URL + 'playermore', anonimo).then(response => response.data)
    }

    

};