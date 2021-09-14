import './App.css';
import React,{useState,useEffect} from 'react'
import Login from './Components/login'
import Home from './Components/home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function App(props) {
  console.log(window.location.pathname)
  
    const[loggedIn, setLoggedIn] = useState(false);
    const[user, setUser] = useState(window.location.pathname);
    useEffect(() => {
      let pop=localStorage.getItem("login")
      if(pop!="")
      {
        setLoggedIn(true)
      }
      console.log("pop1",loggedIn)

      
    }, [loggedIn])


  let history = useHistory();
  const logout = (event) => {
    console.log(window.location.pathname)
    localStorage.clear()
    setLoggedIn(false)
  };

  function login() {
    console.log("logged in");
    localStorage.clear()
  }
  const classes = useStyles();
  
  return (
   <React.Fragment>
     <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Contact Book 
          </Typography>
  

        </Toolbar>
      </AppBar>
    
      <Router>
      {
        !loggedIn && (
          <Redirect to="/login" />
        )
      }
 <Switch>

          <Route path="/login">
            <Login />
          </Route>
          {
        loggedIn && (
         <React.Fragment>
            <div className="text-center">
         <button class="btn btn-primary mt-5 button" onClick={logout }  >
          Logout
        </button>
         </div>
            <Route path="/home">
            <Home />
          </Route>
        
         </React.Fragment>

        )
      }
         
          <Route path="/">
            <Login />
          </Route>
        </Switch>
        </Router>
   </React.Fragment>

  );
}

export default App;
