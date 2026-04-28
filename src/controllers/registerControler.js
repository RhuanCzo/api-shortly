import db from "../database/db.js"
import bcrypt from "bcrypt"
import { v4 as uuidV4 } from "uuid";

export async function signUp (req, res) {
    const {name, email, password} = res.locals.user
    const passwordHash = bcrypt.hashSync(password, 10)

    try {
        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, passwordHash])
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(409)
    }
}

export async function signIn (req, res) {
    const usuario = res.locals.user
    const token = uuidv4()

    try {
        await db.query(`INSERT INTO sessions (token, user_id) VALUES ($1, $2);`, [token, usuario.id])
        res.status(201).send(token)
    } catch (err) {
        console.log(err)
        return res.sendStatus(409)
    }
}