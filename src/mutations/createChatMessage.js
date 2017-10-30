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
            chatMessageEdge {
                node {
                    id
                }
            }
        }
    }
`;

function mutateChatMessage(environment, username, message) {
  const variables = {
    input: {
      chatMessage: {
        username: username,
        message: message
      },
    },
  };

  const optimisticResponse = {
    createChatMessage: variables.input,
  };

  const updater = mutationCreateUpdater('createChatMessage', 'chatMessage', 'AppQuery_allChatMessages');

  commitMutation(
    environment,
    {
      mutation,
      variables,
      updater,
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