const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const {schema} = require("./graphql/schema");

const app = express();
const PORT = process.env.PORT || 3005;

// NOTE: This is a middleware, not a route.
//       This will create a GET route.
app.use("/graphql", graphqlHTTP({
    schema
}));


app.listen(PORT, () => console.log("Server Running @", PORT));