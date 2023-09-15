const Author=require('../models/author.model')


const getAuthorArticles=(req,res)=>{
    Author.getByAuthor(req.params.author_id,(err,author,articles)=>{
        if (err){
            res.status(500).send({
                message:err.message||'An error occurred while retrieving articles'
            })
        }else {
            console.log(author,articles)
            res.render('author',{
                author:author,
                articles:articles
            })
        }
    })
}

module.exports={getAuthorArticles}