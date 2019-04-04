const express = require("express");
const schema = require("./schema");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT);
