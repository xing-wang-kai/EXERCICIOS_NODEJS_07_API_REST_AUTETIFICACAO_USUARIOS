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
})

//User.sync().then(()=>{console.log('ok')})

export default User;