import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./components/HomeLayout";
import AuthPages from "./pages/auth";
import TrialDashboard from "./pages/trials";
import CreateTrialPage from "./pages/addTrial";
import AddParticipantPage from "./pages/addParticipant";
import ParticipantDashboard from "./pages/participantDashboard";
import HealthDataForm from "./pages/visitForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPages />} />
          <Route path="/trials" element={<HomeLayout><TrialDashboard /></HomeLayout>} />
          <Route path="/add-trial" element={<HomeLayout><CreateTrialPage /></HomeLayout>} />
          <Route path="/add-participant" element={<HomeLayout><AddParticipantPage /></HomeLayout>} />
          <Route path="/participant-dashboard" element={<HomeLayout><ParticipantDashboard /></HomeLayout>} />
          <Route path="/visit-form" element={<HomeLayout><HealthDataForm /></HomeLayout>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
