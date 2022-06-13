const express = require('express')
const { join } = require('path')

const router = express.Router()

router.use('/public', express.static(join(__dirname, '../../public/')))

router.get('/', async (req, res) => {
    res.render('home', {
        title: 'Hello World!'
    })
})

router.get('/index.php', async (req, res) => res.redirect('/'))
router.get('/index.html', async (req, res) => res.redirect('/'))

router.use('/favicon.ico', express.static(join(__dirname, '../../assets/favicon.png')))
router.use('/robots.txt', express.static(join(__dirname, '../../assets/robots.txt')))
router.use('/sitemap.xml', express.static(join(__dirname, '../../assets/sitemap.xml')))

router.get('*', async (req, res) => res.redirect('/'))

module.exports = router