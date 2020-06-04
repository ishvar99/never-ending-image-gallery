require('dotenv').config();
global.fetch = require('node-fetch');
const config = require('../config/config');
const Unsplash = require('unsplash-js').default;
const { toJson } = require('unsplash-js');

const unsplash = new Unsplash({
  accessKey: config.ACCESS_KEY,
});

const app = require('express')();

app.get('/api/photos', (req, res) => {
  unsplash.photos
    .listPhotos(req.query.start, req.query.count)
    .then(toJson)
    .then((data) => res.json(data));
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
