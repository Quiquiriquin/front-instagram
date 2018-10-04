import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import imagen from './insta.png';
import './Signup.css'

const CREATE_USER = gql`
mutation Signup ($full_name:String!,$user_name:String!,$email:String!,$password:String!){
    signup(
      full_name:$full_name
      user_name:$user_name
      email:$email
      password:$password
      
    ){
      user{
        id
        email
      }
      token
    }
    
  }`

class Signup extends Component {

    constructor(props){
        super(props)
        this.state = {
            full_name: '',
            email: '',
            user_name: '',
            password: ''
        }

    }

    onInputChange = (event) => {
        let {id,value} = event.target
        this.setState({
            [id]:value
        })
    }

    onFormSubmit = (event,Signup) => {
        event.preventDefault();
        console.log('Ya me registré');
        console.log(this.state);
        Signup({
            variables:{
                full_name:this.state.full_name,
                user_name:this.state.user_name,
                email:this.state.email,
                password:this.state.password,
                
            }
        })
        .then( response => {
            console.log(response);
            console.log("Logueado")
            this.props.history.push('/login')
            //alert('todo chido')
        })
        .catch( err => {
            console.log(err);
            console.log('No logueado');
        })
    }

    render() { 
        
        return ( 
            <Mutation mutation={CREATE_USER}>
                {(Signup,{data}) =>(<div className="container">
			<div className="row main">
				<div className="main-login main-center">
				<h5 className="titulo">Regístrate para ver fotos y videos de tus amigos.</h5>
                <div className="row justify-content-center">
                    <div className="col-md-1"></div>
                    <img className="logo" src={imagen}/>

                    
                </div>
					<form onSubmit={(e) => this.onFormSubmit(e,Signup)}>

                    <div className="form-group">
							<label form="email" className="cols-sm-2 control-label"> </label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
									<input type="email" className="form-control" name="email" id="email"  placeholder="Correo electrónico"
                                    onChange={this.onInputChange}
                                    value={this.state.email}
                                    />
								</div>
							</div>
						</div>
						
						<div className="form-group">
							<label form="name" className="cols-sm-2 control-label"> </label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="full_name" id="full_name"  placeholder="Nombre completo"
                                    onChange={this.onInputChange}
                                    value={this.state.full_name}
                                    />
								</div>
							</div>
						</div>

						

						<div className="form-group">
							<label form="username" className="cols-sm-2 control-label"> </label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="user_name" id="user_name"  placeholder="Nombre de usuario"
                                    onChange={this.onInputChange}
                                    value={this.state.user_name}
                                    />
								</div>
							</div>
						</div>

						<div className="form-group">
							<label form="password" className="cols-sm-2 control-label"> </label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" className="form-control" name="password" id="password"  placeholder="Contraseña"
                                    onChange={this.onInputChange}
                                    value={this.state.password}
                                    />
								</div>
							</div>
						</div>

						<div className="form-group ">
							<button type="submit" id="button" className="btn btn-primary btn-lg btn-block login-button">Registrate</button>
						</div>
						
					</form>
				</div>
			</div>
		</div>)}
            </Mutation>
            
         );
    }
}
 
export default Signup;