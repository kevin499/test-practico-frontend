const express = require("express")
const router = express.Router()

const item_controller = require("../controllers/ItemController")


router.get('/items', item_controller.index)

router.get('/items/:id', item_controller.show)

module.exports = router
