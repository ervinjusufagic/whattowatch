const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = require("graphql");

const RandomMovieType = new GraphQLObjectType({
  name: "RandomMovie",
  fields: () => ({
    id: { type: GraphQLInt }
  })
});

const GenreType = new GraphQLObjectType({
  name: "Genre",
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLInt }
  })
});

const DetailedMovieType = new GraphQLObjectType({
  name: "DetailedMovie",
  fields: () => ({
    id: { type: GraphQLInt },
    imdb_id: { type: GraphQLString },
    title: { type: GraphQLString },
    overview: { type: GraphQLString },
    runtime: { type: GraphQLInt },
    poster_path: { type: GraphQLString },
    release_date: { type: GraphQLString },
    genres: { type: GraphQLNonNull(new GraphQLList(GenreType)) }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    randomMovies: {
      type: new GraphQLList(RandomMovieType),
      args: {
        page: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://api.themoviedb.org/3/discover/movie?api_key=d3bc8ccb47c8aae5e110016737796192&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=${
              args.page
            }`
          )
          .then(res => res.data.results);
      }
    },
    detailedMovie: {
      type: DetailedMovieType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://api.themoviedb.org/3/movie/${
              args.id
            }?api_key=d3bc8ccb47c8aae5e110016737796192&language=en-US`
          )
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
