const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files for documentation
app.use('/apidoc', express.static(path.join(__dirname, 'public/apidoc')));

// In-memory data store for weblinks
let weblinks = [
    { id: 1, title: 'Google', url: 'https://google.com', rating: 5 },
    { id: 2, title: 'GitHub', url: 'https://github.com', rating: 4 },
    { id: 3, title: 'Stack Overflow', url: 'https://stackoverflow.com', rating: 5 },
    { id: 4, title: 'Dev.to', url: 'https://dev.to', rating: 3 },
    { id: 5, title: 'MDN Web Docs', url: 'https://developer.mozilla.org', rating: 5 }
];

/**
 * @api {post} /api/weblink Create a new weblink
 * @apiName CreateWeblink
 * @apiGroup Weblink
 *
 * @apiParam {String} title Title of the weblink.
 * @apiParam {String} url URL of the weblink.
 * @apiParam {Number} rating Rating of the weblink.
 *
 * @apiSuccess {Object} weblink The newly created weblink.
 */
app.post('/api/weblink', (req, res) => {
    const { title, url, rating } = req.body;
    const newWeblink = {
        id: weblinks.length ? weblinks[weblinks.length - 1].id + 1 : 1,
        title,
        url,
        rating: Number(rating)
    };
    weblinks.push(newWeblink);
    res.status(201).json(newWeblink);
});

/**
 * @api {get} /api/weblink Display all weblinks
 * @apiName GetAllWeblinks
 * @apiGroup Weblink
 *
 * @apiSuccess {Object[]} weblinks List of all weblinks.
 */
app.get('/api/weblink', (req, res) => {
    res.json(weblinks);
});

/**
 * @api {get} /api/weblink/:id Read a specific weblink
 * @apiName GetWeblinkById
 * @apiGroup Weblink
 *
 * @apiParam {Number} id Weblink's unique ID.
 *
 * @apiSuccess {Object} weblink The requested weblink.
 */
app.get('/api/weblink/:id', (req, res) => {
    const weblink = weblinks.find(w => w.id === parseInt(req.params.id));
    if (!weblink) return res.status(404).send('Weblink not found');
    res.json(weblink);
});

/**
 * @api {put} /api/weblink/:id Update an existing weblink
 * @apiName UpdateWeblink
 * @apiGroup Weblink
 *
 * @apiParam {Number} id Weblink's unique ID.
 * @apiParam {String} [title] New Title of the weblink.
 * @apiParam {String} [url] New URL of the weblink.
 * @apiParam {Number} [rating] New Rating of the weblink.
 *
 * @apiSuccess {Object} weblink The updated weblink.
 */
app.put('/api/weblink/:id', (req, res) => {
    const weblink = weblinks.find(w => w.id === parseInt(req.params.id));
    if (!weblink) return res.status(404).send('Weblink not found');

    const { title, url, rating } = req.body;
    if (title) weblink.title = title;
    if (url) weblink.url = url;
    if (rating) weblink.rating = Number(rating);

    res.json(weblink);
});

/**
 * @api {delete} /api/weblink/:id Delete an existing weblink
 * @apiName DeleteWeblink
 * @apiGroup Weblink
 *
 * @apiParam {Number} id Weblink's unique ID.
 *
 * @apiSuccess {String} message Deletion confirmation message.
 */
app.delete('/api/weblink/:id', (req, res) => {
    const index = weblinks.findIndex(w => w.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Weblink not found');

    weblinks.splice(index, 1);
    res.json({ message: 'Weblink deleted' });
});

/**
 * @api {get} /api/weblink/rating/:rating Display weblinks by rating
 * @apiName GetWeblinksByRating
 * @apiGroup Weblink
 *
 * @apiParam {Number} rating Rating to filter by.
 *
 * @apiSuccess {Object[]} weblinks List of weblinks with the given rating.
 */
app.get('/api/weblink/rating/:rating', (req, res) => {
    const filtered = weblinks.filter(w => w.rating === parseInt(req.params.rating));
    res.json(filtered);
});

/**
 * @api {get} /api/weblink/filter/com Display .com weblinks
 * @apiName GetDotComWeblinks
 * @apiGroup Weblink
 *
 * @apiSuccess {Object[]} weblinks List of weblinks that end with .com.
 */
app.get('/api/weblink/filter/com', (req, res) => {
    const filtered = weblinks.filter(w => w.url.toLowerCase().endsWith('.com') || w.url.toLowerCase().includes('.com/'));
    res.json(filtered);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Documentation will be available at http://localhost:${PORT}/apidoc/index.html after generation.`);
});
