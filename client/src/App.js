import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import Hotels from "./components/Hotels";
import HotelPage from "./components/HotelPage";
import HotelChains from "./components/HotelChains";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

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
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
