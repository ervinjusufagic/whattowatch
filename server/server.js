const express = require("express");
const schema = require("./schema");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");

const app = express();

app.use(cors());

mongoose.connect(
  "mongodb+srv://ervinjusufagic:MpEj6jpGX5qDzdz3@wtw-stqza.azure.mongodb.net/test?retryWrites=true",
  {
    useNewUrlParser: true
  }
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,

  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT);
