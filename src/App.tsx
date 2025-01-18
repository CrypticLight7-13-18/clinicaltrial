import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPages from "./pages/auth";
import CreateTrialPage from './pages/addTrial'
import AddParticipantPage from './pages/addParticipant'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route
              path="/"
              element={
                <AuthPages />
              }
            />        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
