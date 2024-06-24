const express = require("express")
const { getArticles, getArticle, createArticle, deletArticle, UpdateArticle, serach } = require("../Controller/articles")
const { chekAuth } = require("../middleware/Auth")
const { role } = require("../middleware/role")

const router = express.Router()
require("dotenv").config

router.get("/", getArticles)
router.get("/:id", getArticle)
router.post("/", chekAuth, role('A') , createArticle)
router.delete("/:id",chekAuth, role('A'), deletArticle)
router.put("/:id", chekAuth, role('A') , UpdateArticle)
router.get("/search", serach)
module.exports = {router}