import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import AuthenticatedPage from "./AuthenticatedPage"; // Import the authenticated page component

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/authenticated" element={<AuthenticatedPage />} />{" "}
          {/* Add this route */}
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
