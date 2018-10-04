import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Mutation, Query} from 'react-apollo';
import FileUploader from 'react-firebase-file-uploader';
import Firebase from '../../Firebase';
import FormMe from './FormMe';
import Paypal from '../PayPal/PayPal'


const GET_ME = gql`
    query{
        me {
            full_name,
            user_name,
            email,
            password
            birth_date,
            gender,
            profile_pic,
            suscription{
                suscription_type
            }
        }
    }
`;

const CLIENT = {
    sandbox:"AexAROiSU7Voo5-BDRxXBDuKMegXTdaCmBZLGAo8fgL_L7at_bl2gmQ52ZW4Dl4mlC_yU0yj6_CVPcXS",
    production: ""
}

const ENV = process.env.NODE_ENV === "production" ? "production" : "sandbox";

const onSuccess = (payment) => {
    console.log(payment);
}

const onError = (error) => {
    console.log("Error",error);
}

const onCancel = (data) => {
    console.log("Cancel",data);
}

class Me extends Component {

    render() { 
        return ( 

            <div>
                <Query query={GET_ME}>
                {
                    ({loading,error,data}) => {
                        if(loading) return ( <h4>Loading...</h4> )
                        if(error) return (<h4>{error}</h4>)
                        return <FormMe data={data.me}/>

                    }

                }

                </Query>
                <Paypal
                    client={CLIENT}
                    env={ENV}
                    commit={true}
                    currency={'MXN'}
                    total={100}
                    onSuccess={onSuccess}
                    onError={onError}
                    onCancel={onCancel}
                
                />
            </div>
         );
    }
}
 
export default Me;