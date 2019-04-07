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

//HotelChainType
const HotelChainType = new GraphQLObjectType({
  name: "HotelChain",
  fields: () => ({
    id: { type: GraphQLInt },
    hotel_chain_name: { type: GraphQLString },
    number_of_hotels: { type: GraphQLInt },
    hotel_chain_logo_link: { type: GraphQLString }
  })
});

//AreaCountType
const AreaCountType = new GraphQLObjectType({
  name: "AreaCount",
  fields: () => ({
    city: { type: GraphQLString },
    state_or_province: { type: GraphQLString },
    count: { type: GraphQLInt }
  })
});

//RoomNumber Type
const RoomNumberType = new GraphQLObjectType({
  name: "RoomNumber",
  fields: () => ({
    room_number: { type: GraphQLInt }
  })
});

//Customer Type
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
    city: { type: GraphQLString },
    state_or_province: { type: GraphQLString },
    zip_or_postal_code: { type: GraphQLString },
    hotel_chain_id: { type: GraphQLInt },
    rating: { type: GraphQLInt },
    contact_email: { type: GraphQLString },
    manager_ssn_sin: { type: GraphQLInt },
    number_of_rooms: { type: GraphQLInt },
    hotel_chain_name: { type: GraphQLString }
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
    state_or_province: { type: GraphQLString },
    zip_or_postal_code: { type: GraphQLString },
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

//HotelViewType
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
    room_view: { type: GraphQLString },
    hotel_chain_id: { type: GraphQLInt }
  })
});

//RoomType
const RoomType = new GraphQLObjectType({
  name: "Room",
  fields: () => ({
    price: { type: GraphQLInt },
    room_number: { type: GraphQLInt },
    capacity: { type: GraphQLInt },
    room_view: { type: GraphQLString },
    possible_bed_additions: { type: GraphQLInt }
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
    rooms_in_hotel: {
      type: GraphQLList(RoomType),
      args: {
        contact_email: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        SELECT * FROM t_rooms
        WHERE t_rooms.hotel_contact_email='${args.contact_email}'
        ORDER BY t_rooms.room_number;
        `;
        console.log(query);
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
    ordered_hotels: {
      type: GraphQLList(HotelType),
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        SELECT * FROM t_hotel 
        INNER JOIN t_hotel_chain ON t_hotel.hotel_chain_id = t_hotel_chain.id
        ORDER BY t_hotel.city, t_hotel.hotel_chain_id;
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
    area_counts: {
      type: GraphQLList(AreaCountType),
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        SELECT t_hotel.city, t_hotel.state_or_province, COUNT(t_hotel.city) from t_hotel
        GROUP BY t_hotel.city, t_hotel.state_or_province
        ORDER BY t_hotel.state_or_province, t_hotel.city;
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
        const query = `
        SET search_path = 'hotelsService';
        SELECT * FROM search_rooms('${args.search_start_date}', '${
          args.search_end_date
        }',${args.search_city ? `'${args.search_city}'` : null},${
          args.search_state_or_province
            ? `'${args.search_state_or_province}'`
            : null
        },
					${args.search_hotel_chain_name ? `'${args.search_hotel_chain_name}'` : null},
					${args.search_min_price ? args.search_min_price : null},
					${args.search_max_price ? args.search_max_price : null},
					${args.search_capacity ? args.search_capacity : null},
					${args.search_min_rooms ? args.search_min_rooms : null},
					${args.search_max_rooms ? args.search_max_rooms : null},
					${args.search_rating ? args.search_rating : null});
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
    editCustomer: {
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

        update t_customer
          set street_number = ${args.street_number},
          street_name= '${args.street_name}',
          apt_number=${args.apt_number},
          city='${args.city}',
          state_province='${args.state_province}',
          zip_postalcode='${args.zip_postalcode}',
          first_name='${args.first_name}',
          middle_name='${args.middle_name}',
          last_name='${args.last_name}',
          username='${args.username}',
          date_of_registration= '${args.date_of_registration}',
          cust_password='${args.cust_password}'
          where ssn_sin = '${args.ssn_sin}'
          RETURNING
            *
          ;
        `;
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
    deleteCustomer: {
      type: GraphQLBoolean,
      args: {
        ssn_sin: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        delete from t_booking where cust_ssn_sin = '${args.ssn_sin}';
        delete from t_renting where cust_ssn_sin = '${args.ssn_sin}'; 
        delete from t_customer where ssn_sin = '${args.ssn_sin}';
        `;
        return db
          .none(query)
          .then(data => {
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
        state_or_province: { type: GraphQLString },
        zip_or_postal_code: { type: GraphQLString },
        first_name: { type: GraphQLString },
        middle_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        username: { type: GraphQLString },
        emp_password: { type: GraphQLString },
        emp_role: { type: GraphQLString },
        hotel_contact_email: { type: GraphQLString },
        hotel_chain_id: { type: GraphQLInt }
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
          state_or_province,
          zip_or_postal_code,
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
            '${args.state_or_province}',
            '${args.zip_or_postal_code}',
            '${args.first_name}',
            '${args.middle_name}',
            '${args.last_name}',
            '${args.username}',
            '${args.emp_password}'
          )
          ;
          INSERT into t_works_at VALUES (${args.ssn_sin}, '${
          args.emp_role
        }', '${args.hotel_contact_email}', ${args.hotel_chain_id})
          RETURNING
          emp_ssn_sin;
        `;
        console.log("Query", query);
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
    editEmployee: {
      type: EmployeeType,
      args: {
        ssn_sin: { type: new GraphQLNonNull(GraphQLString) },
        street_number: { type: GraphQLInt },
        street_name: { type: GraphQLString },
        apt_number: { type: GraphQLInt },
        city: { type: GraphQLString },
        state_or_province: { type: GraphQLString },
        zip_or_postal_code: { type: GraphQLString },
        first_name: { type: GraphQLString },
        middle_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        username: { type: GraphQLString },
        emp_password: { type: GraphQLString },
        emp_role: { type: GraphQLString },
        hotel_contact_email: { type: GraphQLString },
        hotel_chain_id: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        update t_employee
        set 
          street_number = ${args.street_number},
          street_name = '${args.street_name}',
          apt_number = ${args.apt_number},
          city = '${args.city}',
          state_or_province = '${args.state_or_province}',
          zip_or_postal_code = '${args.zip_or_postal_code}',
          first_name = '${args.first_name}',
          middle_name = '${args.middle_name}',
          last_name = '${args.last_name}',
          username = '${args.username}',
          emp_password = '${args.emp_password}'
        where ssn_sin = ${args.ssn_sin};
        update t_works_at
        set
          emp_role = '${args.emp_role}'
        where
          emp_ssn_sin = ${args.ssn_sin} and hotel_chain_id = ${
          args.hotel_chain_id
        } and hotel_contact_email = '${args.hotel_contact_email}'
        RETURNING emp_role;
        `;
        console.log("Query", query);
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
    deleteEmployee: {
      type: GraphQLBoolean,
      args: {
        ssn_sin: { type: new GraphQLNonNull(GraphQLString) },
        hotel_chain_id: { type: new GraphQLNonNull(GraphQLInt) },
        hotel_contact_email: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        console.log(args);
        const query = `
        SET search_path = 'hotelsService';
        delete from t_works_at where emp_ssn_sin = ${
          args.ssn_sin
        } and hotel_contact_email = '${
          args.hotel_contact_email
        }' and hotel_chain_id = ${args.hotel_chain_id};
        delete from t_hotel where manager_ssn_sin = '${args.ssn_sin}';
        delete from t_employee where ssn_sin = '${args.ssn_sin}';
        `;
        console.log("Query", query);
        return db
          .none(query)
          .then(data => {
            return data;
          })
          .catch(err => {
            console.log("error", err);
            return "The error is", err;
          });
      }
    },
    addHotel: {
      type: HotelType,
      args: {
        street_name: { type: GraphQLString },
        street_number: { type: GraphQLInt },
        city: { type: GraphQLString },
        state_or_province: { type: GraphQLString },
        zip_or_postal_code: { type: GraphQLString },
        hotel_chain_id: { type: GraphQLInt },
        rating: { type: GraphQLInt },
        contact_email: { type: GraphQLString },
        manager_ssn_sin: { type: GraphQLInt },
        number_of_rooms: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        insert into t_hotel
        VALUES
          ('${args.street_name}', ${args.street_number}, '${args.city}', '${
          args.state_or_province
        }', '${args.zip_or_postal_code}', ${args.hotel_chain_id}, ${
          args.rating
        }, '${args.contact_email}', ${args.manager_ssn_sin}, ${
          args.number_of_rooms
        })
        RETURNING *;
        `;
        console.log("Query", query);
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
    editHotel: {
      type: HotelType,
      args: {
        street_name: { type: GraphQLString },
        street_number: { type: GraphQLInt },
        city: { type: GraphQLString },
        state_or_province: { type: GraphQLString },
        zip_or_postal_code: { type: GraphQLString },
        hotel_chain_id: { type: GraphQLInt },
        rating: { type: GraphQLInt },
        contact_email: { type: GraphQLString },
        manager_SSN_SIN: { type: GraphQLInt },
        number_of_rooms: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        update t_hotel
        set
        street_name= '${args.street_name}',
        street_number= ${args.street_number},
        city= '${args.city}',
        state_or_province= '${args.state_or_province}',
        zip_or_postal_code= '${args.zip_or_postal_code}',
        rating= ${args.rating},
        manager_SSN_SIN= ${args.manager_SSN_SIN},
        number_of_rooms= ${args.number_of_rooms}
        where contact_email = '${args.contact_email}' and hotel_chain_id = ${
          args.hotel_chain_id
        }
        RETURNING *;
        `;
        console.log("Query", query);
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
    deleteHotel: {
      type: GraphQLBoolean,
      args: {
        hotel_chain_id: { type: GraphQLInt },
        contact_email: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        delete from t_hotel where contact_email = '${
          args.contact_email
        }' and hotel_chain_id = ${args.hotel_chain_id};
        `;
        return db
          .none(query)
          .then(data => {
            return data;
          })
          .catch(err => {
            console.log("error", err);
            return "The error is", err;
          });
      }
    },
    addRoom: {
      type: RoomType,
      args: {
        room_number: { type: GraphQLInt },
        hotel_chain_id: { type: GraphQLInt },
        hotel_contact_email: { type: GraphQLString },
        price: { type: GraphQLInt },
        room_view: { type: GraphQLString },
        possible_bed_additions: { type: GraphQLInt },
        capacity: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        insert into t_rooms
        VALUES
          (${args.room_number}, '${args.hotel_contact_email}', ${
          args.hotel_chain_id
        }, ${args.price}, '${args.room_view}', ${
          args.possible_bed_additions
        }, ${args.capacity})
        RETURNING *;
        `;
        console.log("Query", query);
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
    editRoom: {
      type: RoomType,
      args: {
        room_number: { type: GraphQLInt },
        hotel_chain_id: { type: GraphQLInt },
        hotel_contact_email: { type: GraphQLString },
        price: { type: GraphQLInt },
        room_view: { type: GraphQLString },
        possible_bed_additions: { type: GraphQLInt },
        capacity: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        update t_rooms
        set
        price =${args.price},
        room_view = '${args.room_view}',
        possible_bed_additions = ${args.possible_bed_additions},
        capacity =${args.capacity}
        where room_number = ${args.room_number} and hotel_chain_id = ${
          args.hotel_chain_id
        } and
        hotel_contact_email= '${args.hotel_contact_email}'
        RETURNING *;
        `;
        console.log("Query", query);
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
    deleteRoom: {
      type: GraphQLBoolean,
      args: {
        hotel_chain_id: { type: GraphQLInt },
        hotel_contact_email: { type: GraphQLString },
        room_number: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        delete from t_renting where hotel_contact_email = '${
          args.hotel_contact_email
        }' and hotel_chain_id = ${args.hotel_chain_id} and room_number = ${
          args.room_number
        };
        delete from t_booking where hotel_contact_email = '${
          args.hotel_contact_email
        }' and hotel_chain_id = ${args.hotel_chain_id} and room_number = ${
          args.room_number
        };
        delete from t_rooms where hotel_contact_email = '${
          args.hotel_contact_email
        }' and hotel_chain_id = ${args.hotel_chain_id} and room_number = ${
          args.room_number
        };
        `;
        console.log("query", query);
        return db
          .none(query)
          .then(data => {
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
        cust_ssn_sin: { type: GraphQLString },
        amount_paid: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        insert into t_renting(room_number, hotel_contact_email, hotel_chain_id, start_date, end_date, cust_ssn_sin, amount_paid)
        VALUES
        ('${args.room_number}', '${args.hotel_contact_email}', ${
          args.hotel_chain_id
        }, '${args.start_date}', '${args.end_date}', ${args.cust_ssn_sin}, ${
          args.amount_paid
        })
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
    editRoomRenting: {
      type: RoomRentOrBookType,
      args: {
        room_number: { type: GraphQLInt },
        hotel_contact_email: { type: GraphQLString },
        hotel_chain_id: { type: GraphQLInt },
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString },
        cust_ssn_sin: { type: GraphQLString },
        amount_paid: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        const query = `
        SET search_path = 'hotelsService';
        update t_renting 
        set amount_paid = ${args.amount_paid}
        where
        room_number = '${args.room_number}'
        and hotel_contact_email = '${args.hotel_contact_email}'
        and hotel_chain_id = ${args.hotel_chain_id}
        and start_date = '${args.start_date}'
        and end_date = '${args.end_date}'
        and cust_ssn_sin = '${args.cust_ssn_sin}'
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
