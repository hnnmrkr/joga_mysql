const Author = require('../models/author.model')

//show article by this slug
const getAuthorName = (req, res) => {
    Author.getName(req.params.author_id,(err, author, articles) => {
        if (err) {
            res.status(500).send({
                message : err.message || 'An error occurred retrieving author data'
            })
        } else {
            console.log(author, articles)
            res.render('author', {
                articles: articles,
                author: author
            })
        }
    })
}

module.exports = {
    getAuthorName
}