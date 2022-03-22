import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    "nodejscelk",
    "root",
    "hoot",
    {
    host: "localhost",
    dialect: 'mysql'
})

sequelize.authenticate()
    .then(()=> console.log('conexão com o banco de dados realizada com sucesso!!'))
    .catch(()=> console.log('Error: falha ao tentar se conectar ao banco de dados'))

export default sequelize;
