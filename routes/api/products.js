const express = require('express');
const axios = require('axios');
const router = express.Router();

const damageImage =
  'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png';
const descriptionNotFound = 'The product does not have a provided description.';

// Getting List of Products Using Unsplash API
const getUnsplashApiData = async (mapper) => {
  try {
    const _URL = `https://api.unsplash.com/photos?client_id=${process.env.unsplashAPI_KEY}`;
    const response = await axios.get(_URL);
    return response.data.map(mapper);
  } catch (error) {
    throw new Error('Error:', error.message);
  }
};

const getProducts = async () => {
  const productsMapper = (product) => ({
    id: product.id,
    name: product.user.name,
    description: product.description || descriptionNotFound,
    imageURL: product.urls.full || damageImage,
  });

  return getUnsplashApiData(productsMapper);
};

const getImages = async () => {
  const imagesMapper = (image) => image.urls.regular || damageImage;

  return getUnsplashApiData(imagesMapper);
};

router.get('/api/', async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).send(products);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.get('/api/imageGallery', async (req, res) => {
  try {
    const images = await getImages();
    res.status(200).send(images);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
