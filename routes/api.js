const express = require('express');
const axios = require('axios');
const router = express.Router();

const descriptionNotFound = 'The product does not have a provided description.';
const damageImage =
  'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png';

const getProducts = async () => {
  const URL = `https://api.unsplash.com/photos?client_id=${process.env.unsplashAPI_KEY}`;
  const products = await axios.get(URL);
  return products.data.map((product) => ({
    id: product.id,
    name: product.user.name,
    description: product.description || descriptionNotFound,
    imageURL: product.urls.full || damageImage,
  }));
};

const getImages = async () => {
  const URL = `https://api.unsplash.com/photos?client_id=${process.env.unsplashAPI_KEY}`;
  const images = await axios.get(URL);
  return images.data.map((image) => image.urls.regular || damageImage);
};

router.get('/', async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).send(products);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.get('/imageGallery', async (req, res) => {
  try {
    const images = await getImages();
    res.status(200).send(images);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
