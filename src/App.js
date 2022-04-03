/** Dependencies */
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/** Firebase Service */

/** components */
import Home from "./components/pages/home/Home";
import RegisterPage from "./components/pages/register/RegisterPage";
import Feed from "./components/pages/feed/Feed";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/feed" element={<Feed />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
