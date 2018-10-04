import React, { Component } from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import client from './graphql';
import Home from './components/home/Home';
import isAuthenticated from './resolvers/isAuthenticated'
import Redirect from 'react-router-dom/Redirect';
import Me from './components/Me/Me';


class Routes extends Component {
    render() { 

        

        const PrivateRoute = ({component:Component,...rest}) => (
            <Route {...rest} render={(props) => (
                isAuthenticated() === true
                ? <Component {...props} />
                : <Redirect to='/login'/>
            )}/>
        )

        return ( 
            <Router>
                <ApolloProvider client={client}>
                    <main>
                        <Route exact path='/login' component={Login}></Route>
                        <Route exact path='/signup' component={Signup}></Route>
                        <PrivateRoute exact path='/' component={Home}></PrivateRoute>
                        <PrivateRoute exact path='/me' component={Me}></PrivateRoute>
                    </main>
                </ApolloProvider>
            </Router>
         );
    }
}
 
export default Routes;