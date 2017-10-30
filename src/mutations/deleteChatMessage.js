import {commitMutation, graphql} from 'react-relay';
import {mutationDeleteUpdater} from "../helpers/mutationUpdater";

const mutation = graphql`
    mutation deleteChatMessageMutation($input: DeleteChatMessageInput!) {
        deleteChatMessage(input: $input) {
            chatMessage {
                id
            }
            query {
                allChatMessages {
                    totalCount
                }
            }
        }
    }
`;

function mutateChatMessage(environment, data, id) {
  const variables = {
    input: {
      id: id,
    },
  };

  const optimisticResponse = {
    deleteChatMessage: {
      chatMessage: {
        id: id,
      },
      query: {
        allChatMessages: {
          totalCount: data.allChatMessages.totalCount - 1
        }
      },
    }
  };

  /*const configs = [{
    type: 'RANGE_DELETE',
    parentID: 'client:root',
    connectionKeys: [{
      key: 'AppQuery_allChatMessages',
      rangeBehavior: 'append',
    }],
    pathToConnection: ['query', 'allChatMessages'],
    deletedIDFieldName: 'deletedChatMessageId'
  }];*/

  const updater = mutationDeleteUpdater(
    'deleteChatMessage', 'chatMessage', 'AppQuery_allChatMessages', ['query', 'allChatMessages']);


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