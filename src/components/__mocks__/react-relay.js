const Relay = require.requireActual('react-relay');

module.exports = {
  graphql: Relay.graphql,
  commitMutation: Relay.commitMutation,
  createFragmentContainer: (component) => component,
};