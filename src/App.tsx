import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPages from "./pages/auth";

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
