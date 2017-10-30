import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
    mutation deleteChatMessageMutation($input: DeleteChatMessageInput!) {
        deleteChatMessage(input: $input) {
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
            deletedChatMessageId
        }
    }
`;

function mutateChatMessage(environment, parentId, id) {
  const variables = {
    input: {
      id: id,
    },
  };

  const configs = [{
    type: 'RANGE_DELETE',
    parentID: 'client:root',
    connectionKeys: [{
      key: 'AppQuery_allChatMessages',
      rangeBehavior: 'append',
    }],
    pathToConnection: ['query', 'allChatMessages'],
    deletedIDFieldName: 'deletedChatMessageId'
  }];

  commitMutation(
    environment,
    {
      mutation,
      variables,
      configs,
      onCompleted: (response, errors) => {
        if(errors)
          console.error(errors);
      },
      onError: err => console.error(err),
    },
  );
}

export default mutateChatMessage;