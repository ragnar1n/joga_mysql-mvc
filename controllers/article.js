const Article=require('../models/article.model.js')


const getAllArticles = (req, res) => {
    Article.getAll((err, data)=>{
        if (err){
            res.status(500).send({
                message:err.message||'An error occurred while retrieving articles'
            })
        }else {
            console.log(data)
            res.render('index',{
                articles:data
            })
        }
    })
}
const getArticleBySlug=(req,res)=>{
    Article.getBySlug(req.params.slug,(err,data)=>{
        if (err){
            res.status(500).send({
                message:err.message||'An error occurred while retrieving articles'
            })
        }else {
            console.log(data)
            res.render('article',{
                article:data
            })
        }
    })
    // let article
    // con.query(query,(err,result)=>{
    //     if (err) throw err;
    //     article=result
    //     res.render('article',{
    //         article:result
    //     })
    // })
}
module.exports={
    getAllArticles,
    getArticleBySlug
}
