import React from 'react';
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
import FinishAlternative from './api/finishAlternative';
import AnswerAQ_2 from './api/answerAQ_2';
import NuevoIntento from './api/nuevoIntento';
// import DrawDiagram from './api/drawCircuit'

import { UserProvider } from './contexts/userContext';

function App() {
  // const [currentUser, setCurrentUser] = useState(true);

  // if (currentUser) { 
  return (
      <div>
        <UserProvider>
        
          {/* <CreateTask/> */}
          <Router>
            {/* <GetStudentInfo/> */}
            <NavBar/>
            {/* <Circuit/> */}
            <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='home/:studentId' Component={Home}/>
              <Route path='/register' Component={Register}/>
              <Route path='/login' Component={Login}/>
              {/*<Route path="/:studentId" Component={CreateTask} />*/}

              <Route path='/:studentId/answerAQ/:taskId' Component={GetTask}/>
              <Route path="/student/:studentId/getNumeric/:taskId" Component={GetNumeric} />

              <Route path="/:studentId/answertask/:taskId" Component={AnswerTask}/> 
              {/* <Route path="/student/:studentId/getNumeric/:taskId" Component={GetNumeric} /> */}

              {/* <Route path='/'></Route> */}
              <Route path="/student/:studentId/finishnumeric/:taskId" Component={FinishNumeric}/>

              <Route path="/:studentId/answertask/:taskId" Component={AnswerTask}/> 
              <Route path="/student/:studentId/answerAQ2/:taskId" Component={AnswerAQ_2}/>
              <Route path="/student/:studentId/nuevointento/:taskId" Component={NuevoIntento}/>
              <Route path="/student/:studentId/finishalternative/:taskId" Component={FinishAlternative}/>
              
              
              
            </Routes>
            
          </Router>
        </UserProvider>
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
