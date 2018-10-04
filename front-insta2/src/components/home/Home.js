import React, {Component} from 'react'
import './home.css'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Navbar from './Navbar'
import Notifier from '../Notifier';
import Post from '../Post/index'

const QUERY_ME = gql `
    query me{
        me{
           user_name
        }
    }
`

const QUERY_POSTS = gql `
    query allPhotos{
        allPhotos{
            id
            user{
                user_name
                profile_pic
            }
            url
            description
        }
    }
`

class Home extends Component{

    constructor(props){
        super(props);
    }

    getMe = () => (
        <Query query={QUERY_ME}>
            {({loading,err,data}) => {
                if (loading) return 'Loading...'
                if (err) return 'Error del servicio'
                return <Navbar data={data}/>
            }}
        </Query>
    )

    getAllPhotos = () => (
        <Query query={QUERY_POSTS}>
            {({loading, err, data}) => {
                if(loading) return 'Loading...'
                if(err) return 'Error del servicio'
                let posts = data.allPhotos.map( post => ( <Post data={post} />) );
                return posts;
            }}
        </Query>
    )
    

    render(){
        return (
            <div className="cover">
                {this.getMe()}
                <div className="row container-fluid">
                <Notifier />
                {this.getAllPhotos()}
                </div>
            </div>
        )
    }
}

export default Home;