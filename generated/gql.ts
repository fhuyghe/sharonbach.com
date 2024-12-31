/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "query getPageHome {\n  home {\n    data {\n      attributes {\n        about\n        intro\n        clients\n      }\n    }\n  }\n}": types.GetPageHomeDocument,
    "query getProject($slug: String) {\n  projects(filters: {slug: {eq: $slug}}) {\n    data {\n      attributes {\n        slug\n        title\n        blurb\n        intro\n        categories {\n          data {\n            id\n            attributes {\n              name\n            }\n          }\n        }\n        Content {\n          __typename\n          ... on ComponentContentBlockText {\n            id\n            text\n          }\n          ... on ComponentContentBlockImage {\n            id\n            image {\n              data {\n                id\n                attributes {\n                  url\n                  width\n                  height\n                  caption\n                  name\n                }\n              }\n            }\n          }\n          ... on ComponentContentBlockImages {\n            id\n            columns\n            images {\n              data {\n                id\n                attributes {\n                  url\n                  width\n                  height\n                  caption\n                  name\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}": types.GetProjectDocument,
    "query getProjects {\n  projects {\n    data {\n      id\n      attributes {\n        createdAt\n        title\n        blurb\n        slug\n        featuredImage {\n          data {\n            attributes {\n              url\n              width\n              height\n              alternativeText\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n}": types.GetProjectsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getPageHome {\n  home {\n    data {\n      attributes {\n        about\n        intro\n        clients\n      }\n    }\n  }\n}"): (typeof documents)["query getPageHome {\n  home {\n    data {\n      attributes {\n        about\n        intro\n        clients\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getProject($slug: String) {\n  projects(filters: {slug: {eq: $slug}}) {\n    data {\n      attributes {\n        slug\n        title\n        blurb\n        intro\n        categories {\n          data {\n            id\n            attributes {\n              name\n            }\n          }\n        }\n        Content {\n          __typename\n          ... on ComponentContentBlockText {\n            id\n            text\n          }\n          ... on ComponentContentBlockImage {\n            id\n            image {\n              data {\n                id\n                attributes {\n                  url\n                  width\n                  height\n                  caption\n                  name\n                }\n              }\n            }\n          }\n          ... on ComponentContentBlockImages {\n            id\n            columns\n            images {\n              data {\n                id\n                attributes {\n                  url\n                  width\n                  height\n                  caption\n                  name\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query getProject($slug: String) {\n  projects(filters: {slug: {eq: $slug}}) {\n    data {\n      attributes {\n        slug\n        title\n        blurb\n        intro\n        categories {\n          data {\n            id\n            attributes {\n              name\n            }\n          }\n        }\n        Content {\n          __typename\n          ... on ComponentContentBlockText {\n            id\n            text\n          }\n          ... on ComponentContentBlockImage {\n            id\n            image {\n              data {\n                id\n                attributes {\n                  url\n                  width\n                  height\n                  caption\n                  name\n                }\n              }\n            }\n          }\n          ... on ComponentContentBlockImages {\n            id\n            columns\n            images {\n              data {\n                id\n                attributes {\n                  url\n                  width\n                  height\n                  caption\n                  name\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getProjects {\n  projects {\n    data {\n      id\n      attributes {\n        createdAt\n        title\n        blurb\n        slug\n        featuredImage {\n          data {\n            attributes {\n              url\n              width\n              height\n              alternativeText\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query getProjects {\n  projects {\n    data {\n      id\n      attributes {\n        createdAt\n        title\n        blurb\n        slug\n        featuredImage {\n          data {\n            attributes {\n              url\n              width\n              height\n              alternativeText\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;