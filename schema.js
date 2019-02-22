const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

//DB Connection
const connectionString = {
  host: "web0.eecs.uottawa.ca", // server name or IP address;
  port: 15432,
  database: "zsaee060",
  user: "zsaee060",
  password: "Fdrx6s33j6"
};
const pgp = require("pg-promise")();
const db = pgp(connectionString);

//HotelType
const HotelType = new GraphQLObjectType({
  name: "Hotel",
  fields: () => ({
    h_id: { type: GraphQLString },
    hotelname: { type: GraphQLString },
    h_address: { type: GraphQLString }
  })
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    hotel: {
      type: HotelType,
      args: {
        h_id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        SELECT * FROM hotel where h_id = ${args.h_id};
        `;
        console.log("query", query);
        return db
          .one(query)
          .then(data => {
            return data;
          })
          .catch(err => {
            console.log("error", err);
            return "The error is", err;
          });
      }
    },
    hotels: {
      type: GraphQLList(HotelType),
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        SELECT * FROM hotel;
        `;
        return db
          .manyOrNone(query)
          .then(data => {
            return data;
          })
          .catch(err => {
            console.log("error", err);
            return "The error is", err;
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
