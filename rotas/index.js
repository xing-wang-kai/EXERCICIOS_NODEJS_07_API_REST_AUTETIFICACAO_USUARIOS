import express from 'express';
import router from './userRotas.js'
import cors from 'cors';

const routes = app =>{
    
    app.get('/', (req, res) =>{
        res.send(`<h1> CURSO DE NODE JS GERANDO API REST COM EXPRESS </h1>`)
    })
    app.use((req, res, next) => {
        res.header('Acess-Control-Allow-Origin', 'http://localhost:3001')
        res.header('Acess-Control-Allow-Methods', "GET, POST, PUT, DELETE")
        res.header('Acess-Control-Allow-Headers', "X-PINGOTHER, Content-Type, Authorization")
        app.use(cors())
        next()
    })
    app.use(express.json(), router);
    
}
export default routes;