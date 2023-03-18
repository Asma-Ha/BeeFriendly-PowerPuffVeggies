import "./App.css";

import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingUser from "../src/Pages/LandingUser";
import Report from "../src/Pages/Report";
import ResearchWorkshop from "../src/Pages/ResearchWorkshops";
import SingleWorkshop from "../src/Pages/SingleWorkshop";

import LandingBee from "./Pages/LandingBee";
import ResearchHive from "./Pages/ResearchHive";
import SingleHive from "./Pages/SingleHive";
import AddWorkshop from "./Pages/AddWorkshop";

function App() {
  return (
    <div>
      <main className="section-container relative">
        <Router>
          <Navbar />
          <div className="">
            <Routes>
              <Route index path="/" element={<LandingUser />} />
              <Route path="/Report" element={<Report />} />
              <Route path="/ResearchWorkshop" element={<ResearchWorkshop />} />
              <Route path="/ResearchWorkshop:id" element={<SingleWorkshop />} />

              <Route path="/LandingBee" element={<LandingBee />} />
              <Route path="/ResearchHive" element={<ResearchHive />} />
              <Route path="/ResearchHive:id" element={<SingleHive />} />
              <Route path="/AddWorkshop" element={<AddWorkshop />} />
            </Routes>
          </div>
        </Router>
      </main>
    </div>
  );
}

export default App;
