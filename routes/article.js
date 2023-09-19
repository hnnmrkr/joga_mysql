const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article')

router.get('/', articleController.getAllArticles);
router.get('/:slug', articleController.getArticleBySlug);
router.get('/article/create', articleController.showNewArticleForm);
router.get('/article/edit/:id', articleController.updateArticle);
router.post('/create', articleController.createNewArticle);
router.post('/article/edit/:id', articleController.updateArticle);
module.exports = router;