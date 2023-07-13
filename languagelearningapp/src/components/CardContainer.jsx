import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CardContainer = () => {
  const cardData = [
    'Card 1',
    'Card 2',
    'Card 3',
    'Card 4',
    'Card 5',
    'Card 6',
    'Card 7',
    'Card 8',
    'Card 9',
    'Card 10',
    'Card 11',
    'Card 12',
  ];

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {cardData.map((card, index) => (
              <Col key={index}>
                <Card>{card}</Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CardContainer;

