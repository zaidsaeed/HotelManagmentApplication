import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import Hotels from "./components/Hotels";
import HotelPage from "./components/HotelPage";
import HotelChains from "./components/HotelChains";
import SignUp from "./components/UserComponents/SignUp";
import Login from "./components/Login";
import EmployeeDashboard from "./components/EmployeeDashboard";
import EmployeeSignUp from "./components/EmployeeComponents/EmployeeSignUp";
import RoomTable from "./components/RoomTable";
import HotelViews from "./components/HotelViews";
import CreateRentingComponent from "./components/CreateRentingComponent";
import EditDeleteUserAccount from "./components/UserComponents/EditDeleteUserAccount";
import AllHotels from "./components/AllHotels";
import Areas from "./components/Areas";
import EditDeleteEmployeeAccount from "./components/EmployeeComponents/EditDeleteEmployeeAccount";
import Rooms from "./components/Rooms";
import CreateHotelComponent from "./components/HotelComponents/CreateHotelComponent";
import EditDeleteHotel from "./components/HotelComponents/EditDeleteHotel";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route exact path="/" component={Hotels} />
            <Route exact path="/launch/:h_id" component={HotelPage} />
            <Route exact path="/hotelchains" component={HotelChains} />
            <Route exact path="/signUp" component={SignUp} />
            <Route exact path="/logIn" component={Login} />
            <Route exact path="/hotels" component={AllHotels} />
            <Route exact path="/areas" component={Areas} />
            <Route exact path="/rooms" component={Rooms} />

            <Route
              exact
              path="/employeeDashboard"
              component={EmployeeDashboard}
            />
            <Route exact path="/employeeSignUp" component={EmployeeSignUp} />
            <Route exact path="/roomTable" component={RoomTable} />
            <Route exact path="/hotelViews" component={HotelViews} />
            <Route
              exact
              path="/createRenting"
              component={CreateRentingComponent}
            />
            <Route
              exact
              path="/editDeleteUserAccount"
              component={EditDeleteUserAccount}
            />
            <Route
              exact
              path="/editDeleteEmployeeAccount"
              component={EditDeleteEmployeeAccount}
            />
            <Route
              exact
              path="/createHotelComponent"
              component={CreateHotelComponent}
            />
            <Route
              exact
              path="/editHotelComponent"
              component={EditDeleteHotel}
            />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
