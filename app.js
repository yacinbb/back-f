const express = require("express")
const mongoose = require("mongoose");
const { router } = require("./routes/articles");
const { getArticles, createArticle, getArticle, deletArticle, UpdateArticle } = require("./Controller/articles");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { getUsers, registerUser, loginUser } = require("./Controller/User");
require("dotenv").config();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: [ "http://localhost:3000" ] }));

const userRouter = require("./routes/users")

app.use("/articles", router)
app.use("/users", userRouter)

// Articles 
router.get("/", getArticles)
router.post("/", createArticle)
router.get("/:id" ,  getArticle)
router.delete("/:id", deletArticle)
router.put("/:id", UpdateArticle)
// Users
router.get("/", getUsers)
router.post("/", registerUser)
router.post("/", loginUser)


app.listen(process.env.PORT,()=>{
console.log("server listening on port "+process.env.PORT)
})
mongoose.connect(process.env.DB_URL,
    console.log("Successfully connected to mongo")
)
