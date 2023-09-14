const con=require('../utils/db')

const getAllArticles = (req, res) => {
    let sql = "select*from article";
    let articles = []
    con.query(sql, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index', {
            articles: articles
        })
    })
}
const getArticleBySlug=(req,res)=>{
    let sql=`SELECT *, article.name article_name, author.name author_name from article inner join author on author.id=article.author_id where slug="${req.params.slug}"`
    let article
    con.query(sql,(err,result)=>{
        if (err) throw err;
        article=result
        res.render('article',{
            article:result
        })
    })
}
module.exports={
    getAllArticles,
    getArticleBySlug
}
