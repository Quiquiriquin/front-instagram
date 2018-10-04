import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client'
//https://cloneinstagrambackend-qxojrhfpsk.now.sh/

const httpLink = createHttpLink({
    uri: 'https://cloneinstagrambackend-qxojrhfpsk.now.sh/'
});


const authLink = setContext( (_,{headers}) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `JWT ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    link:authLink.concat(httpLink),
    cache:new InMemoryCache()
})


export default client;