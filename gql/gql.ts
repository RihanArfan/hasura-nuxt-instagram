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
    "\n    query SearchProfiles($query: String) {\n      profiles(\n        where: {\n          _or: {\n            username: { _ilike: $query }\n            account: { displayName: { _ilike: $query } }\n          }\n        }\n      ) {\n        id\n        username\n        account {\n          displayName\n        }\n      }\n    }\n  ": types.SearchProfilesDocument,
    "\n  fragment PendingListItem_ProfileFragment on profiles {\n    id\n    username\n    account {\n      displayName\n    }\n  }\n": types.PendingListItem_ProfileFragmentFragmentDoc,
    "\n    query GetPendingProfiles {\n      profiles(where: { is_admin_approved: { _eq: false } }) {\n        id\n        ...PendingListItem_ProfileFragment\n      }\n    }\n  ": types.GetPendingProfilesDocument,
    "\n    query GetProfileById($id: uuid!) {\n      profiles_by_pk(id: $id) {\n        id\n        username\n      }\n    }\n  ": types.GetProfileByIdDocument,
    "\n    query GetProfile($username: String) {\n      profiles(where: { username: { _eq: $username } }) {\n        id\n        account {\n          displayName\n          avatarUrl\n        }\n        description\n        is_private\n        is_admin_approved\n        is_following\n        is_requested_following\n        followers_aggregate(where: { is_accepted: { _eq: true } }) {\n          aggregate {\n            count\n          }\n        }\n        following_aggregate(where: { is_accepted: { _eq: true } }) {\n          aggregate {\n            count\n          }\n        }\n        posts_aggregate {\n          aggregate {\n            count\n          }\n        }\n        posts {\n          id\n          media_id\n        }\n      }\n    }\n  ": types.GetProfileDocument,
    "\n    mutation FollowProfile($profile: uuid!) {\n      insert_following_one(object: { following_profile_id: $profile }) {\n        is_accepted\n      }\n    }\n  ": types.FollowProfileDocument,
    "\n    mutation UnfollowProfile($profile: uuid!, $myProfile: uuid!) {\n      delete_following_by_pk(\n        follower_profile_id: $myProfile\n        following_profile_id: $profile\n      ) {\n        created_at\n      }\n    }\n  ": types.UnfollowProfileDocument,
    "\n    query GetPost($id: uuid!) {\n      posts_by_pk(id: $id) {\n        media_id\n        caption\n        created_at\n        likes_aggregate {\n          aggregate {\n            count\n          }\n        }\n        profile {\n          username\n          account {\n            displayName\n            avatarUrl\n          }\n        }\n      }\n    }\n  ": types.GetPostDocument,
    "\n    mutation ApproveProfile($id: uuid!) {\n      update_profiles_by_pk(\n        pk_columns: { id: $id }\n        _set: { is_admin_approved: true }\n      ) {\n        is_admin_approved\n      }\n    }\n  ": types.ApproveProfileDocument,
    "\n    query GetFollowingPosts($profile: uuid!) {\n      posts(\n        order_by: { created_at: desc }\n        where: {\n          profile: { followers: { followerProfile: { id: { _eq: $profile } } } }\n        }\n      ) {\n        id\n        media_id\n        caption\n        created_at\n        profile {\n          username\n          account {\n            displayName\n            avatarUrl\n          }\n        }\n      }\n    }\n  ": types.GetFollowingPostsDocument,
    "\n    query GetPosts {\n      posts(order_by: { created_at: desc }) {\n        id\n        media_id\n        caption\n        created_at\n        profile {\n          username\n          account {\n            displayName\n            avatarUrl\n          }\n        }\n      }\n    }\n  ": types.GetPostsDocument,
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
export function graphql(source: "\n    query SearchProfiles($query: String) {\n      profiles(\n        where: {\n          _or: {\n            username: { _ilike: $query }\n            account: { displayName: { _ilike: $query } }\n          }\n        }\n      ) {\n        id\n        username\n        account {\n          displayName\n        }\n      }\n    }\n  "): (typeof documents)["\n    query SearchProfiles($query: String) {\n      profiles(\n        where: {\n          _or: {\n            username: { _ilike: $query }\n            account: { displayName: { _ilike: $query } }\n          }\n        }\n      ) {\n        id\n        username\n        account {\n          displayName\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PendingListItem_ProfileFragment on profiles {\n    id\n    username\n    account {\n      displayName\n    }\n  }\n"): (typeof documents)["\n  fragment PendingListItem_ProfileFragment on profiles {\n    id\n    username\n    account {\n      displayName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetPendingProfiles {\n      profiles(where: { is_admin_approved: { _eq: false } }) {\n        id\n        ...PendingListItem_ProfileFragment\n      }\n    }\n  "): (typeof documents)["\n    query GetPendingProfiles {\n      profiles(where: { is_admin_approved: { _eq: false } }) {\n        id\n        ...PendingListItem_ProfileFragment\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetProfileById($id: uuid!) {\n      profiles_by_pk(id: $id) {\n        id\n        username\n      }\n    }\n  "): (typeof documents)["\n    query GetProfileById($id: uuid!) {\n      profiles_by_pk(id: $id) {\n        id\n        username\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetProfile($username: String) {\n      profiles(where: { username: { _eq: $username } }) {\n        id\n        account {\n          displayName\n          avatarUrl\n        }\n        description\n        is_private\n        is_admin_approved\n        is_following\n        is_requested_following\n        followers_aggregate(where: { is_accepted: { _eq: true } }) {\n          aggregate {\n            count\n          }\n        }\n        following_aggregate(where: { is_accepted: { _eq: true } }) {\n          aggregate {\n            count\n          }\n        }\n        posts_aggregate {\n          aggregate {\n            count\n          }\n        }\n        posts {\n          id\n          media_id\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetProfile($username: String) {\n      profiles(where: { username: { _eq: $username } }) {\n        id\n        account {\n          displayName\n          avatarUrl\n        }\n        description\n        is_private\n        is_admin_approved\n        is_following\n        is_requested_following\n        followers_aggregate(where: { is_accepted: { _eq: true } }) {\n          aggregate {\n            count\n          }\n        }\n        following_aggregate(where: { is_accepted: { _eq: true } }) {\n          aggregate {\n            count\n          }\n        }\n        posts_aggregate {\n          aggregate {\n            count\n          }\n        }\n        posts {\n          id\n          media_id\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation FollowProfile($profile: uuid!) {\n      insert_following_one(object: { following_profile_id: $profile }) {\n        is_accepted\n      }\n    }\n  "): (typeof documents)["\n    mutation FollowProfile($profile: uuid!) {\n      insert_following_one(object: { following_profile_id: $profile }) {\n        is_accepted\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UnfollowProfile($profile: uuid!, $myProfile: uuid!) {\n      delete_following_by_pk(\n        follower_profile_id: $myProfile\n        following_profile_id: $profile\n      ) {\n        created_at\n      }\n    }\n  "): (typeof documents)["\n    mutation UnfollowProfile($profile: uuid!, $myProfile: uuid!) {\n      delete_following_by_pk(\n        follower_profile_id: $myProfile\n        following_profile_id: $profile\n      ) {\n        created_at\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetPost($id: uuid!) {\n      posts_by_pk(id: $id) {\n        media_id\n        caption\n        created_at\n        likes_aggregate {\n          aggregate {\n            count\n          }\n        }\n        profile {\n          username\n          account {\n            displayName\n            avatarUrl\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetPost($id: uuid!) {\n      posts_by_pk(id: $id) {\n        media_id\n        caption\n        created_at\n        likes_aggregate {\n          aggregate {\n            count\n          }\n        }\n        profile {\n          username\n          account {\n            displayName\n            avatarUrl\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation ApproveProfile($id: uuid!) {\n      update_profiles_by_pk(\n        pk_columns: { id: $id }\n        _set: { is_admin_approved: true }\n      ) {\n        is_admin_approved\n      }\n    }\n  "): (typeof documents)["\n    mutation ApproveProfile($id: uuid!) {\n      update_profiles_by_pk(\n        pk_columns: { id: $id }\n        _set: { is_admin_approved: true }\n      ) {\n        is_admin_approved\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetFollowingPosts($profile: uuid!) {\n      posts(\n        order_by: { created_at: desc }\n        where: {\n          profile: { followers: { followerProfile: { id: { _eq: $profile } } } }\n        }\n      ) {\n        id\n        media_id\n        caption\n        created_at\n        profile {\n          username\n          account {\n            displayName\n            avatarUrl\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetFollowingPosts($profile: uuid!) {\n      posts(\n        order_by: { created_at: desc }\n        where: {\n          profile: { followers: { followerProfile: { id: { _eq: $profile } } } }\n        }\n      ) {\n        id\n        media_id\n        caption\n        created_at\n        profile {\n          username\n          account {\n            displayName\n            avatarUrl\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetPosts {\n      posts(order_by: { created_at: desc }) {\n        id\n        media_id\n        caption\n        created_at\n        profile {\n          username\n          account {\n            displayName\n            avatarUrl\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetPosts {\n      posts(order_by: { created_at: desc }) {\n        id\n        media_id\n        caption\n        created_at\n        profile {\n          username\n          account {\n            displayName\n            avatarUrl\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation InsertProfile(\n      $username: String\n      $description: String\n      $is_private: Boolean\n    ) {\n      insert_profiles_one(\n        object: {\n          username: $username\n          description: $description\n          is_private: $is_private\n        }\n      ) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation InsertProfile(\n      $username: String\n      $description: String\n      $is_private: Boolean\n    ) {\n      insert_profiles_one(\n        object: {\n          username: $username\n          description: $description\n          is_private: $is_private\n        }\n      ) {\n        id\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;