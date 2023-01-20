import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/common/NotFound";
import Profile from "./pages/Profile";
import ProfileList from "./pages/ProfileList";

function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/profiles" replace />} />
            <Route path="profiles" element={<ProfileList />} />
            <Route path="profiles/:id" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
