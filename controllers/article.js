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
}

const createNewArticle=(req,res)=>{
    console.log('new article')

    const newArticle=new Article({
        name:req.body.name,
        slug:req.body.slug,
        image:req.body.image,
        body:req.body.body,
        published:new Date().toISOString().slice(0,19).replace('T',' '),
        author_id:req.body.author_id
    })
    Article.createNew(newArticle,(err,data)=>{
        if (err){
            res.status(500).send({
                message:err.message||'An error occurred while sending article data'
            })
        }else {
            console.log(data)
            res.redirect('/')
        }
    })
}

const showNewArticleForm=(req,res)=>{
    res.render('create_article')
}

const editArticle=(req,res)=> {
    console.log(req.method)

    if (req.method === "GET") {
        Article.showArticle(req.params.id, (err, article, authors) => {
            if (err) {
                res.status(500).send({
                    message: err.message || 'An error occurred while retrieving article data'
                })
            } else {
                console.log(article, authors)
                res.render('edit_article', {
                    article: article,
                    authors: authors
                })
            }
        })
    } else if (req.method === "POST") {
        if (req.body.action === 'delete') {
            console.log('delete article')
            Article.delete(req.params.id, (err, result) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || 'An error occurred retrieving article data'
                    })
                } else {
                    console.log(result)
                    res.redirect('/')
                }
            })
        }
    } else {
        console.log('edit article')
        let editedArticle = new Article({
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            author_id: req.body.author
        })
        Article.update(req.params.id, editedArticle, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || 'An error occurred retrieving article data'
                })
            } else {
                console.log(data)
                res.redirect(`/article/${editedArticle.slug}`)
            }
        })

    }
}
module.exports={
    getAllArticles,
    getArticleBySlug,
    createNewArticle,
    showNewArticleForm,
    editArticle
}
