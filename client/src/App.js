import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import Hotels from "./components/Hotels";
import HotelPage from "./components/HotelPage";
import SignUpPage from "./components/SignUpPage";
import HotelChains from "./components/HotelChains";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route exact path="/signUp" component={SignUpPage} />
            <Route exact path="/" component={Hotels} />
            <Route exact path="/launch/:h_id" component={HotelPage} />
            <Route exact path="/hotelchains" component={HotelChains} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
