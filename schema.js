const axios = require("axios");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLBoolean
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});

const RandomIds = new GraphQLObjectType({
  name: "RandomId",
  fields: () => ({
    id: { type: GraphQLInt }
  })
});

const VideoResultType = new GraphQLObjectType({
  name: "VideoResult",
  fields: () => ({
    id: { type: GraphQLString },
    key: { type: GraphQLString },
    type: { type: GraphQLString }
  })
});

const VideoType = new GraphQLObjectType({
  name: "Video",
  fields: () => ({
    results: { type: new GraphQLList(VideoResultType) }
  })
});

const CastType = new GraphQLObjectType({
  name: "Cast",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    character: { type: GraphQLString },
    profile_path: { type: GraphQLString }
  })
});

const CreditsType = new GraphQLObjectType({
  name: "Credits",
  fields: () => ({
    cast: { type: new GraphQLList(CastType) }
  })
});

const GenreType = new GraphQLObjectType({
  name: "Genre",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
});

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLInt },
    imdb_id: { type: GraphQLString },
    title: { type: GraphQLString },
    overview: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    release_date: { type: GraphQLString },
    vote_average: { type: GraphQLFloat },
    vote_count: { type: GraphQLInt },
    runtime: { type: GraphQLInt },
    genres: { type: new GraphQLList(GenreType) },
    videos: { type: VideoType },
    credits: { type: CreditsType }
  })
});

const SearchType = new GraphQLObjectType({
  name: "Search",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    overview: { type: GraphQLString },
    poster_path: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    randomIds: {
      type: new GraphQLList(RandomIds),
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
    movie: {
      type: MovieType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://api.themoviedb.org/3/movie/${
              args.id
            }?api_key=d3bc8ccb47c8aae5e110016737796192&append_to_response=videos,credits`
          )
          .then(res => res.data);
      }
    },
    search: {
      type: new GraphQLList(SearchType),
      args: {
        query: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=d3bc8ccb47c8aae5e110016737796192&language=en-US&query=${
              args.query
            }&include_adult=false`
          )
          .then(res => res.data.results);
      }
    }
  }
});

MutationType = new GraphQLObjectType({
  name: "MutationType",
  fields: {
    createUser: {
      type: GraphQLBoolean,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.find({ email: args.email })
          .exec()
          .then(user => {
            if (user.length >= 1) {
              return false;
            } else {
              bcrypt.hash(args.password, 10, (err, hash) => {
                const newUser = new User({
                  _id: new mongoose.Types.ObjectId(),
                  email: args.email,
                  password: hash
                });
                newUser.save();
              });
              return true;
            }
          });
      }
    },
    signIn: {
      type: GraphQLBoolean,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.find({ email: args.email }).then(user => {
          if (user.length < 1) {
            return false;
          }
          return bcrypt.compare(args.password, user[0].password);
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: MutationType
});
