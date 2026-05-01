import db from "../database/db.js"

export async function validateUser (req, res, next) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    try {
        const tokenOk = await db.query(`SELECT * FROM sessions WHERE sessions.token = $1;`, [token])
        const user = await db.query(`SELECT * FROM users WHERE users.id = $1;`, [tokenOk.rows.id])

        if(!token) {
            return res.sendStatus(401)
        }
        if(tokenOk.rows.length === 0) {
            return res.sendStatus(404)
        }
        if(user.rows.length === 0) {
            return res.sendStatus(404)
        }

        res.locals.user = user.rows[0].id

        next()
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}
