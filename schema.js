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
  GraphQLBoolean,
  GraphQLInputObjectType
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

const MovieCon = new GraphQLObjectType({
  name: "MovieCon",
  fields: () => ({
    movie: { type: MovieType }
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
    },
    unwatchedMovies: {
      type: new GraphQLList(MovieType),
      args: {
        user: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.where({ _id: args.user })
          .select("unwatchedMovies")
          .exec()
          .then(movies => {
            return movies[0].unwatchedMovies;
          });
      }
    },

    watchedMovies: {
      type: new GraphQLList(MovieType),
      args: {
        user: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.where({ _id: args.user })
          .select("watchedMovies")
          .exec()
          .then(movies => {
            return movies[0].watchedMovies;
          });
      }
    }
  }
});
// MUTATIONS

const MovieInputCon = new GraphQLInputObjectType({
  name: "MovieInputCon",
  fields: () => ({
    movie: { type: MovieInputType }
  })
});
const MovieInputType = new GraphQLInputObjectType({
  name: "InputMovie",
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
    genres: { type: new GraphQLList(GenreInputType) },
    videos: { type: VideoInputType },
    credits: { type: CreditsInputType }
  })
});

const VideoInputType = new GraphQLInputObjectType({
  name: "InputVideo",
  fields: () => ({
    results: { type: new GraphQLList(VideoResultInputType) }
  })
});

const VideoResultInputType = new GraphQLInputObjectType({
  name: "InputVideoResult",
  fields: () => ({
    id: { type: GraphQLString },
    key: { type: GraphQLString },
    type: { type: GraphQLString }
  })
});

const CreditsInputType = new GraphQLInputObjectType({
  name: "InputCredits",
  fields: () => ({
    cast: { type: new GraphQLList(CastInputType) }
  })
});

const CastInputType = new GraphQLInputObjectType({
  name: "InputCast",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    character: { type: GraphQLString },
    profile_path: { type: GraphQLString }
  })
});

const GenreInputType = new GraphQLInputObjectType({
  name: "InputGenre",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
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
      type: GraphQLString,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.find({ email: args.email }).then(user => {
          if (user.length < 1) {
            return null;
          }
          if (bcrypt.compare(args.password, user[0].password)) {
            return User.find({ email: args.email })
              .select("_id")
              .exec()
              .then(id => {
                return id[0].id;
              });
          }
        });
      }
    },
    addToUnwatched: {
      type: GraphQLString,
      args: {
        movie: { type: MovieInputType },
        index: { type: GraphQLInt },
        id: { type: GraphQLString }
      },

      resolve(parent, args) {
        User.findOneAndUpdate(
          { _id: args.id },
          { $push: { unwatchedMovies: args.movie } },

          { safe: true, upsert: true },
          function (err, doc) {
            if (err) {
              console.log(err);
            } else {
              return "success";
            }
          }
        );
      } //fix return
    },
    addToWatched: {
      type: GraphQLString,
      args: {
        movie: { type: MovieInputType },
        id: { type: GraphQLString },
        movieId: { type: GraphQLInt }
      },

      resolve(parent, args) {
        User.update(
          { _id: args.id, "unwatchedMovies.id": args.movieId },
          { "$pull": { unwatchedMovies: { id: args.movieId } } },
          function (err, movie) {
            console.log(movie)
          }
        )
        User.findOneAndUpdate(
          { _id: args.id },
          {
            $push: { watchedMovies: args.movie }
          },

          { safe: true, upsert: true },
          function (err, doc) {
            if (err) {
              console.log(err);
            } else {
              return "success";
            }
          }
        );
      } //fix return
    },
    deleteFromUnwatched: {
      type: GraphQLString,
      args: {
        movieId: { type: GraphQLInt },
        id: { type: GraphQLString }
      },

      resolve(parent, args) {
        User.update(
          { _id: args.id, "unwatchedMovies.id": args.movieId },
          { "$pull": { unwatchedMovies: { id: args.movieId } } },
          function (err, movie) {
            console.log(movie)
          }
        )
      } //fix return
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: MutationType
});
