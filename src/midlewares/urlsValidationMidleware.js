import { urlSchema } from "../models/Schemas.js"

export async function urlValidate (req, res, next) {
    const url = req.body
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    try {
        const { error } = urlSchema.validate(url, {abortEarly: false})
        if(error) {
            const errors = error.datails.map((detail) => detail.message) 
            return res.status(422).send(errors)
        }
        const tokenOk = await db.query(`SELECT * FROM sessions WHERE sessions.token = $1;`, [token])

        if(!token && tokenOk.rows.lenght === 0) {
            return res.sendStatus(401)
        }

        const url = res.locals.url
        const token = res.locals.token

        next()
    } catch (err) {
        console.log(err)
        return res.sendStatus(401)
    }
}

export async function validateShortUrl (req, res, next) {
    const id = req.params

    try {
        const urlShortVerification = await db.query(`SELECT * FROM urls WHERE urls.id = $1;`, [id])

        if(urlShortVerification.rows[0].shortUrl === null) {
            return res.status(404)
        }

        const id = res.locals.id

        next()
    } catch (err) {
        console.log(err)
        res.sendStatus(404)
    }

}
export async function validateShortUrlOpen (req, res, next) {
    const shortyUrl = req.params

    try {
        const urlShortVerification = await db.query(`SELECT * FROM urls WHERE urls.shorty_url = $1;`, [shortyUrl])

        if(urlShortVerification.rows[0].shortUrl === null) {
            return res.status(404)
        }

        const shortyUrl = res.locals.shortyUrl

        next()
    } catch (err) {
        console.log(err)
        res.sendStatus(404)
    }

}

export async function validateDeleteUrl (req, res, next) {
    const { id } = req.params
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    try {
        if(!token) {
            return res.sendStatus(401)
        }
        const tokenOk = await db.query(`SELECT * FROM sessions WHERE sessions.token = $1;`, [token])
        const url = await db.query(`SELECT * FROM urls WHERE urls.id = $1;`, [id])
        if(tokenOk.rows.length === 0 ) {
            return res.sendStatus(401)
        }
        if(url.rows.length === 0) {
            return res.sendStatus(404)
        } 
        if(url.rows[0].user_id !== tokenOk.rows[0].user_id) {
            return res.sendStatus(401)
        }

        res.locals.id = url.rows[0].id;
        
        next()
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}