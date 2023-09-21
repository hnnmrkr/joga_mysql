const con = require('../utils/db')

const Article = function (article) {
    this.name = article.name
    this.slug = article.slug
    this.image = article.image
    this.body = article.body
    this.published = article.published
    this.author_id = article.author_id
}

Article.getAll = (result) => {
    let query = "SELECT * FROM article"
    let articles = []

    con.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        articles = res
        console.log('articles: ', articles)
        result(null, articles)
    })
}

Article.getBySlug = (slug, result) => {
    let query = `SELECT *
                 FROM article,
                      author
                 WHERE article.slug = '${slug}'
                   AND article.author_id = author.id`

    con.query(query, (err, res) => {
        if (err) {
            console.log('error. ', err)
            result(err, null)
            return
        }
        if (res.length) {
            console.log('found article: ', res[0])
            result(null, res[0])
        }
    })
}

Article.createNew = (newArticle, result) => {
    let query = `INSERT INTO article SET name = "${newArticle.name}", slug = "${newArticle.slug}", image = "${newArticle.image}", body = "${newArticle.body}", published = "${newArticle.published}", author_id = "${newArticle.author_id}"`

    con.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        console.log('created article: ', {id: res.insertId, ...newArticle})
        result(null, {id: res.insertId, ...newArticle})
    })
}

Article.showArticle = (articleId, result) => {
    let articleQuery = `SELECT * FROM article WHERE id = "${articleId}"`
    let authorQuery = `SELECT * FROM author`
    let article
    let authors = []

    con.query(articleQuery, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        article = res
        console.log('article: ', article)

        con.query(authorQuery, (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(err, null)
                return
            }
            authors = res
            console.log('authors: ', authors)
            result(null, article, authors)
        })
    })
}

Article.editArticle = (articleId, editedArticle, result) => {
    let query = `UPDATE article SET article.name = "${editedArticle.name}", slug = "${editedArticle.slug}", image = "${editedArticle.image}", article.body = "${editedArticle.body}", author_id = "${editedArticle.author_id}" WHERE id = ${articleId}`

    con.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        console.log('edited article: ', {id: res.insertId, ...editedArticle})
        result(null, {id: res.insertId, ...editedArticle})
    })
}

Article.deleteArticle = (articleId, result) => {
    let query = `DELETE FROM article WHERE id = "${articleId}"`

    con.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        console.log('deleted article: ', {id: res.insertId})
        result(null, {id: res.insertId})
    })
}

module.exports = Article