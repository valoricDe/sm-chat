import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
    mutation updateChatMessageMutation($input: UpdateChatMessageInput!) {
        updateChatMessage(input: $input) {
            chatMessage {
                id
                username
                message
                updated
            }
        }
    }
`;

function mutateChatMessage(environment, id, message) {
  const variables = {
    input: {
      id: id,
      chatMessagePatch: {
        message: message
      },
    },
  };

  const optimisticResponse = {
    updateChatMessage: variables.input,
  };

  commitMutation(
    environment,
    {
      mutation,
      variables,
      optimisticResponse,
      onCompleted: (response, errors) => {
        if(errors)
          console.error(errors);
      },
      onError: err => console.error(err),
    },
  );
}

export default mutateChatMessage;