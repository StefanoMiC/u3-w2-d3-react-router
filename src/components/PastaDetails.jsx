import { useState, useEffect } from "react";
import { Alert, Badge, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import menu from "../data/menu.json";
import DishComments from "./DishComments";

const PastaDetails = () => {
  const [pasta, setPasta] = useState(null);

  const params = useParams();
  console.log("PARAMS", params);
  // params è un oggetto che raccoglie al suo interno tutte le coppie
  // chiave-valore delle sezioni parametriche della vostra rotta

  const navigate = useNavigate();

  useEffect(() => {
    const pastaObj = menu.find(dish => dish.id.toString() === params.pastaId);
    // il find ritorna undefined nel caso in cui non trovi corrispondenza

    console.log("PASTA OBJ", pastaObj);

    setTimeout(() => {
      setPasta(pastaObj);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof pasta === "undefined") {
      setTimeout(() => {
        navigate("/menu");
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pasta]);

  return (
    <>
      {pasta ? (
        <>
          <Container fluid>
            <Row className="justify-content-center">
              <Col md={10}>
                <img
                  src={pasta.image}
                  alt="desert"
                  width="500"
                  className="mt-5 rounded-circle"
                  style={{ objectFit: "cover", maxWidth: "100%" }}
                />
                <h1 className="display-4">{pasta.name}</h1>
                <p>{pasta.description}</p>
                <Badge bg="danger" className="me-1">
                  {pasta.label}
                </Badge>
                <Badge bg="info">{pasta.price}$</Badge>
                {/* DishComments visualizza il titolo condizionalmente, se non passiamo la prop activateTitle,
               il suo valore sarà undefined => falsy e di conseguenza il titolo sarà nascosto per questo utilizzo di DishComments */}
                <DishComments selectedPasta={pasta} />
              </Col>
            </Row>
          </Container>
        </>
      ) : typeof pasta === "undefined" ? (
        <Alert variant="danger">Piatto non trovato! Verrai dirottato per sceglierne un altro</Alert>
      ) : (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="success" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </>
  );
};
export default PastaDetails;
