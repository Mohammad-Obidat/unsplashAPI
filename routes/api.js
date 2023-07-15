const express = require('express');
const axios = require('axios');
const router = express.Router();

const damageImage =
  'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png';
const descriptionNotFound = 'The product does not have a provided description.';

// Getting List of Products Using Unsplash API
const getData = async (mapper) => {
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

  return getData(productsMapper);
};

const getImages = async () => {
  const imagesMapper = (image) => image.urls.regular || damageImage;

  return getData(imagesMapper);
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

// Getting Searched List of Products by names from Unsplash API
const getProductsByName = async (productName) => {
  try {
    const _URL = `https://api.unsplash.com/search/photos?client_id=${process.env.unsplashAPI_KEY}&query=${productName}`;
    const searchedProductsByName = await axios.get(_URL);
    const searchedProducts = searchedProductsByName.data.results;
    return searchedProducts.map((searchedProduct) => ({
      id: searchedProduct.id,
      name: searchedProduct.user.name,
      description: searchedProduct.description || descriptionNotFound,
      imageURL: searchedProduct.urls.full || damageImage,
    }));
  } catch (error) {
    throw new Error('Error:', error.message);
  }
};

router.get('/search/:productName', async (req, res) => {
  try {
    const _productName = req.params.productName.toLowerCase();
    const _getProductsByName = await getProductsByName(_productName);
    res.status(200).send(_getProductsByName);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
