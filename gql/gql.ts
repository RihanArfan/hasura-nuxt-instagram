/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation InsertPost($media_id: uuid, $caption: String) {\n      insert_posts_one(object: { media_id: $media_id, caption: $caption }) {\n        id\n        profile {\n          username\n        }\n      }\n    }\n  ": types.InsertPostDocument,
    "\n    query GetProfileById($id: uuid!) {\n      profiles_by_pk(id: $id) {\n        username\n      }\n    }\n  ": types.GetProfileByIdDocument,
    "\n    query GetProfile($username: String) {\n      profiles(where: { username: { _eq: $username } }) {\n        id\n        account {\n          displayName\n          avatarUrl\n        }\n        description\n        is_private\n        followers_aggregate {\n          aggregate {\n            count\n          }\n        }\n        following_aggregate {\n          aggregate {\n            count\n          }\n        }\n        posts_aggregate {\n          aggregate {\n            count\n          }\n        }\n        posts {\n          id\n          media_id\n        }\n      }\n    }\n  ": types.GetProfileDocument,
    "\n    query GetPost($id: uuid!) {\n      posts_by_pk(id: $id) {\n        media_id\n        caption\n        created_at\n        likes_aggregate {\n          aggregate {\n            count\n          }\n        }\n        profile {\n          username\n          account {\n            displayName\n            avatarUrl\n          }\n        }\n      }\n    }\n  ": types.GetPostDocument,
    "\n    mutation InsertProfile(\n      $username: String\n      $description: String\n      $is_private: Boolean\n    ) {\n      insert_profiles_one(\n        object: {\n          username: $username\n          description: $description\n          is_private: $is_private\n        }\n      ) {\n        id\n      }\n    }\n  ": types.InsertProfileDocument,
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
export function graphql(source: "\n    mutation InsertPost($media_id: uuid, $caption: String) {\n      insert_posts_one(object: { media_id: $media_id, caption: $caption }) {\n        id\n        profile {\n          username\n        }\n      }\n    }\n  "): (typeof documents)["\n    mutation InsertPost($media_id: uuid, $caption: String) {\n      insert_posts_one(object: { media_id: $media_id, caption: $caption }) {\n        id\n        profile {\n          username\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetProfileById($id: uuid!) {\n      profiles_by_pk(id: $id) {\n        username\n      }\n    }\n  "): (typeof documents)["\n    query GetProfileById($id: uuid!) {\n      profiles_by_pk(id: $id) {\n        username\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetProfile($username: String) {\n      profiles(where: { username: { _eq: $username } }) {\n        id\n        account {\n          displayName\n          avatarUrl\n        }\n        description\n        is_private\n        followers_aggregate {\n          aggregate {\n            count\n          }\n        }\n        following_aggregate {\n          aggregate {\n            count\n          }\n        }\n        posts_aggregate {\n          aggregate {\n            count\n          }\n        }\n        posts {\n          id\n          media_id\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetProfile($username: String) {\n      profiles(where: { username: { _eq: $username } }) {\n        id\n        account {\n          displayName\n          avatarUrl\n        }\n        description\n        is_private\n        followers_aggregate {\n          aggregate {\n            count\n          }\n        }\n        following_aggregate {\n          aggregate {\n            count\n          }\n        }\n        posts_aggregate {\n          aggregate {\n            count\n          }\n        }\n        posts {\n          id\n          media_id\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetPost($id: uuid!) {\n      posts_by_pk(id: $id) {\n        media_id\n        caption\n        created_at\n        likes_aggregate {\n          aggregate {\n            count\n          }\n        }\n        profile {\n          username\n          account {\n            displayName\n            avatarUrl\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetPost($id: uuid!) {\n      posts_by_pk(id: $id) {\n        media_id\n        caption\n        created_at\n        likes_aggregate {\n          aggregate {\n            count\n          }\n        }\n        profile {\n          username\n          account {\n            displayName\n            avatarUrl\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation InsertProfile(\n      $username: String\n      $description: String\n      $is_private: Boolean\n    ) {\n      insert_profiles_one(\n        object: {\n          username: $username\n          description: $description\n          is_private: $is_private\n        }\n      ) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation InsertProfile(\n      $username: String\n      $description: String\n      $is_private: Boolean\n    ) {\n      insert_profiles_one(\n        object: {\n          username: $username\n          description: $description\n          is_private: $is_private\n        }\n      ) {\n        id\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;