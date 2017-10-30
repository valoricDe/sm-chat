import React from 'react';
import { graphql, QueryRenderer } from 'react-relay';

import relay from '../relay';
import MessagesContainer from "./MessagesContainer";
import Box from "./Box";
import Kittens from "./Kittens";
import * as schizophrenicIdenties from "../assets/identities";

import styles from "../styles/App.css";

const simpleState = {activeUser: ''};
let AppClass;


export const chooseNewUser = () => {
  const key = Math.floor(Math.random() * schizophrenicIdenties.length);
  simpleState.activeUser = schizophrenicIdenties[key];
};
chooseNewUser();

class App extends React.Component {
  state = {
    params: {},
    query: graphql`query AppQuery {
        ...MessagesContainer
    }`,
    variables: {},
    component: (data) =>
      <div className={styles.AppRow}>
        <Box title="Your daily dose of kitt'n-ness">
          <Kittens />
        </Box>
        <Box>
          <MessagesContainer data={data} simpleState={simpleState} />
        </Box>
      </div>
  };

  renderReadyState = ({ error, props, retry, query = this.state.query, params = this.state.params }) =>
      error ?
        <div>
          <h1>An Error occured</h1>
          <div>{error}</div>
        </div>
        : (
          props === null ?
            <h1>Loading ...</h1> :
            this.state.component(props, console.log(props))
        );

  render() {
    AppClass = this;
    console.log(this.props, this.state.variables);

    return (
      <div className={styles.App}>
          <QueryRenderer
            environment={relay}
            query={this.state.query}
            variables={this.state.variables}
            render={this.renderReadyState}
          />
      </div>
    );
  }
}

export default App;
