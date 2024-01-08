import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Employee from './Employee';
function App() {
  return (
    <div className="App"> 
       <Router>
        <Routes>
          <Route exact path="/allDepartments" element={<Employee/>} />        
        </Routes>
      </Router>/
    </div>
  );
}

export default App;
