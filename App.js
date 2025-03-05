import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import StudentTable from './StudentTable';
import CreateStudent from './CreateStudent';
import ViewDetails from './ViewDetails';
import EditStudent from './EditStudent';
import example from './example';
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<StudentTable/>}>  </Route>
    <Route path="/student/create" element={<CreateStudent/>}> </Route>
    <Route path="/student/edit/:studentid" element={<EditStudent/>}> </Route>
    <Route path="/student/view/:studentid" element={<ViewDetails/>}> </Route>
    <Route path="/student/example/" element={<example/>}> </Route>
    
   </Routes>
   </BrowserRouter>
  );
}

export default App;
