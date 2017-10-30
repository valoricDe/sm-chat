import {commitMutation, graphql} from 'react-relay';
import {mutationCreateUpdater} from "../helpers/mutationUpdater";

const mutation = graphql`
    mutation createChatMessageMutation($input: CreateChatMessageInput!) {
        createChatMessage(input: $input) {
            chatMessage {
                id
                username
                message
                updated
            }
            query {
                allChatMessages {
                    totalCount
                }
            }
        }
    }
`;

function mutateChatMessage(environment, data, username, message) {
  const variables = {
    input: {
      chatMessage: {
        username: username,
        message: message
      },
    },
  };

  const optimisticResponse = {
    createChatMessage: {
      chatMessage: variables.input.chatMessage,
      query: {
        allChatMessages: {
          totalCount: data.allChatMessages.totalCount + 1
        }
      },
    }
  };

  /*const configs = [{
    type: 'RANGE_ADD',
    parentID: 'client:root',
    connectionInfo: [{
      key: 'AppQuery_allChatMessages',
      rangeBehavior: 'append',
    }],
    edgeName: 'chatMessageEdge',
  }];*/

  const updater = mutationCreateUpdater(
    'createChatMessage', 'chatMessage', 'AppQuery_allChatMessages', ['query', 'allChatMessages']);

  commitMutation(
    environment,
    {
      mutation,
      variables,
      //configs,
      updater: updater,
      optimisticResponse,
      optimisticUpdater: updater,
      onCompleted: (response, errors) => {
        if(errors)
          console.error(errors);
      },
      onError: err => console.error(err),
    },
  );
}

export default mutateChatMessage;