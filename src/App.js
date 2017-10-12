import React from 'react';
import { graphql, QueryRenderer } from 'react-relay';

import relay from 'relay';
import AppRenderer from './AppRenderer';

class App extends React.Component {
  state = {
    params: {},
    query: null,
    variables: {},
    component: null,
  };

  renderReadyState = ({ error, props, retry }) =>
    <AppRenderer
      error={error}
      data={props}
      retry={retry}
      query={this.state.query}
      location={this.state.location}
      params={this.state.params}
      component={this.state.component}
    />;

  render() {
    return (
      <QueryRenderer
        environment={relay}
        query={this.state.query}
        variables={this.state.variables}
        render={this.renderReadyState}
      />
    );
  }
}

export default App;
