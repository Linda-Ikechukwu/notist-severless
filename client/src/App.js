import React, {useState} from 'react';
import { useContext, createContext } from "react";
import {Switch, Route, Redirect} from 'react-router-dom';

import AppNav from './components/appNav';
import Home from './pages/home';
import AllNotes from './pages/allNotes';
import Note from './pages/note';
import NotFound from './pages/notFound'
import Login from './pages/login'

import './App.css';

import { Auth } from "aws-amplify";

import { AppContext } from "./libs/context";

const App = (props) => {

  const [isAuthenticated, userHasAuthenticated] = useState(false);

  console.log(props);

  return (
    <div className="App">
      <div className="notist">
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <AppNav authStatus={isAuthenticated}/>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Home} />
            <Route exact path='/notes' component={AllNotes} />
            <Route exact path='/notes/:noteTitle' component={Note} />
            <Route component={NotFound}/>
          </Switch>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
