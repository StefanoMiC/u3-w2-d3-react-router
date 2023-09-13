import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import menu from "../data/menu.json";
import { Link } from "react-router-dom";

const Menu = () => (
  <Container className="mt-5">
    <Row className="justify-content-center text-center gy-5">
      {menu.map(dish => (
        <Col xs={12} md={8} lg={7} key={`dish-${dish.id}`}>
          <Card>
            <Card.Img variant="top" src={dish.image} />
            <Card.Body>
              <Card.Title>{dish.name}</Card.Title>
              <Card.Text>{dish.description}</Card.Text>
              <Badge bg="danger me-1">{dish.label}</Badge>
              <Badge bg="info">{dish.price}</Badge>
            </Card.Body>
            <Card.Footer>
              <Link to={"/menu/dettagli/" + dish.id}>
                <Button variant="dark" className="w-100">
                  Dettaglio per {dish.name}
                </Button>
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);
export default Menu;
