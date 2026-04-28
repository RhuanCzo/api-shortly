import pkg from "pg"

const { Pool } = pkg

const connection = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Rhurhuu",
    database: "teste"
})

const db = await connection.connect()

export default db