import { useEffect } from "react";
import Aos from "aos";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../src/components/UI/Header";
import Footer from "./components/UI/Footer";
import { Home } from "./components/Home";
import { InsuranceForm } from "../src/components/UI/InsuranceForm";
import { PolicyButton } from "../src/components/UI/UserData";
import PolygonID from "./components/UI/PolygonID";
import { PolicyClaimedListener } from "./components/Hooks/PolicyClaimedListener";

function App() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/Registration" element={<InsuranceForm></InsuranceForm>}></Route>
          <Route path="/Policy" element={<PolicyButton />} />
          <Route path="/claim" element={<PolygonID></PolygonID>}></Route>
        </Routes>
        <PolicyClaimedListener /> <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
