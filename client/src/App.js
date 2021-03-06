import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import SettingsPage from './pages/Settings';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

class App extends Component {
  state = {
    token: null,
    userId: null,
    username: null
  };
  
  login = (token, userId, username, tokenExpiration) => {
    this.setState({ token: token, userId: userId, username: username });
  };
  
  logout = () => {
    this.setState({ token: null, userId: null, username: null });
  };

  render() {
    return (
      <Router>
        <AuthContext.Provider
        value={{
          token: this.state.token,
          userId: this.state.userId,
          username: this.state.username,
          login: this.login,
          logout: this.logout
        }}>
        <MainNavigation />
          <main className="main-content">
            <Switch>
              {this.state.token && <Redirect from="/" to="/events" exact />}
              {this.state.token && (
                <Redirect from="/auth" to="/events" exact />
              )}
              {!this.state.token && (
                <Route path="/auth" component={AuthPage} />
              )}
              <Route path="/events" component={EventsPage} />
              {this.state.token && (
                <Route path="/bookings" component={BookingsPage} />
              )}
              {this.state.token && (
                <Route path="/settings" component={SettingsPage} />
              )}
              {!this.state.token && <Redirect to="/auth" exact />}
            </Switch>
          </main>
        </AuthContext.Provider>
      </Router>
    );
  }
}

export default App;
