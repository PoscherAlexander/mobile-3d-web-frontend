import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Login from './pages/login.page';
import Home from './pages/home.page';
import Settings from './pages/settings.page';
import AccountSettings from './pages/accountsettings.page';
import ConnectionSettings from './pages/connectionsettings.page';
import AddAccount from './pages/addaccount.page';
import Files from './pages/files.page';
import Upload from './pages/upload.page';
import Controls from './pages/controls.page';
import LoadingWithIcon from './pages/loading.page';

import { userService } from './services/users.service';

import { UserContext } from './contexts/user.context';
import PrinterSettings from './pages/printersettings.page';

//create consistent theme styling for app
const theme = createMuiTheme({
  palette: {
      primary:  {
          main: '#0078d7',
      },
      secondary: {
          main: '#9c27b0',
      },
  },
  typography: {
      useNextVariants: true,
  },
});

function RedirectToLogin() {
  return (
    <Redirect exact to="/login" />
  );
}

function App() {

  const [authorized, setAuthorized] = useState(window.localStorage.getItem('token') !== null ? true : false);
  const [userPromiseResolved, setUserPromiseResolved] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (window.localStorage.getItem('token') !== null) {
      
      userService.lookup().then((data) => {

        if (data._id === undefined) {
          setAuthorized(false);
          setUser({
            authorized: false
          });
          setUserPromiseResolved(true);
        } else {
          setAuthorized(true);
          data.authorized = true;
          setUser(data);
          setUserPromiseResolved(true);
        }

      });

    } else {
      setUser({
        authorized: false
      });
      setUserPromiseResolved(true);
    }

  }, []);

  // if data has not been fetched yet
  if (!userPromiseResolved) {
    return (
      <MuiThemeProvider theme={theme}>
        <LoadingWithIcon />
      </MuiThemeProvider>
    );
  }

  // otherwise
  return (
    <MuiThemeProvider theme={theme}>
      <UserContext.Provider value={user}>
        <Router>
          <div>

            { authorized ? (
              <div>  
                <UserContext.Consumer>
                  {user => (
                    <div>

                      <Route exact path="/" render={ props => (                        
                        <Home user={user} />        
                      )} />

                      <Route exact path="/controls" render={ props => (
                        <Controls />
                      )} />

                      <Route exact path="/upload" render={ props => (
                        <Upload />
                      )} />

                      <Route exact path="/files" render={ props => (
                        <Files />
                      )} />

                      <Route exact path="/settings" render={ props => (
                        <Settings />
                      )} />

                      <Route exact path="/settings/connection" render={ props => (
                        <ConnectionSettings />
                      )} />

                      <Route exact path="/settings/printer" render={ props => (
                        <PrinterSettings />
                      )} />

                      <Route exact path="/settings/accounts" render={ props => (
                        <AccountSettings {...props} />
                      )} />

                      <Route exact path="/settings/accounts/add" render={ props => (
                        <AddAccount {...props} />
                      )} />

                    </div> 
                  )}
                </UserContext.Consumer>

              </div>
            ) : (<RedirectToLogin />)
            }

            <Route exact path="/login" render={ props => (
              <UserContext.Consumer>
                { user => (
                  <Login user={user} />
                )}
              </UserContext.Consumer>
            )} />

          </div>
        </Router>
      </UserContext.Provider>
    </MuiThemeProvider>
  );
}

export default App;
