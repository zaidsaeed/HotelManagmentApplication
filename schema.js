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
const HotelChainType = new GraphQLObjectType({
  name: "HotelChain",
  fields: () => ({
    id: { type: GraphQLInt },
    hotel_chain_name: { type: GraphQLString },
    number_of_hotels: { type: GraphQLInt },
    hotel_chain_logo_link: { type: GraphQLString }
  })
});

//HotelType
const HotelType = new GraphQLObjectType({
  name: "Hotel",
  fields: () => ({
    street_name: { type: GraphQLString },
    street_number: { type: GraphQLInt },
    apt_number: { type: GraphQLInt },
    city: { type: GraphQLString },
    state_or_province: { type: GraphQLString },
    zip_or_postal_code: { type: GraphQLString },
    hotel_chain_id: { type: GraphQLInt },
    rating: { type: GraphQLInt },
    contact_email: { type: GraphQLString },
    manager_SSN_SIN: { type: GraphQLInt },
    number_of_rooms: { type: GraphQLInt }
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
        SELECT * FROM t_hotel;
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
    },
    hotel_chains: {
      type: GraphQLList(HotelChainType),
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        SELECT * FROM t_hotel_chain;
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
