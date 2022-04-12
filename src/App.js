
import './App.scss';
import Students from './components/Studens';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddStudent from './components/AddStudent';


function App() { 
 return (
    <div className="App">
      <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/addStudent" element={<AddStudent />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;