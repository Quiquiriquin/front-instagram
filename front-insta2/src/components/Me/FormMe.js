import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Mutation, renderToStringWithData} from 'react-apollo';
import FileUploader from 'react-firebase-file-uploader';
import Firebase from '../../Firebase';
import './Signup.css';

const UPDATE_ME = gql`
    mutation updateUser(
        $user_name: String!,
        $full_name: String!,
        $password: String!,
        $birth_date: String!,
        $gender:Genders,
        $profile_pic: String!
        ){
            updateUser(
                user_name: $user_name,
                full_name : $full_name,
                password: $password,
                birth_date: $birth_date,
                gender: $gender, 
                profile_pic: $profile_pic
            ){
                id,
                user_name,
                profile_pic,
                gender
            }
        }
`;


class FormMe extends Component {

    constructor(props){
        super(props)
        this.state = {
            ...props.data
        }
    }

    handleInput = (event) => {
        let {name,value} = event.target
        this.setState(
            {[name]:value}
        )
    }

    formSubmit = (e,updateUser) => {
        e.preventDefault();
        console.log(this.state);
        updateUser(
            {variables:{
                ...this.state
            }}
        )

    }

    uploadFile = async(filename) => {
        let url = await Firebase.storage().ref('avatars').child(filename)
            .getDownloadURL()
            this.setState({profile_pic:url})
    }

    render() { 
        return ( 

            <Mutation mutation={UPDATE_ME}>
                {
                    (updateUser,{data}) => (
            <div className="container">
            <div className = "row main justify-content-center">
                <div className = "col-6 main-center">
                        <img src={this.state.profile_pic} className="img-fluid rounded-circle text-center" width="150"/>
                    <form onSubmit={(e) => this.formSubmit(e,updateUser)}>
                        <div className="form-group">
                            <label htmlForm="">Nombre completo</label>
                            <input className="form-control" type="text" name="full_name" value={this.state.full_name} 
                            onChange={this.handleInput}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlForm="">Username</label>
                            <input className="form-control" type="text" name="user_name" value={this.state.user_name} 
                            onChange={this.handleInput}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlForm="">Fecha de nacimiento:</label>
                            <input className="form-control" type="text" name="birth_date" value={this.state.birth_date}
                            onChange={this.handleInput} />
                        </div>
                        <div className="form-group">
                            <label htmlForm="">Genero:</label>
                            <select name="gender" className="form-control" id="" value={this.state.gender}
                            onChange={this.handleInput}>
                                <option value="H">Hombre</option>
                                <option value="M">Mujer</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlForm="">Email:</label>
                            <input className="form-control" type="text" name="email" disabled value={this.state.email}
                            onChange={this.handleInput} />
                        </div>
                        <div className="form-group">
                            <label htmlForm="" className="btn btn-danger">Escoger foto de perfil
                            <FileUploader
                                hidden
                                accept="image/*"
                                randomizeFilename
                                storageRef={
                                    Firebase.storage().ref('avatars')
                                }
                                onUploadError = {(err) => console.log(err)}
                                onUploadSuccess = {this.uploadFile}
                            >

                            </FileUploader>
                            </label>

                        </div>
                        <button type="submit" className="btn btn-success">Guardar</button>
                    </form>
                </div>
            </div>
            </div>
                    )
                }
            </Mutation>
         );
    }
}

export default FormMe;