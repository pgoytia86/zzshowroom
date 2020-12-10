// feature 1
import React from "react";
import store from "./store";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";



import {Grid, IconButton} from '@material-ui/core';

import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import WebIcon from '@material-ui/icons/Web';



class App extends React.Component {
 
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>

       
      <div className="grid-container">
        <header>
          <Link to="/">ZAZUSHOWROOM | Shopping Cart</Link>
      <Grid item >
                    <IconButton >
                        <InstagramIcon />
                        <a href="https://www.instagram.com/zazu.s" target="_blank" rel="noopener noreferrer">
                        Ig
                        </a>
                    </IconButton>                   
                        <IconButton >
                         <FacebookIcon />
                         <a href="https://www.facebook.com/zazu.showroom" target="_blank" rel="noopener noreferrer">
                            Fb
                            </a>
                         </IconButton>

                         <IconButton >
                    <WebIcon/>
                    <a href="https://www.zazushowroom.com" target="_blank" rel="noopener noreferrer">
                        Web
                        </a>
                     </IconButton>                  
                </Grid>
                
          <Link to="/admin" > Admin  </Link>
        
        </header>
        <main>
          <Route path ="/admin" component={AdminScreen} />
          <Route path="/" component={HomeScreen} exact  />
           
        
                        
        </main>
        <footer> Zazushowroom® 2020 Todos los Derechos Reservados - desarrollado por P.A.C.G

        </footer>
      </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
