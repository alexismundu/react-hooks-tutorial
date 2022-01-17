import React, { useState } from "react";
import { Random } from "./Random";

const App = () => {
  const [showHello, setShowHello] = useState(true);

  return (
    <div>
      <>
        <button onClick={() => setShowHello(!showHello)}>toggle</button>
        {showHello && <Random />}
      </>
    </div>
  );
};

export default App;
