import { ConnectionHandler } from 'relay-runtime';
import { isObject, isArray } from 'lodash/fp';

export const ROOT_ID = 'client:root';

export function listRecordRemoveUpdater({
  parentId,
  itemId,
  parentFieldName,
  store,
}) {
  const parentProxy = store.get(parentId);
  const items = parentProxy.getLinkedRecords(parentFieldName);

  parentProxy.setLinkedRecords(
    items.filter(record => record._dataID !== itemId),
    parentFieldName
  );
}

export function listRecordAddUpdater({
  parentId,
  item,
  type,
  parentFieldName,
  store,
}) {
  const node = store.create(item.id, type);

  Object.keys(item).forEach(key => {
    node.setValue(item[key], key);
  });

  const parentProxy = store.get(parentId);
  const items = parentProxy.getLinkedRecords(parentFieldName);

  parentProxy.setLinkedRecords([...items, node], parentFieldName);
}

export function connectionUpdater({
  store,
  parentId,
  connectionName,
  edge,
  before = false,
}) {
  if (edge) {
    const parentProxy = store.get(parentId);
    if (!parentProxy) {
      // eslint-disable-next-line
      return console.warn(
        `The parentId (${parentId}), is not found in store, probably this is not a global field ID`
      );
    }

    const conn = ConnectionHandler.getConnection(parentProxy, connectionName);
    // eslint-disable-next-line
    if (!conn) return console.warn("The connection to update was not found.");

    if (before) {
      ConnectionHandler.insertEdgeBefore(conn, edge);
    } else {
      ConnectionHandler.insertEdgeAfter(conn, edge);
    }
  }
}

export function optimisticConnectionUpdater({
  parentId,
  store,
  connectionName,
  item,
  customNode,
  itemType,
}) {
  const node = customNode || store.create(item.id, itemType);

  if (customNode) {
    Object.keys(item).forEach(key => {
      node.setValue(item[key], key);
    });
  }

  const edge = store.create(
    `client:newEdge:${node._dataID.match(/[^:]+$/)[0]}`,
    `${itemType}Edge`
  );
  edge.setLinkedRecord(node, 'node');

  connectionUpdater(store, parentId, connectionName, edge);
}

export function connectionDeleteEdgeUpdater({
  parentId,
  connectionName,
  nodeId,
  store,
}) {
  const parentProxy = store.get(parentId);
  const conn = ConnectionHandler.getConnection(parentProxy, connectionName);

  if (!conn) {
    // eslint-disable-next-line
    console.warn(`Connection ${connectionName} not found on ${parentId}`);
    return;
  }

  ConnectionHandler.deleteNode(conn, nodeId);
}

export function copyObjScalarsToProxy({ object, proxy }) {
  Object.keys(object).forEach(key => {
    if (isObject(object[key]) || isArray(object[key])) return;
    proxy.setValue(object[key], key);
  });
}
