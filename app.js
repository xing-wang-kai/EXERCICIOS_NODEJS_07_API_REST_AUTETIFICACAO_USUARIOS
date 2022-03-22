import express from 'express'
import chalk from 'chalk';
import routes from './rotas/index.js';
import 'dotenv/config';

const app = express();
routes(app);

const port = process.env.PORT;
app.listen( port, () => {console.log(chalk.bgGreenBright.black(`----> Servidor rodado com sucesso em htttp://localhost:${port}`))})