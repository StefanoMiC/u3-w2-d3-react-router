import { useState, useEffect } from "react";
import { Alert, Badge, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
// ReservationList è un componente che si occuperà di reperire la lista degli appuntamenti dalle API
// una volta ottenuta la lista si occuperà di renderizzarla come elementi JSX

// Reperire una risorsa esterna può richiedere del tempo... (anche variabile)
// Un componente presenterà all'utente prima le PARTI STATICHE dell'interfaccia, tipicamente l'attesa è compensata da un indicatore di caricamento
// quando i dati arrivano popoleremo l'interfaccia con gli elementi JSX corrispondenti agli elementi della lista ricevuta dal server

//Abbiamo un componente a Classe perché ci serve lo stato per tenere traccia di: stato di caricamento, lista dei dati, eventuali errori

//PASSAGGI DA EFFETTUARE:
// 1) Inizializzare lo stato iniziale con array vuoto (ed eventuali altre proprietà vuote)
// 2) render() viene invocato per la prima volta al caricamento del componente, ed essendo collegato allo stato iniziale, renderizzerà solo le parti STATICHE
// 3) finito il primo render() ci servirà di capire come azione un cambio di stato UNA VOLTA SOLA, con i dati provenienti dal server
// 4) Utilizzeremo un —metodo del ciclo di vita— del componente, il componentDidMount() per eseguire la funzione con la fetch all'interno e recuperare i dati
// 5) a causa della chiamata di setState() e conseguente cambio di stato, render() viene invocato un'altra volta: le parti statiche rimangono invariate,
//    quelle connesse allo stato verranno aggiornate automaticamente.

const ReservationList = props => {
  // state = {
  //   isLoading: true,
  //   hasError: false,
  //   reservations: []
  // };

  const [isLoading, setIsLoading] = useState(true); // [true, f(){}]
  const [hasError, setHasError] = useState(false); // [false, f(){}]
  const [reservations, setReservations] = useState([]); // [[], f(){}]

  const fetchReservations = async () => {
    // this.setState({ isLoading: true });
    setIsLoading(true);

    console.log("FETCH RESERVATIONS");
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/reservation");

      if (response.ok) {
        const reservationsList = await response.json();
        setReservations(reservationsList);
        // ogni volta che cambia lo stato, render() viene invocato di nuovo
        console.log("setState");
      } else {
        console.log("setState");
        setHasError(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // il metodo finally verrà eseguito SEMPRE e IN OGNI CASO, torna utile per qualcosa che debba avvenire sempre e comunque (sia in condizioni positive che negative)
      setIsLoading(false);
    }
  };

  // componentDidMount = () => {
  // componentDidMount() avviene dopo la prima invocazione di render(), e avviene UNA VOLTA SOLA poco prima della fine del montaggio del componente
  // console.log("COMPONENT DID MOUNT");
  // come regola generale, le fetch che dovrebbero popolare l'interfaccia inizialmente statica con elementi dinamici,
  // dovrebbero avvenire nel componentDidMount, per evitare una ricosione infinita.

  // il fatto che componentDidMount() venga eseguito una volta sola e una soltanto
  // unito al fatto che viene eseguito in maniera NON-BLOCCANTE (dopo il render iniziale)
  // lo rende PERFETTO per eseguire operazioni asincrone con fetch()
  //   this.fetchReservations();
  // };

  useEffect(() => {
    fetchReservations();
  }, []);

  console.log("RENDER");
  // render viene eseguito la prima volta al montaggio,
  // ma viene eseguito NUOVAMENTE ogni volta che c'è un cambio nello
  // state o nelle props

  // this.fetchReservations() !!! DA NON FARE ASSOLUTAMENTE !!!
  // fare un setState nel render === infinite loop

  return (
    <Container className={props.className}>
      <h2 className="text-center mt-5">Prenotazioni attuali</h2>

      <Row className="justify-content-center text-center">
        <Col md={8}>
          {/* render condizionale dell'avviso di errore */}
          {hasError && <Alert variant="danger">Errore nella fetch</Alert>}
          {/* render condizionale dello Spinner */}
          {isLoading && <Spinner animation="border" variant="warning" />}

          <ListGroup>
            {/* render condizionale per avviso di prenotazioni ancora vuote (al primo utilizzo dell'applicazione) */}
            {reservations.length === 0 && !hasError && !isLoading && (
              <ListGroup.Item>Non ci sono prenotazioni al momento</ListGroup.Item>
            )}

            {/* qui inseriamo la lista dinamica, quando verrà fetchata*/}
            {reservations.map(reserv => (
              <ListGroup.Item key={reserv._id} className="d-flex">
                <span className="me-auto">
                  <Badge bg="dark" className="me-2">
                    🧑‍🤝‍🧑{reserv.numberOfPeople}
                  </Badge>
                  {reserv.name} per <strong>{reserv.numberOfPeople}</strong>
                </span>
                {reserv.smoking && <span>🚬</span>}
                <span>{new Date(reserv.dateTime).toLocaleTimeString()}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ReservationList;
