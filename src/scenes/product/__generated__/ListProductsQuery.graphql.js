/**
 * @flow
 * @relayHash bfb6bafd3e1f4f1e4e3681109bbc783e
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ListProducts_query$ref = any;
export type ListProductsQueryVariables = {|
  first?: ?number,
  search?: ?string,
|};
export type ListProductsQueryResponse = {|
  +$fragmentRefs: ListProducts_query$ref
|};
export type ListProductsQuery = {|
  variables: ListProductsQueryVariables,
  response: ListProductsQueryResponse,
|};
*/


/*
query ListProductsQuery(
  $first: Int
  $search: String
) {
  ...ListProducts_query_1UbRgV
}

fragment ListProducts_query_1UbRgV on Query {
  products(first: $first, search: $search) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        title
        __typename
      }
      cursor
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "search",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "search",
    "variableName": "search"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ListProductsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "ListProducts_query",
        "args": (v1/*: any*/)
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ListProductsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "products",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ProductConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "pageInfo",
            "storageKey": null,
            "args": null,
            "concreteType": "PageInfo",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "hasNextPage",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "endCursor",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "ProductEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "Product",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "id",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "title",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "__typename",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "cursor",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "products",
        "args": (v1/*: any*/),
        "handle": "connection",
        "key": "ListProducts_products",
        "filters": []
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ListProductsQuery",
    "id": null,
    "text": "query ListProductsQuery(\n  $first: Int\n  $search: String\n) {\n  ...ListProducts_query_1UbRgV\n}\n\nfragment ListProducts_query_1UbRgV on Query {\n  products(first: $first, search: $search) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        title\n        __typename\n      }\n      cursor\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd3da5a1da090274b806aa22a8283f509';
module.exports = node;
