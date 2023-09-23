import React, { useState, useEffect } from 'react';
import './static/App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import GetTask from './api/answerTask';
import Register from './api/Register';
import Login from './api/Login'
// import GetStudentInfo from './api/getStudentInfo';
import GetNumeric from './api/getNumeric';
import FinishNumeric from './api/finishNumeric';
import AnswerTask from './api/answerTask';
// import DrawDiagram from './api/drawCircuit'

function App() {
  // const [currentUser, setCurrentUser] = useState(true);

  // if (currentUser) { 
  return (
      <div>
        
        {/* <CreateTask/> */}
        <Router>
          {/* <GetStudentInfo/> */}
          {/* <Circuit/> */}
          <Routes>
            <Route path='home/:studentId' Component={Home}/>
            {/*<Route path="/:studentId" Component={CreateTask} />*/}
            <Route path="/:studentId/answertask/:taskId" Component={AnswerTask}/> 
            {/* <Route path="/student/:studentId/getNumeric/:taskId" Component={GetNumeric} /> */}
            {/* <Route path='/'></Route> */}
            <Route path="/student/:studentId/finishnumeric/:taskId" Component={FinishNumeric}/>
          </Routes>
          
        </Router>
      </div>
    );
  // } else {
  //   return (
  //     <div>
  //     <Login/>
  //       <Router>
  //         <Routes>
  //           <Route path="/register" Component={Register}/>
  //           <Route path="/home" Component={Home}/>
  //         </Routes>
  //       </Router>
  //     </div>
  //   )
  // }
}

export default App;
