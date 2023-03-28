import logo from './logo.svg';
import './App.css';
import { Registration } from './components/Registration';
import { BrowserRouter , Routes,Route} from "react-router-dom";
import { Login } from './components/Login';

import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <div className="App">
 
     <BrowserRouter>
   
   <Routes>
     <Route path="/" element={<Registration/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/dashboard" element={<Dashboard/>}/>
  
    
    
   </Routes>
  
   
   </BrowserRouter>
    </div>
  );
}

export default App;
