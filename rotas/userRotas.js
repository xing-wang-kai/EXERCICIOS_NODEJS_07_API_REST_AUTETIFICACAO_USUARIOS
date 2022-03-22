import validarToken from '../middlewares/validarToken.js'
import userController from '../controller/UserController.js';
import express from 'express'

const router = express.Router()

router.get('/contatos',validarToken, userController.bucarRegistros)
      .get('/contatos/:id',validarToken, userController.bucarRegistro)
      .post('/contatos', validarToken, userController.criarRegistro)
      .put('/contatos/:id',validarToken, userController.editarRegistro)
      .delete('/contatos/:id',validarToken, userController.deletarRegistro)
      .put('/contatos-senha/:id',validarToken, userController.editarSenha)
      .post('/login', userController.login)


export default router;
