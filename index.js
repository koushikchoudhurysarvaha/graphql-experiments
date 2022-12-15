const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { init: initMySQLDB } = require("./mysql");
const {types: { typeDefs }} = require("./graphql/schema");
const {resolvers} = require("./graphql/resolver");

const app = express();
const PORT = process.env.PORT || 3005;
initMySQLDB();

(async function _(){
    const GraphQLServer = new ApolloServer({ 
        typeDefs, 
        resolvers,
        context: ({ req, res }) => {
            if (!req.headers['authorization']) {
                res.sendStatus(401);
                return;
            }
            return { res, user: { id: 1, name: "Japanese Fighter Machine" } };
        }
    });
    await GraphQLServer.start();
    GraphQLServer.applyMiddleware({ app });
    app.listen({ port: PORT }, () => console.log("Server Running @", PORT));
})();
