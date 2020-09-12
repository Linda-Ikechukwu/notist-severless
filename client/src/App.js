import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import AppNav from './components/appNav';
import Home from './pages/home';
import AllNotes from './pages/allNotes';
import Note from './pages/note';
import NotFound from './pages/notFound'
import Login from './pages/login'
import SignUp from './pages/signup'
import ConfirmSignUp from "./pages/confrimSignUp";


import './App.css';

import { Auth } from "aws-amplify";

import { AppContext } from "./libs/context";


const App = (props) => {

  const [isAuthenticated, userHasAuthenticated] = useState(false);

  const [isAuthenticating, setIsAuthenticating] = useState(true);//used to check if check if current user exists on app load

  //Check if a current user exists on first app load:[]
  useEffect(() => {
    async function checkAuthentication() {
      try {
        await Auth.currentSession();
        userHasAuthenticated(true);
      }
      catch (e) {
        if (e !== 'No current user') {
          alert(e);
        }
      }
      console.log(isAuthenticated);
      setIsAuthenticating(false);
    }
    checkAuthentication()
  }, [isAuthenticated]);

  console.log(props);

  return (
    !isAuthenticating &&
    <div className="App">
      <div className="notist">
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <AppNav authStatus={isAuthenticated} />
          <Switch>
            <Route exact path='/login' render={() =>
              isAuthenticated ? (<Redirect to='/' />) : (<Login />)
            }
            />
            <Route exact path='/signup' render={() =>
              isAuthenticated ? (<Redirect to='/' />) : (<SignUp />)
            }
            />
            <Route exact path='/confirm' component={ConfirmSignUp} />
            <Route exact path='/' render={() =>
              !isAuthenticated ? (<Redirect to='/login' />) : (<Home/>)
            }
            />
            <Route exact path='/notes' render={() =>
              !isAuthenticated ? (<Redirect to='/login' />) : (<AllNotes/>)
            }
            />
            <Route exact path='/notes/:noteId' component={Note} />
            <Route component={NotFound} />
          </Switch>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
