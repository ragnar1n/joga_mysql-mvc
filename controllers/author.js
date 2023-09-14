const Author=require('../models/author.model')

// const getAuthorArticles1=(req,res)=>{
//     let articles
//     let author
//     let sql=`SELECT*FROM article where author_id="${req.params.author_id}"`
//     con.query(sql,(err,result)=>{
//         if (err) throw err;
//         articles=result
//         sql=`select*from author where id="${req.params.author_id}"`
//         con.query(sql,(err,result)=>{
//             if (err) throw err;
//             author=result
//             res.render('author',{
//                 author:author,
//                 articles:articles
//             })
//         })
//
//     })
// }

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