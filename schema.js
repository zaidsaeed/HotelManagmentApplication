const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLDate
} = require("graphql");

//DB Connection
const connectionString = {
  host: "ec2-184-73-153-64.compute-1.amazonaws.com",
  port: 5432,
  database: "dc078ddv19492",
  user: "arbhtasmwmtzgz",
  password: "91fd20662684cc3899c91e4f7086c9ecceedde6903ca25c021d7b85ba4a413e4",
  ssl: true
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

//RoomNumber Type
const RoomNumberType = new GraphQLObjectType({
  name: "RoomNumber",
  fields: () => ({
    room_number: { type: GraphQLInt }
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

//EmployeeType
const EmployeeType = new GraphQLObjectType({
  name: "EmployeeType",
  fields: () => ({
    ssn_sin: { type: GraphQLInt },
    street_number: { type: GraphQLInt },
    street_name: { type: GraphQLString },
    apt_number: { type: GraphQLInt },
    city: { type: GraphQLString },
    state_province: { type: GraphQLString },
    zip_postalcode: { type: GraphQLString },
    first_name: { type: GraphQLString },
    middle_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    username: { type: GraphQLString },
    emp_password: { type: GraphQLString },
    emp_ssn_sin: { type: GraphQLInt },
    emp_role: { type: GraphQLString },
    hotel_contact_email: { type: GraphQLString },
    hotel_chain_id: { type: GraphQLInt }
  })
});

//HotelView Type
const HotelViewType = new GraphQLObjectType({
  name: "HotelView",
  fields: () => ({
    price: { type: GraphQLInt },
    room_number: { type: GraphQLInt },
    street_name: { type: GraphQLString },
    street_number: { type: GraphQLInt },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLString },
    hotel_chain: { type: GraphQLString },
    rating: { type: GraphQLInt },
    hotel_contact_email: { type: GraphQLString },
    number_of_rooms: { type: GraphQLInt },
    capacity: { type: GraphQLInt },
    room_view: { type: GraphQLString }
  })
});

//RoomRentOrBookType
const RoomRentOrBookType = new GraphQLObjectType({
  name: "RoomRentOrBookType",
  fields: () => ({
    room_number: { type: GraphQLString },
    hotel_contact_email: { type: GraphQLString },
    hotel_chain_id: { type: GraphQLInt },
    start_date: { type: GraphQLString },
    end_date: { type: GraphQLString },
    cust_ssn_sin: { type: GraphQLString }
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
    },
    is_booked: {
      type: GraphQLBoolean,
      args: {
        date: { type: GraphQLString },
        room_number: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        
        SELECT CASE WHEN EXISTS (
          select * 
          from t_booking
          where '${
            args.date
          }' between t_booking.start_date and t_booking.end_date
          and t_booking.room_number = ${args.room_number}
        )
        THEN CAST(1 AS BIT)
        ELSE CAST(0 AS BIT) END
        `;
        console.log("query", query);
        return db
          .one(query)
          .then(data => {
            console.log(data);
            return data.case == 1;
          })
          .catch(err => {
            console.log("error", err);
            return "The error is", err;
          });
      }
    },
    is_rented: {
      type: GraphQLBoolean,
      args: {
        date: { type: GraphQLString },
        room_number: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        SELECT CASE WHEN EXISTS (
          select * 
          from t_renting
          where '${
            args.date
          }' between t_renting.start_date and t_renting.end_date
          and t_renting.room_number = ${args.room_number}
        )
        THEN CAST(1 AS BIT)
        ELSE CAST(0 AS BIT) END
        `;
        console.log("query", query);
        return db
          .one(query)
          .then(data => {
            console.log(data);
            return data.case == 1;
          })
          .catch(err => {
            console.log("error", err);
            return "The error is", err;
          });
      }
    },
    room_numbers: {
      type: GraphQLList(RoomNumberType),
      args: {
        emp_ssn_sin: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        SELECT * FROM emp_room where emp_ssn_sin = ${args.emp_ssn_sin} ;
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
    customer: {
      type: CustomerType,
      args: {
        username: { type: GraphQLString },
        cust_password: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        SELECT * FROM t_customer where username ='${
          args.username
        }' and cust_password = '${args.cust_password}';
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
    employee: {
      type: EmployeeType,
      args: {
        username: { type: GraphQLString },
        emp_password: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        SELECT * FROM t_employee
        left join t_works_at on t_works_at.emp_ssn_sin = t_employee.ssn_sin
        where username ='${args.username}' and emp_password = '${
          args.emp_password
        }';
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
    hotelView: {
      type: GraphQLList(HotelViewType),
      args: {
        search_city: { type: GraphQLString },
        search_state_or_province: { type: GraphQLString },
        search_hotel_chain_name: { type: GraphQLString },
        search_rating: { type: GraphQLInt },
        search_capacity: { type: GraphQLInt },
        search_start_date: { type: GraphQLString },
        search_end_date: { type: GraphQLString },
        search_min_price: { type: GraphQLInt },
        search_max_price: { type: GraphQLInt },
        search_min_rooms: { type: GraphQLInt },
        search_max_rooms: { type: GraphQLInt },
        search_number_of_rooms: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        console.log("args:", args);
        const query = `
        SET search_path = 'hotelsService';
        SELECT * FROM search_rooms('${args.search_start_date}', '${
          args.search_end_date
        }',${args.search_city !== undefined ? `'${args.search_city}'` : null},${
          args.search_state !== undefined ? `'${args.search_state}'` : null
        },
					${
            args.search_hotel_chain !== undefined
              ? `'${args.search_hotel_chain}'`
              : null
          },
					${args.search_min_price !== undefined ? args.search_min_price : null},
					${args.search_max_price !== undefined ? args.search_max_price : null},
					${args.search_capacity !== undefined ? args.search_capacity : null},
					${args.search_min_rooms !== undefined ? args.search_min_rooms : null},
					${args.search_max_rooms !== undefined ? args.search_max_rooms : null},
					${args.search_rating !== undefined ? args.search_rating : null});
        `;
        console.log("query", query);
        return db
          .manyOrNone(query)
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
    },
    addEmployee: {
      type: EmployeeType,
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
        username: { type: GraphQLString },
        emp_password: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        INSERT INTO t_employee(
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
          username,
          emp_password)
           VALUES(
            ${args.ssn_sin},
            ${args.street_number},
            '${args.street_name}',
            ${args.apt_number},
            '${args.city}',
            '${args.state_province}',
            '${args.zip_postalcode}',
            '${args.first_name}',
            '${args.middle_name}',
            '${args.last_name}',
            '${args.username}',
            '${args.emp_password}'
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
            username,
            emp_password
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
    },
    addRoomRenting: {
      type: RoomRentOrBookType,
      args: {
        room_number: { type: GraphQLInt },
        hotel_contact_email: { type: GraphQLString },
        hotel_chain_id: { type: GraphQLInt },
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString },
        cust_ssn_sin: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        insert into t_renting(room_number, hotel_contact_email, hotel_chain_id, start_date, end_date, cust_ssn_sin)
        VALUES
        ('${args.room_number}', '${args.hotel_contact_email}', ${
          args.hotel_chain_id
        }, '${args.start_date}', '${args.end_date}', ${args.cust_ssn_sin})
        RETURNING
        room_number,
        hotel_contact_email,
        hotel_chain_id,
        start_date,
        end_date,
        cust_ssn_sin
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
    },
    addRoomBooking: {
      type: RoomRentOrBookType,
      args: {
        room_number: { type: GraphQLInt },
        hotel_contact_email: { type: GraphQLString },
        hotel_chain_id: { type: GraphQLInt },
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString },
        cust_ssn_sin: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        insert into t_booking(room_number, hotel_contact_email, hotel_chain_id, start_date, end_date, cust_ssn_sin)
        VALUES
        ('${args.room_number}', '${args.hotel_contact_email}', ${
          args.hotel_chain_id
        }, '${args.start_date}', '${args.end_date}', ${args.cust_ssn_sin})
        RETURNING
        room_number,
        hotel_contact_email,
        hotel_chain_id,
        start_date,
        end_date,
        cust_ssn_sin
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
