import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NotFound = props => {
  //   const navigate = useNavigate();

  // navigate è una funzione
  // serve a ridirezionare l'utente ad una nuova rotta programmaticamente e SENZA REFRESH

  return (
    <div className={`text-center ${props.spacings}`}>
      <h1 className="display-4">{props.mainText}</h1>
      <p>
        La risorsa che stai cercando non esiste, <Link to="/">torna indietro.</Link>
      </p>

      <Link to="/">
        <Button variant={props.btnVariant || "warning"}>Torna alla Homepage</Button>
      </Link>
      {/* versione di navigazione programmatica anche da JSX (meglio se usata in metodi esterni) */}
      {/* <Button variant={props.btnVariant || "warning"} onClick={() => navigate("/")}>
        Torna alla Homepage
      </Button> */}
    </div>
  );
};
export default NotFound;
