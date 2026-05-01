import express from "express"
import cors from "cors"
import pkg from "pg"
import registerRoute from "./routes/registerRoute.js"
import { shortenUrl } from "./controllers/urlsController.js"

const app = express()

app
.use(cors())
.use(express.json())

.use(registerRoute, shortenUrl)

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Running in port ${port}`))