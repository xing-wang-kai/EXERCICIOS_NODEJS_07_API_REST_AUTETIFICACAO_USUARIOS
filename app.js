import express from 'express';
import chalk from 'chalk';
import User from './models/Usuario.js'

const app = express();
app.use(express.json())

const port = process.env.PORT || 3001;

app.use((req, res, next)=>{
    console.log('acessou o middlewares')
    next();
})

app.get('/', (req, res) =>{
    res.send(`<h1> CURSO DE NODE JS GERANDO API REST COM EXPRESS </h1>`)
})
app.get('/contatos', async (req, res) =>{
    try{
        const valores = await User.findAll();
        res.status(200).json({
            erro: false,
            dados: valores})
    }catch(error){
        res.status(400).json({message: `${error.message} : Ocorreu Um erro ao realizar a busca no banco`})
    }
})

app.get('/contatos/:id', async (req, res) =>{
    const { id } = req.params
    try{
        const valores = await User.findOne({where: { id: Number.parseInt(id)}})
        res.status(200).json(valores);
    }catch(error){
        res.status(404).json({message: `Usuário com o ID '${id}' não foi localizado`})
    }
})

app.post('/contatos', validarDados, async (req, res)=>{
    const valor = req.body
    try{
        await User.create(valor)
        res.status(201).json(valor);
    }catch(error){
        res.status(400).json({message: `${error.message}: Erro ao tentar Criar um novo Usuário`})
    }
})
app.put('/contatos/:id',validarDados, async (req, res) => {
    const { id } = req.params;
    const valores = req.body
    try{
        await User.update(valores, { where: { id : Number.parseInt(id) } } );
        const valor = await User.findOne( { where: { id : Number.parseInt(id) } } );
        res.status(200).json(valor)
    }catch(error){
        res.status(400).json({message: `${error.message} : Ocorreu um error ao tentar editar o Usuário`})
    }
})

app.delete('/contatos/:id', async (req, res)=>{
    const { id } = req.params;
    try{
        await User.destroy( { where: { id: Number.parseInt(id) } } );
        res.status(200).json({message: `O usuário de Id ${id} foi deletado com sucesso`})
    }catch(error){
        res.status(400).json({message: `${error.message} : Erro ao tentar deletar o Usuário de id ${id}`})
    }
})

function validarDados(req, res, next){
    if(!req.body.email){
        return res.status(404).json({message: "Necessário enviar o Email e o nome"})
    }
    return next();
}


app.listen( port, () => {console.log(chalk.bgGreenBright.black(`----> Servidor rodado com sucesso em htttp://localhost:${port}`))})