const express = require('express');
const { join } = require('path');
const slugify = require('slugify');
const fs = require('fs-extra');
const sg = require('nestyle-steganography');

const router = express.Router();

router.use('/public', express.static(join(__dirname, '../../public/')));

const filesFolderPath = join(__dirname, 'public', 'files');

router.get('/', async (req, res) => {
    res.render('home', {
        title: 'BSK - Steganography',
        encodeUrl: '/encode',
        decodeUrl: '/decode',
    });
});

router.post('/encode', async (req, res) => {
    const file = req.files.decodeImage;

    const message = req.fields.message;

    // encoduje urla, zamieniam spacje i inne wrażliwe znaki na "-"
    const filename = encodeURIComponent(slugify(file.name));
    // łącze ścieżke folderu w ktróeym znajduje sie router z folderem publicznym
    const savePath = join(__dirname, '../../', 'public', 'files', filename);

    // wrzucam do buforu plik znajdujący sie pod scieżką którą ootrzymałem od formidableMiddleware
    const fileBuffer = await fs.readFile(file.path);

    // zapisuje nie zakodowany plik
    await fs.writeFile(savePath, fileBuffer);

    const encodedFilename = [filename.split('.').shift() + '_encoded', filename.split('.').pop()].join('.');

    // wpisuje do buforu pliku, przy użyciu wiadomości, posługując się kluczem 128 bitowym kluczem enkryptującym
    const encodedBuffer = sg.write(fileBuffer, message, process.env.ENCRYPTION_KEY);

    // zapisuje plik
    await fs.writeFile(join(__dirname, '../../', 'public', 'files', encodedFilename), encodedBuffer);

    // przesyłam plik z wiadomością do użytkownika
    res.redirect(`/public/files/${encodedFilename}`);
});

router.post('/decode', async (req, res) => {
    const file = req.files.decodeImage;
    const filename = encodeURIComponent(slugify(file.name));
    const fileBuffer = await fs.readFile(file.path);

    const decoded = sg.decode(fileBuffer, filename.split('.').pop(), process.env.ENCRYPTION_KEY);

    console.log(decoded);

    res.end(decoded);
});

router.get('/index.php', async (req, res) => res.redirect('/'));
router.get('/index.html', async (req, res) => res.redirect('/'));

router.use('/favicon.ico', express.static(join(__dirname, '../../assets/favicon.png')));
router.use('/robots.txt', express.static(join(__dirname, '../../assets/robots.txt')));
router.use('/sitemap.xml', express.static(join(__dirname, '../../assets/sitemap.xml')));

router.get('*', async (req, res) => res.redirect('/'));

module.exports = router;
