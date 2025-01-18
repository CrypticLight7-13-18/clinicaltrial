import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPages from "./pages/auth";
import CreateTrialPage from "./pages/addTrial";
import AddParticipantPage from "./pages/addParticipant";
import TrialDashboard from "./pages/trials";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPages />} />
          <Route path="/trials" element={<TrialDashboard />} />
          <Route path="/add-trial" element={<CreateTrialPage />} />
          <Route path="/add-participant" element={<AddParticipantPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
