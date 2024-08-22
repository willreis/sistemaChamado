import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';

import cardData from "../data/cardDados.json";

function BasicExample() {
  return (
    <Col>
      <Row>
        {cardData.map((card) => (
          <Col key={card.id} sm={12} md={6} lg={4}>
            <Card style={{ width: "18rem" }} className="mb-4">
              <Card.Header style={{ backgroundColor: card.headerColor }}>
                <div className="tituloCard">
                  <span className="material-symbols-outlined">
                    {card.headerIcon}
                  </span>
                  <h4>{card.title}</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Text>{card.text}</Card.Text>
                <Link to={card.link}>
                <Button
                  style={{
                    backgroundColor: card.buttonColor,
                    borderColor: card.buttonColor,
                  }}
                >
                  {card.buttonText}
                </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );
}

export default BasicExample;
