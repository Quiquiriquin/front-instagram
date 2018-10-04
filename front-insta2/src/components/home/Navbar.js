import React, { Component } from 'react';
import './Header.css';
import {Link} from 'react-router-dom';

class Navbar extends React.Component{
    render(){

        const userName = this.props.user_name;

        return (
            <nav className="Nav">
                <div className="Nav-menus">
                    <div className="Nav-brand">
                        <a className="Nav-brand-logo" href="/">
                            Instagram
                        </a>
                        <Link to="/me">
                            <h4 className="Nav-brand-name" style={{}}>Hola{this.userName}</h4>
                        </Link> 
                   </div>
                 </div>
            </nav>
           );
        }   
    }
    export default Navbar;
