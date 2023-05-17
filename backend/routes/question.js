const express = require("express")
const {createQuestion} = require("../controllers/questionController")


const router = express.Router()


router.get('/', createQuestion);

module.exports = router;