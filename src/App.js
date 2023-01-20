import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/common/NotFound";
import Profile from "./pages/Profile";
import Profiles from "./pages/Profiles";

function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/profiles" replace />} />
            <Route path="profiles" element={<Profiles />} />
            <Route path="profiles/:id" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
