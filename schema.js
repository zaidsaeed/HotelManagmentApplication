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

const CustomerType = new GraphQLObjectType({
  name: "CustomerType",
  fields: () => ({
    ssn_sin: { type: GraphQLString },
    street_number: { type: GraphQLInt },
    street_name: { type: GraphQLString },
    apt_number: { type: GraphQLInt },
    city: { type: GraphQLString },
    state_province: { type: GraphQLString },
    zip_postalcode: { type: GraphQLString },
    first_name: { type: GraphQLString },
    middle_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    date_of_registration: { type: GraphQLString },
    username: { type: GraphQLString },
    cust_password: { type: GraphQLString }
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

//Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        ssn_sin: { type: new GraphQLNonNull(GraphQLString) },
        street_number: { type: GraphQLInt },
        street_name: { type: GraphQLString },
        apt_number: { type: GraphQLInt },
        city: { type: GraphQLString },
        state_province: { type: GraphQLString },
        zip_postalcode: { type: GraphQLString },
        first_name: { type: GraphQLString },
        middle_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        date_of_registration: { type: GraphQLString },
        username: { type: GraphQLString },
        cust_password: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        INSERT INTO t_customer(
          ssn_sin,
          street_number,
          street_name,
          apt_number,
          city,
          state_province,
          zip_postalcode,
          first_name,
          middle_name,
          last_name,
          date_of_registration,
          username,
          cust_password)
           VALUES(
            '${args.ssn_sin}',
            ${args.street_number},
            '${args.street_name}',
            ${args.apt_number},
            '${args.city}',
            '${args.state_province}',
            '${args.zip_postalcode}',
            '${args.first_name}',
            '${args.middle_name}',
            '${args.last_name}',
            '${args.date_of_registration}',
            '${args.username}',
            '${args.cust_password}'
          )
          RETURNING
            ssn_sin,
            street_number,
            street_name,
            apt_number,
            city,
            state_province,
            zip_postalcode,
            first_name,
            middle_name,
            last_name,
            date_of_registration,
            username,
            cust_password
          ;
        `;
        return db
          .one(query)
          .then(data => {
            console.log("data", data);
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
  query: RootQuery,
  mutation
});
