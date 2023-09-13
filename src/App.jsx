import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TopBar from "./components/TopBar";
import Home from "./components/Home";
import ReservationForm from "./components/ReservationForm";
import ReservationList from "./components/ReservationList";
import NotFound from "./components/NotFound";
import Menu from "./components/Menu";
import PastaDetails from "./components/PastaDetails";
import ClassComponent from "./components/ClassComponent";

// BrowserRouter è un componente che abilita le funzionalità di routing ai suoi figli
// non si traduce in un componente visibile con nessun nodo nel DOM

// Routes è un altro contenitore, ma contiene solo i componenti che desideriamo montare dinamicamente (o condizionalmente)
// i figli di Routes possono essere solo delle Route (componenti di rotte singole)
// le Route sono quei componenti che includeranno i NOSTRI componenti (le nostre pagine) all'interno, decideranno loro quando montarli (visualizzarli)
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar brand="Pasta Restaurant" claim="Niente secondi piatti!" />
        <Routes>
          <Route path="/" element={<Home className="mt-5" fontSize="fs-1" textSize="fs-5" />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/dettagli/:pastaId" element={<PastaDetails />} />
          <Route path="/prenotazioni" element={<ReservationList />} />
          <Route path="/prenota" element={<ReservationForm />} />
          <Route path="/class-component/:dynamicId" element={<ClassComponent myName="stefano" />} />
          <Route
            path="*"
            element={<NotFound spacings="mt-5" mainText="404 — Pagina non trovata" btnVariant="danger" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
