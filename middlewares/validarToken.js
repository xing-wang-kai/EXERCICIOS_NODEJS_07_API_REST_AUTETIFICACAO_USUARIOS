import jwt from 'jsonwebtoken';
import { promisify } from "util";
import 'dotenv/config';


async function validarToken (req, res, next){
    const authHeader = req.headers.authorization;
    if(authHeader){
        const [Bearer, Token] = authHeader.split(' ');
        if(!Token){
            return res.status(400).json({
                error: true,
                message: `Erro ao realizar o login na página`
            })
        }
        try{
            const decoded = await promisify(jwt.verify)(Token, process.env.TOKEN);
            req.userId = decoded.id;
            return next();
    
        }catch(error){
            res.status(404).json({
                error: true,
                message: `O token informado é inválido`
            })
        }

    }else{
        res.status(400).json({
            error: true,
            message: `Erro ao tentar acessar a Rota`
        })
    }
};

export default validarToken;