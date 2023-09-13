import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
// import TestComponent from "./TestComponent";

// proprietà che il server si aspetta di ricevere da noi per ogni prenotazione inviata:

// name <-- string
// phone <-- string
// numberOfPeople <-- string/number
// smoking <-- boolean
// dateTime <-- date/string
// specialRequests <-- string

const ReservationForm = props => {
  // state = {
  //   hasAlert: false,
  //   alert: { message: "", status: "", variant: "success" },
  //   userName: "StefanoMic", // non serve a nulla per il momento
  //   // stato iniziale dell'oggetto della prenotazione
  // reservation: {
  //   name: "",
  //   phone: "",
  //   numberOfPeople: "1",
  //   smoking: false,
  //   dateTime: "",
  //   specialRequests: ""
  // }
  // };

  const [hasAlert, setHasAlert] = useState(false);
  const [alert, setAlert] = useState({ message: "", status: "", variant: "success" });
  const [reservation, setReservation] = useState({
    name: "",
    phone: "",
    numberOfPeople: "1",
    smoking: false,
    dateTime: "",
    specialRequests: ""
  });

  const handleChange = (propertyName, propertyValue) => {
    setReservation({ ...reservation, [propertyName]: propertyValue });
  };

  const handleSubmit = async event => {
    // preventDefault è fondamentale in React, non vogliamo MAI che la pagina si refreshi
    event.preventDefault();

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/reservation", {
        method: "POST",
        body: JSON.stringify(reservation),
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log(response);
      if (response.ok) {
        setReservation({
          name: "",
          phone: "",
          numberOfPeople: "1",
          smoking: false,
          dateTime: "",
          specialRequests: ""
        });

        const newReserv = await response.json();

        // this.setState({
        //   hasAlert: true,
        // alert: {
        //   message: "la prenotazione " + newReserv._id + " è stata registrata con successo",
        //   status: response.status,
        //   variant: "success"
        // }
        // });

        setHasAlert(true);
        setAlert({
          message: "la prenotazione " + newReserv._id + " è stata registrata con successo",
          status: response.status,
          variant: "success"
        });
        setTimeout(() => setHasAlert(false), 2500);
      } else {
        setHasAlert(true);
        setAlert({ message: "Errore reperimento dati", status: response.status, variant: "danger" });
        setTimeout(() => setHasAlert(false), 2500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className={props.className}>
      <h2 className="text-center mt-5">Prenota il tuo tavolo</h2>
      {/* <TestComponent reservation={this.state.reservation} /> */}

      <Row className="justify-content-center">
        <Col md={8}>
          {hasAlert && (
            <Alert variant={alert.variant}>
              {alert.message}, status code: {alert.status}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo nome"
                value={reservation.name}
                onChange={event =>
                  // this.setState({ reservation: { ...this.state.reservation, name: event.target.value } })
                  handleChange("name", event.target.value)
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                placeholder="+393xxxx"
                value={reservation.phone}
                onChange={event => handleChange("phone", event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Numero di persone</Form.Label>
              <Form.Select
                value={reservation.numberOfPeople}
                onChange={event => handleChange("numberOfPeople", event.target.value)}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Fumatori"
                checked={reservation.smoking}
                onChange={event => handleChange("smoking", event.target.checked)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data e ora</Form.Label>
              <Form.Control
                type="datetime-local"
                value={reservation.dateTime}
                onChange={event => handleChange("dateTime", event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Richieste particolari? Scrivile qui.."
                rows={4}
                value={reservation.specialRequests}
                onChange={event => handleChange("specialRequests", event.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default ReservationForm;
