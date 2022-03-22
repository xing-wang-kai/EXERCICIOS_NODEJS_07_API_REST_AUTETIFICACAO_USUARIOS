import User from '../models/Usuario.js';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


class userController{
     static bucarRegistros = async (req, res) => {
        try{
            const valores = await User.findAll();
            res.status(200).json({
                erro: false,
                dados: valores})
        }catch(error){
            res.status(400).json({message: `${error.message} : Ocorreu Um erro ao realizar a busca no banco`})
        }
    }

    static bucarRegistro = async (req, res) => {
        const { id } = req.params
        try{
            const valores = await User.findOne({where: { id: Number.parseInt(id)}})
            res.status(200).json(valores);
        }catch(error){
            res.status(404).json({message: `Usuário com o ID '${id}' não foi localizado`})
        }
    }
    static criarRegistro =  async (req, res)=>{
        const valor = req.body
        try{
            valor.password = await bcrypt.hash(valor.password, 12);
            await User.create(valor);
            res.status(201).json(valor);
        }catch(error){
            res.status(400).json({message: `${error.message}: Erro ao tentar Criar um novo Usuário`})
        }
    }
    static editarRegistro = async (req, res) => {
        const { id } = req.params;
        const valores = req.body
        try{
            if(valores.password){
                valores.password = await bcrypt.hash(valores.password, 12);
            }
            await User.update(valores, { where: { id : Number.parseInt(id) } } );
            const valor = await User.findOne( { where: { id : Number.parseInt(id) } } );
            res.status(200).json(valor)
        }catch(error){
            res.status(400).json({message: `${error.message} : Ocorreu um error ao tentar editar o Usuário`})
        }
    }
    static deletarRegistro = async (req, res)=>{
        const { id } = req.params;
        try{
            await User.destroy( { where: { id: Number.parseInt(id) } } );
            res.status(200).json({message: `O usuário de Id ${id} foi deletado com sucesso`})
        }catch(error){
            res.status(400).json({message: `${error.message} : Erro ao tentar deletar o Usuário de id ${id}`})
        }
    }
    static editarSenha = async (req, res) => {
        const { id } = req.params;
        var valores = req.body
        try{
            valores.password = await bcrypt.hash(valores.password, 12);
            await User.update(valores, { where: { id : Number.parseInt(id) } } );
            const valor = await User.findOne( { where: { id : Number.parseInt(id) } } );
            res.status(200).json(valor)
        }catch(error){
            res.status(400).json({message: `${error.message} : Ocorreu um error ao tentar editar o Usuário`})
        }
    }
    static login = async (req, res) => {
        const valores = req.body
        try{
            const user = await User.findOne({where: {email: valores.email}})
            if(user == null){
                res.status(400).json({message: `Email informado não encontrado`})
            }else if(! await bcrypt.compare(valores.password, user.password)){
                res.status(400).json({
                    error: true,
                    message: `A senha informada está incorreta`
                })
            }   
            else{
                var token = jwt.sign({id: user.id}, process.env.TOKEN, {
                    expiresIn: "7d"
                })
                res.status(200).json({
                    Error: false,
                    message: `Login realizado com sucesso!!`,
                    token: token
                    })
            }
        }catch(erro){
            res.status(400).json({message: `${erro.message} : Erro ao processar o Login.`})
        }
        
    }
}

export default userController;