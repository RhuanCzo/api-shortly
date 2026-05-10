import { nanoid } from "nanoid"
import db from "../database/db.js"


export async function shortenUrl (req, res) {
    const url = res.locals.url
    const token = res.locals.token

    try {
        const shortUrl = nanoid(8)
        await db.query(`INSERT INTO urls (short_url, url) VALUES ($1, $2);`, [shortUrl, url])

        res.status(200).send({"shortUrl": shortUrl})
    } catch (err) {
        console.log(err)
        res.sendStatus(401)
    }
}

export async function listUrlForId (req, res) {
    const id = res.locals.id
    
    try {
        const listUrl = await db.query(`SELECT * FROM urls FROM urls.id = $1;`, [id])

        res.ststus(200).send(listUrl)

    } catch (err) {
        console.log(err)
        return res.sendStatus(404)
    }
}

export async function openUrlShort (req, res) {
    const shortUrl = res.locals.shortyUrl
    
    try {
        const searchShortUrl = await db.query(`SELECT * FROM urls WHERE urls.shorty_url = $1;`, [shortUrl])
        
    } catch (err) {
        console.log(err)
        res.sendStatus(404)
    }
}

export async function deleteUrlForId (req, res) {
    const { id } = res.locals.id
    
    try {
        await db.query(`DELETE INTO FROM urls WHERE urls.id = $1;`, [id])

        res.status(204)
    } catch (err) {
        console.log(err)
        return res.sendStatus(404)
    }
}