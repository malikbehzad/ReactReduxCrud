import "./App.scss";
import Students from "./components/Studens";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddStudent from "./components/AddStudent";
import UpdateStudent from "./components/UpdateStudent.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Students />} />
          <Route exact path="/addStudent" element={<AddStudent />} />
          <Route exact path="/updateStudent/:id" element={<UpdateStudent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
