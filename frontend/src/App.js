import { useEffect } from "react";
import Aos from 'aos'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import Header from "../src/components/UI/Header";

import Footer from "./components/UI/Footer";
import { Home } from "./components/Home";
import { InsuranceForm } from "../src/components/UI/InsuranceForm";

function App() {

  useEffect(() => {
     Aos.init();
  }, []);

  return (
      <>
      
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/Form" element={<InsuranceForm></InsuranceForm>}></Route>
      </Routes>
      <Footer/> 
      </BrowserRouter>
      
      </>
  );
}

export default App;
