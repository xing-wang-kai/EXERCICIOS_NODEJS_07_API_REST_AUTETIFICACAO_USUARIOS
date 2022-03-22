import Sequelize from 'sequelize';
import db from './db.js'

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
    ,
    password: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

// Cria a tabela e faz alterações na tabela.
//User.sync({alter: true}).then(()=>{console.log('ok')})

export default User;