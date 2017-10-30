import { ConnectionHandler } from 'relay-runtime';

export const mutationCreateUpdater = (mutationName, modelName, connectionName) => store => {
  /*const sharedUpdater = function(store, parentId, newEdge) {
    const parent = store.get(parentId);
    const conn = ConnectionHandler.getConnection(
      parent,
      connectionName,
    );
    ConnectionHandler.insertEdgeAfter(conn, newEdge);
  };*/

  /*return {
    updater: (store) => {
      const payload = store.getRootField(mutationName);
      const newEdge = payload.getLinkedRecord(modelName+'Edge');
      sharedUpdater(store, parentId, newEdge);
    },
    optimisticUpdater: (store) => {
      const id = 'client:newTodo:' + tempID++;
      const node = store.create(id, modelName);
      node.setValue(text, 'text');
      node.setValue(id, 'id');
      const newEdge = store.create(
        'client:newEdge:' + tempID++,
        'TodoEdge',
      );
      newEdge.setLinkedRecord(node, 'node');
      sharedUpdater(store, user, newEdge);
      const userProxy = store.get(user.id);
      userProxy.setValue(
        userProxy.getValue('totalCount') + 1,
        'totalCount',
      );
    },
  };*/

  /*const payload = store.getRootField(mutationName);
  const newEdge = payload.getLinkedRecord(modelName+'Edge');
  if (!newModel) {
    console.error('Could not find getLinkedRecord from mutation payload with name: ' + modelName);
    return;
  }
  sharedUpdater(store, parentId, newEdge);*/

  const payload = store.getRootField(mutationName);
  const newModel = payload.getLinkedRecord(modelName);
  if (!newModel) {
    console.error('Could not find getLinkedRecord from mutation payload with name: ' + modelName);
    return;
  }
  const parent = store.get('client:root');
  const connection = ConnectionHandler.getConnection(parent, connectionName);
  const newEdge = ConnectionHandler.createEdge(store, connection, newModel, modelName+'Edge');
  ConnectionHandler.insertEdgeAfter(connection, newEdge);
};