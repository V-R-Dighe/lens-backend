const ApolloClient = require("apollo-client").ApolloClient;
const apolloLink = require("apollo-link");
const createHttpLink = require("apollo-link-http").createHttpLink;
const InMemoryCache = require("apollo-cache-inmemory").InMemoryCache;
const IntrospectionFragmentMatcher = require("apollo-cache-inmemory").IntrospectionFragmentMatcher;
const introspectionQueryResultData = require("./fragmentTypes.json");
const gql = require("graphql-tag");
const gqlSchema = require('./gqlSchema');
const config = require("./config")

let client = null;

let accessToken = config.accessToken;
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const httpLink = createHttpLink({
  uri: "https://api-mumbai.lens.dev"
});

const authLink = new apolloLink.ApolloLink( (operation, forward) => {
  const token = accessToken;

  operation.setContext({
    headers: {
      "x-access-token": token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ fragmentMatcher })
});


async function createPostViaDispatcher(postDataCID){
  return await client.mutate({
   mutation: gql(gqlSchema.CREATE_POST_VIA_DISPATCHER), 
   variables: {
    postDataCID
  },
 });
}


module.exports = {createPostViaDispatcher}