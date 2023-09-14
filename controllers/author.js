const con=require('../utils/db')

const getAuthorArticles=(req,res)=>{
    let articles
    let author
    let sql=`SELECT*FROM article where author_id="${req.params.author_id}"`
    con.query(sql,(err,result)=>{
        if (err) throw err;
        articles=result
        sql=`select*from author where id="${req.params.author_id}"`
        con.query(sql,(err,result)=>{
            if (err) throw err;
            author=result
            res.render('author',{
                author:author,
                articles:articles
            })
        })

    })
}
module.exports={getAuthorArticles}