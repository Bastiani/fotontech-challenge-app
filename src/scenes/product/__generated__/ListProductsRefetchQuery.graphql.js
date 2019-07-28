/**
 * @flow
 * @relayHash 0280f6594686d8cbc69b0e15792a6400
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ListProducts_query$ref = any;
export type ListProductsRefetchQueryVariables = {|
  first?: ?number,
  search?: ?string,
|};
export type ListProductsRefetchQueryResponse = {|
  +$fragmentRefs: ListProducts_query$ref
|};
export type ListProductsRefetchQuery = {|
  variables: ListProductsRefetchQueryVariables,
  response: ListProductsRefetchQueryResponse,
|};
*/


/*
query ListProductsRefetchQuery(
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
    "name": "ListProductsRefetchQuery",
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
    "name": "ListProductsRefetchQuery",
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
    "name": "ListProductsRefetchQuery",
    "id": null,
    "text": "query ListProductsRefetchQuery(\n  $first: Int\n  $search: String\n) {\n  ...ListProducts_query_1UbRgV\n}\n\nfragment ListProducts_query_1UbRgV on Query {\n  products(first: $first, search: $search) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        title\n        __typename\n      }\n      cursor\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1008103ca9f16f6377afdadf69c40e53';
module.exports = node;
