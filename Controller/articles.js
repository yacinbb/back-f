const Article = require("../models/article")
const { artValidator } = require("../utililites/validator")

const getArticles =  async (req ,res)=>{
    try {
        const art = await Article.find().populate('userId','firstName lastName email role' )
        return res.json(art)
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Error while getting items", err });
    }
}

const getArticle = async (req,res)=>{
    try{
    const {id} = req.params
    const art = await Article.findById(id).populate('userId', 'firstName lastName email role')
    if (!art){
        res.status(404).json({ message: "Article not found" });
    }
    res.json(art)
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}
const createArticle = async (req,res)=>{
    try {
        
const {body} = req
const validator = artValidator.validate(body , {abortEarly: false})
if (validator.error) {
    return res.json(validationResult.error.details[0].message);
  }
const newArticle = new Article({ ...body, userId: req.user._id })
await newArticle.save();
res.json({ message: "Article Successfully created" , Article : newArticle});

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
const deletArticle =  async (req,res)=>{
    try{
        const {id} = req.params
        const art = await Article.findById(id)
        if (!art){
           return res.json({message: "Article not Found"})
        }
        await Article.findByIdAndDelete(id)
        res.json({ message: "Item successfully deleted" });
    }catch(err){
    console.log(err);
    res.status(500).json({ message: "Error while getting item", err });
    }
}
const UpdateArticle = async (req ,res)=>{
    try{
        const {id} = req.params
            const art = await Article.findById(id)
            if (!art){
               return res.json({message: "Article not Found"})
            }
            const newart = await Article.findOneAndUpdate( {_id: id} ,{$set: req.body}, {new: true})
            res.json(newart)
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error while getting item", err });
        }
}

const serach = async (req,res)=>{
    const {query} = req.query
try {
    const art = await Article.find()

    const filtrage = art.filter(a => a.titletoLowerCase().includes(query.toLowerCase()))
    res.status(200).json(filtrage)
}catch(err){
    res.status(500).json({ message: 'Erreur',err })
}

}
module.exports = {getArticle , getArticles , deletArticle  , createArticle , UpdateArticle , serach}