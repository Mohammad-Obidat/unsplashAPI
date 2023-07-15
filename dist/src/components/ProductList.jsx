import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner, Toast } from 'react-bootstrap';
import '../styles/ProductList.css';

function ProductList({ searchParam }) {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedMap, setExpandedMap] = useState({});

  const fetchProducts = async () => {
    try {
      const products = await fetch('http://localhost:5000/');
      const product = await products.json();
      setProductList(product);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching product details.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    if (searchParam === '') {
      setFilteredProducts(productList);
    } else {
      const filter = productList.filter((p) =>
        p.name.toLowerCase().includes(searchParam.toLowerCase())
      );
      setFilteredProducts(filter);
    }
  }, [searchParam, productList]);

  const toggleExpanded = (productId) => {
    setExpandedMap((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  const truncateText = (productId, text, maxLength) => {
    if (text.length <= maxLength || expandedMap[productId]) {
      return text;
    }
    return text.substring(0, maxLength) + ' ... ';
  };

  return (
    <>
      <Row>
        {loading ? (
          <div className='d-flex justify-content-center align-items-center vh-100'>
            <Spinner
              animation='border'
              variant='primary'
              className='loadingSpinner'
            />
          </div>
        ) : error ? (
          <div className='d-flex justify-content-center align-items-center'>
            <Toast
              show={true}
              onClose={() => setError(null)}
              className='error-toast'
            >
              <Toast.Header closeButton={false}>
                <strong>Error</strong>
              </Toast.Header>
              <Toast.Body>{error}</Toast.Body>
            </Toast>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Col key={product.id} sm={6} md={3}>
              <Card className='productCard'>
                <Card.Img
                  variant='top'
                  className='productCardImg'
                  src={product.imageURL}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {truncateText(product.id, product.description, 50)}
                    {product.description.length > 50 && (
                      <span className='expandableSpan'>
                        {expandedMap[product.id] ? (
                          <span onClick={() => toggleExpanded(product.id)}>
                            Read less
                          </span>
                        ) : (
                          <span onClick={() => toggleExpanded(product.id)}>
                            Read more
                          </span>
                        )}
                      </span>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </>
  );
}

export default ProductList;
