import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPages from "./pages/auth";
import CreateTrialPage from './pages/addTrial'
import AddParticipantPage from './pages/addParticipant'
import TrialDashboard from './pages/trials'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route
              path="/"
              element={
                <TrialDashboard />
              }
            />        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
