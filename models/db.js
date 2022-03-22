import Sequelize from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

sequelize.authenticate()
    .then(()=> console.log('conexão com o banco de dados realizada com sucesso!!'))
    .catch((error)=> console.log( `${error.message} - Erro ao se conecetar com o banco de dados`))

export default sequelize;
