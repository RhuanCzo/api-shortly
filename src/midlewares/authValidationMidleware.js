import bcrypt from "bcrypt"
import { userSignInSchema, userSignUpSchema } from "../models/Schemas.js"
import db from "../database/db.js"

export async function signUpValidation (req, res, next) {
    const user = req.body

    try {
        const emailExist = await db.query(`SELECT email FROM users WHERE email = $1;`, [user.email])
    
        const { error } = userSignUpSchema.validate(user, { abortEarly: false })
    
        if (error) {
            const errors = error.details.map((detail) => detail.message)
            return res.sendStatus(422).send(errors)
        }
        if (emailExist.rows.length !== 0) {
            return res.sendStatus(409)
        }
        
        res.locals.user = user
    
        next()
    } catch (err) {
        console.log(err)
        res.sendStatus(409)
    }
}

export async function signInValidation (req, res, next) {
    const user = req.body
    const {email, password} = req.body
    
    try {
        const { error } = userSignInSchema.validate(user, {abortEarly: false})
        
        if(error) {
            const errors = error.details.map((detail) => detail.message)
            return res.status(422).send(errors)
        }
        const usuario = await db.query(`SELECT * FROM users WHERE users.email = $1;`, [email])
        if (usuario.rows.length === 0) {
            return res.sendStatus(401)
        }
        const passwordOk = bcrypt.compareSync(password, usuario.rows[0].password)
        if (!passwordOk) {
            return res.sendStatus(401)
        }   
        res.locals.user = usuario.rows[0]
    
        next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(401)
    }
    
}