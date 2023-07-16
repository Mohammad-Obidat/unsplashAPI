const express = require('express');
const axios = require('axios');
const router = express.Router();

// Default image URL for when image is not found
const defaultImageURL =
  'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png';

// Default description for when product description is not provided
const defaultDescription = 'The product does not have a provided description.';

// Function to fetch data from Unsplash API and map it using the provided mapper function
const getUnsplashApiData = async (mapper) => {
  try {
    const _URL = `https://api.unsplash.com/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
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
    description: product.description || defaultDescription,
    imageURL: product.urls.full || defaultImageURL,
  });

  return getUnsplashApiData(productsMapper);
};

const getImages = async () => {
  const imagesMapper = (image) => image.urls.regular || defaultImageURL;

  return getUnsplashApiData(imagesMapper);
};

// Route for getting the list of products
router.get('/', async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).send(products);
  } catch (error) {
    res.sendStatus(400);
  }
});

// Route for getting the images URL for the gallery
router.get('/imageGallery', async (req, res) => {
  try {
    const images = await getImages();
    res.status(200).send(images);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
