import React, { useState } from "react";
import { Hello } from "./Hello";

const App = () => {
  const [showHello, setShowHello] = useState(true);

  return (
    <div>
      <>
        <button onClick={() => setShowHello(!showHello)}>toggle</button>
        {showHello && <Hello />}
      </>
    </div>
  );
};

export default App;
