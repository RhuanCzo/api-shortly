import express from "express"
import cors from "cors"
import pkg from "pg"
import registerRoute from "./routes/registerRoute.js"

const { Pool } = pkg

const connection = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Rhurhuu",
    database: "teste"
})

const app = express()

app
.use(cors())
.use(express.json())

.use(registerRoute)

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Running in port ${port}`))