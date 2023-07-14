import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';

function ProductList() {
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const products = await fetch('http://localhost:5000/');
      const product = await products.json();
      setProductDetails(product);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [expandedMap, setExpandedMap] = useState({});

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
    return text.substring(0, maxLength) + '...';
  };

  return (
    <>
      <Row>
        {loading ? (
          <div className='d-flex justify-content-center align-items-center vh-100'>
            <Spinner
              animation='border'
              variant='primary'
              style={{ width: '2.5rem', height: '2.5rem' }}
            />
          </div>
        ) : (
          productDetails.map((product) => (
            <Col key={product.id} sm={6} md={3}>
              <Card style={{ width: '18rem' }}>
                <Card.Img
                  variant='top'
                  src={product.imageURL}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {truncateText(product.id, product.description, 50)}
                    {product.description.length > 50 && (
                      <span>
                        {expandedMap[product.id] ? (
                          <Button
                            variant='secondary'
                            onClick={() => toggleExpanded(product.id)}
                          >
                            Read less
                          </Button>
                        ) : (
                          <Button
                            variant='secondary'
                            onClick={() => toggleExpanded(product.id)}
                          >
                            Read more
                          </Button>
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
