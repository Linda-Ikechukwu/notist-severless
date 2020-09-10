import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import AppNav from './components/appNav';
import Home from './pages/home';
import AllNotes from './pages/allNotes';
import Note from './pages/note';
import NotFound from './pages/notFound'
import Login from './pages/login'

import './App.css';

const App = () => {
  return (
    <div className="App">
      <div className="notist">
          <AppNav/>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Home} />
            <Route exact path='/notes' component={AllNotes} />
            <Route exact path='/notes/:noteTitle' component={Note} />
            <Route component={NotFound}/>
          </Switch>
      </div>
    </div>
  );
}

export default App;
