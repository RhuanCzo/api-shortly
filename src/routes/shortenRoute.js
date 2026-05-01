import { Router } from "express"
import { urlValidate } from "../midlewares/urlsValidationMidleware"
import { urlController } from "../controllers/urlsController.js"

const router = Router()

router.post("/urls/shorten", urlValidate, urlController)
// router.get("urls/:id")
// router.get("urls/open/:shortUrl")
// router.delete("urls/:id")