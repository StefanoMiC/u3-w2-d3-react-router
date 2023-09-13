import { useLocation, useNavigate, useParams } from "react-router-dom";
// withRouter è una funzione che prende in input un componente React,
// ritorna una funzione, che sarà chiamata da React stesso, e riceverà le props classiche del componente
// dentro a questa seconda funzione andiamo ad estrarre dagli hooks i valori di location, navigate e params
// queste nuove variabili comporranno le props aggiuntive del router che daremo al component ricevuto in origine
// quindi il componente si troverà tutte le sue props classiche (se presenti), più quelle aggiuntive del router
const withRouter = Component => {
  return props => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    // viene ritornato il Componente con le props normali + aggiuntive del router
    return <Component {...props} location={location} navigate={navigate} params={params} />;
  };
};

export default withRouter;
// questo è un HOC - Higher Order Component: un componente che aumenta le funzionalità di un componente figlio

// l'utilizzo è semplice: all'export non si esporterà il componente semplice,
// ma il componente di ritorno da withRouter (vedi linea 14),
// ovvero quello già "aumentato" di props aggiuntive

//es. export default withRouter(Home)
