const con=require('../utils/db')


const Article=function (article){
    this.name=article.name
    this.slug=article.slug
    this.image=article.image
    this.body=article.body
    this.published=article.published
    this.author_id=article.author_id
}

Article.getAll=(result)=>{
    let query='select*from article'
    let articles=[]
    con.query(query,(err,res)=>{
        if (err){
            console.log('error: ', err)
            result(err,null)
            return
        }
        articles=res
        console.log('articles: ', articles)
        result(null,articles)
    })
}

Article.getBySlug=(slug,result)=>{
    let query=`select *, article.name article_name, author.name author_name from article inner join author on article.author_id=author.id where slug="${slug}"`
    con.query(query, (err, res)=>{
        if (err){
            console.log('error: ',err)
            result(err,null)
            return
        }

        if (res.length){
            console.log('found article: ',res[0])
            result(null,res[0])
        }
    })
}

Article.createNew=(newArticle,result)=>{
    let query=`insert into article set
                        name='${newArticle.name}',
                    slug='${newArticle.slug}',
                    image='${newArticle.image}',
                    body='${newArticle.body}',
                    published='${newArticle.published}',
                    author_id='${newArticle.author_id}'`
    con.query(query,(err,res)=>{
        if (err){
            console.log('error: '+err)
            result(err,null)
            return
        }
        console.log('created article: ',{id:res.insertId, ...newArticle})
        result(null,{id:res.insertId, ...newArticle})
    })
}

module.exports=Article