import express from 'express';
import router from './userRotas.js'

const routes = app =>{
    
    app.get('/', (req, res) =>{
        res.send(`<h1> CURSO DE NODE JS GERANDO API REST COM EXPRESS </h1>`)
    })
    app.use(express.json(), router);
    
}
export default routes;