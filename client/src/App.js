import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import Hotels from "./components/Hotels";
import Navbar from "./components/Navbar";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Navbar />
          <Hotels />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
