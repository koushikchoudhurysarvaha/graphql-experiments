const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { AuthenticationError } = require("apollo-server-errors");
const { typeDefs: scalarTypeDefs, resolvers: scalarResolvers } = require('graphql-scalars');

const { init: initMySQLDB } = require("./mysql");
const {types: { typeDefs }} = require("./graphql/schema");
const {resolvers} = require("./graphql/resolver");

const app = express();
const PORT = process.env.PORT || 3005;
initMySQLDB();

(async function _(){
    const GraphQLServer = new ApolloServer({ 
        typeDefs: [ typeDefs, ...scalarTypeDefs ],
        resolvers: { ...resolvers, ...scalarResolvers },
        context: ({ req, res }) => {
            console.log(req.body.query);
            const queryDef = gql`
                ${req.body.query}
            `;
            const isAuthQuery = queryDef
                                .definitions[0]
                                .selectionSet
                                .selections[0]
                                .name.value === 'authenticate';
            if (!(isAuthQuery || req.headers['authorization'])) {
                throw new AuthenticationError('Error 1');
            }
            return { res, user: { id: 2, name: "Japanese Fighter Machine" } };
        }
    });
    await GraphQLServer.start();
    GraphQLServer.applyMiddleware({ app });
    app.listen({ port: PORT }, () => console.log("Server Running @", PORT));
})();
