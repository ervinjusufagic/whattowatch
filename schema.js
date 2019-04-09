const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = require("graphql");

const RatingAndActorType = new GraphQLObjectType({
  name: "actorsAndRating",
  fields: () => ({
    rating: { type: GraphQLString },
    votes: { type: GraphQLString },
    metascore: { type: GraphQLString },
    actors: { type: new GraphQLList(ActorType) }
  })
});

const ActorType = new GraphQLObjectType({
  name: "actors",
  fields: () => ({
    actorName: { type: GraphQLString }
  })
});

const TrailerType = new GraphQLObjectType({
  name: "TrailerType",
  fields: () => ({
    key: { type: GraphQLString },
    type: { type: GraphQLString }
  })
});

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
    },
    movieTrailer: {
      type: TrailerType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://api.themoviedb.org/3/movie/${
              args.id
            }/videos?api_key=d3bc8ccb47c8aae5e110016737796192&language=en-US`
          )
          .then(res => res.data.results[0]);
      }
    },
    actorsAndRating: {
      type: RatingAndActorType,
      args: {
        imdb_id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://www.myapifilms.com/imdb/idIMDB?idIMDB=${
              args.imdb_id
            }&token=8a1ef2aa-5679-4eae-9310-64224ef78850&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=1&biography=0&bornDied=0&actorActress=0&similarMovies=0&goofs=0&keyword=0&quotes=0&fullSize=0&companyCredits=0&filmingLocations=0&directors=0&writers=0`
          )
          .then(res => res.data.data.movies[0]);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
