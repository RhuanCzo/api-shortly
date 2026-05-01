import db from "../database/db.js";

export async function getUsers (req, res) {
    const userId = res.locals.id

    try {
        const infoUser = await db.query(`
            SELECT *
            FROM users u 
            WHERE u.id = $1;
            `, [userId])
        const urls = await db.query(`
            SELECT *
            FROM urls WHERE url.user_id = $1;
            `, [userId])

            const mapInfoUser = infoUser.rows.map((u) => ({
                id: u.id ,
                name: u.name,
                visitCount: u.visitCount,
                shortedUrls: [urls.rows.map((url) => ({
                    id: url.id,
                    shortUrl: url.shorty_url,
                    url: url.url,
                    visitCount: url.visit_count
                }))             
            ]
                
            }))

            res.status(200).send(infoUser)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}