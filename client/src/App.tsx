import { Route, Routes } from "react-router-dom";

import { Auth, Home } from "./Pages";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  )
}

export default App;