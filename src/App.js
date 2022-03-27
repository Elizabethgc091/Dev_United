/** Dependencies */
import React from "react";

/** Firebase Service */
import { db } from "./firebaseService/firebase";

/** components */
import Home from "./components/home/Home";

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
