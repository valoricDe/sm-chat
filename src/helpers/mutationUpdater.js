import { ConnectionHandler } from 'relay-runtime';

const user = {id: 'client:root'};

const linkedRecordByPath = (path, linkedRecord) => {
  if(path.length === 0 || !linkedRecord) return linkedRecord;

  const key = path.shift();
  const newLinkedRecord = linkedRecord.getLinkedRecord(key);
  return linkedRecordByPath(path, newLinkedRecord);
};

const sharedUpdater = (store, mutationName, modelName, connectionName, connectionPath) => {
  const payload = store.getRootField(mutationName);
  const model = payload.getLinkedRecord(modelName);
  if (!model) {
    console.error('Could not find getLinkedRecord from mutation payload with name: ' + modelName);
    return;
  }
  const parent = store.get(user.id);
  const connection = ConnectionHandler.getConnection(parent, connectionName);
  const payloadConnection = linkedRecordByPath(connectionPath.slice(), payload);
  if (payloadConnection) {
    connection.setValue(
      payloadConnection.getValue('totalCount'),
      'totalCount',
    );
  }

  return {connection, model};
};

export const mutationCreateUpdater = function(mutationName, modelName, connectionName, connectionPath) {
  return (store) => {
    const {connection, model} = sharedUpdater(store, mutationName, modelName, connectionName, connectionPath);
    const newEdge = ConnectionHandler.createEdge(store, connection, model, modelName+'Edge');
    ConnectionHandler.insertEdgeAfter(connection, newEdge);
  }
};

export const mutationDeleteUpdater = function(mutationName, modelName, connectionName, connectionPath) {
  return (store) => {
    const {connection, model} = sharedUpdater(store, mutationName, modelName, connectionName, connectionPath);
    ConnectionHandler.deleteNode(connection, model.getValue('id'));
  }
};