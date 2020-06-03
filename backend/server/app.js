require('dotenv').config();
global.fetch = require('node-fetch');
const config = require('../config/config');
const Unsplash = require('unsplash-js').default;
const { toJson } = require('unsplash-js');

const unsplash = new Unsplash({
  applicationId: config.ACCESS_KEY,
  secret: config.SECRET_KEY,
  callbackUrl: config.CALLBACK_URL,
});

const app = require('express')();

app.get('/api/photos', (req, res) => {
  unsplash.photos.listPhotos(1, 30).then(toJson);
});
