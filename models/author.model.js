const con=require('../utils/db')

const Author=(author)=> {
    this.name = author.name
    this.author_id=author.id
}

Author.getByAuthor=(author_id,result)=>{
    let ar_query=`SELECT*FROM article,author where author.id="${author_id}" and article.author_id=author.id`
    let author
    let articles=[]
    con.query(ar_query, (err, res)=>{
        if (err){
            console.log('error: ',err)
            result(err,null)
            return
        }
        articles=res
        console.log('articles: ',articles)

        let au_query=`select name from author where author.id='${author_id}'`
        con.query(au_query,(err,res)=>{
            if (err){
                console.log('error: ', err)
                result(err,null)
                return
            }
            author=res
            console.log('found author ', author)
            result(null,author,articles)
        })
    })
}

module.exports=Author