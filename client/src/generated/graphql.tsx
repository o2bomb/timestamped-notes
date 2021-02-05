import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getLecture?: Maybe<Lecture>;
  lectures: Array<Lecture>;
  me?: Maybe<User>;
  youtube?: Maybe<YouTubeVideo>;
};


export type QueryGetLectureArgs = {
  id: Scalars['Int'];
};


export type QueryYoutubeArgs = {
  videoUrl: Scalars['String'];
};

export type Lecture = {
  __typename?: 'Lecture';
  id: Scalars['Float'];
  creatorId: Scalars['Float'];
  creator: User;
  title: Scalars['String'];
  videoUrl: Scalars['String'];
  thumbnailUrl: Scalars['String'];
  youtubeVideoId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  notes: Array<Note>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  githubId: Scalars['String'];
  displayName: Scalars['String'];
  avatarUrl: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  lectures: Array<Lecture>;
};

export type Note = {
  __typename?: 'Note';
  id: Scalars['Float'];
  content: Scalars['String'];
  timestamp: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type YouTubeVideo = {
  __typename?: 'YouTubeVideo';
  title: Scalars['String'];
  thumbnailUrl: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNote?: Maybe<Lecture>;
  createLecture?: Maybe<Lecture>;
};


export type MutationAddNoteArgs = {
  timestamp: Scalars['Int'];
  content: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationCreateLectureArgs = {
  videoUrl: Scalars['String'];
  thumbnailUrl: Scalars['String'];
  title: Scalars['String'];
};

export type RegularLectureFragment = (
  { __typename?: 'Lecture' }
  & Pick<Lecture, 'id' | 'title' | 'thumbnailUrl' | 'videoUrl' | 'youtubeVideoId' | 'creatorId' | 'createdAt' | 'updatedAt'>
  & { notes: Array<(
    { __typename?: 'Note' }
    & RegularNoteFragment
  )> }
);

export type RegularNoteFragment = (
  { __typename?: 'Note' }
  & Pick<Note, 'id' | 'content' | 'timestamp' | 'createdAt' | 'updatedAt'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'githubId' | 'displayName' | 'avatarUrl' | 'createdAt' | 'updatedAt'>
  & { lectures: Array<(
    { __typename?: 'Lecture' }
    & Pick<Lecture, 'id'>
  )> }
);

export type RegularYouTubeVideoFragment = (
  { __typename?: 'YouTubeVideo' }
  & Pick<YouTubeVideo, 'title' | 'thumbnailUrl'>
);

export type AddNoteMutationVariables = Exact<{
  id: Scalars['Int'];
  content: Scalars['String'];
  timestamp: Scalars['Int'];
}>;


export type AddNoteMutation = (
  { __typename?: 'Mutation' }
  & { addNote?: Maybe<(
    { __typename?: 'Lecture' }
    & RegularLectureFragment
  )> }
);

export type CreateLectureMutationVariables = Exact<{
  videoUrl: Scalars['String'];
  thumbnailUrl: Scalars['String'];
  title: Scalars['String'];
}>;


export type CreateLectureMutation = (
  { __typename?: 'Mutation' }
  & { createLecture?: Maybe<(
    { __typename?: 'Lecture' }
    & RegularLectureFragment
  )> }
);

export type GetLectureQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetLectureQuery = (
  { __typename?: 'Query' }
  & { getLecture?: Maybe<(
    { __typename?: 'Lecture' }
    & RegularLectureFragment
  )> }
);

export type GetLecturesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLecturesQuery = (
  { __typename?: 'Query' }
  & { lectures: Array<(
    { __typename?: 'Lecture' }
    & RegularLectureFragment
  )> }
);

export type GetYouTubeVideoQueryVariables = Exact<{
  videoUrl: Scalars['String'];
}>;


export type GetYouTubeVideoQuery = (
  { __typename?: 'Query' }
  & { youtube?: Maybe<(
    { __typename?: 'YouTubeVideo' }
    & RegularYouTubeVideoFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const RegularNoteFragmentDoc = gql`
    fragment RegularNote on Note {
  id
  content
  timestamp
  createdAt
  updatedAt
}
    `;
export const RegularLectureFragmentDoc = gql`
    fragment RegularLecture on Lecture {
  id
  title
  thumbnailUrl
  videoUrl
  notes {
    ...RegularNote
  }
  youtubeVideoId
  creatorId
  createdAt
  updatedAt
}
    ${RegularNoteFragmentDoc}`;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  githubId
  displayName
  avatarUrl
  lectures {
    id
  }
  createdAt
  updatedAt
}
    `;
export const RegularYouTubeVideoFragmentDoc = gql`
    fragment RegularYouTubeVideo on YouTubeVideo {
  title
  thumbnailUrl
}
    `;
export const AddNoteDocument = gql`
    mutation AddNote($id: Int!, $content: String!, $timestamp: Int!) {
  addNote(id: $id, content: $content, timestamp: $timestamp) {
    ...RegularLecture
  }
}
    ${RegularLectureFragmentDoc}`;
export type AddNoteMutationFn = Apollo.MutationFunction<AddNoteMutation, AddNoteMutationVariables>;

/**
 * __useAddNoteMutation__
 *
 * To run a mutation, you first call `useAddNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNoteMutation, { data, loading, error }] = useAddNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *      timestamp: // value for 'timestamp'
 *   },
 * });
 */
export function useAddNoteMutation(baseOptions?: Apollo.MutationHookOptions<AddNoteMutation, AddNoteMutationVariables>) {
        return Apollo.useMutation<AddNoteMutation, AddNoteMutationVariables>(AddNoteDocument, baseOptions);
      }
export type AddNoteMutationHookResult = ReturnType<typeof useAddNoteMutation>;
export type AddNoteMutationResult = Apollo.MutationResult<AddNoteMutation>;
export type AddNoteMutationOptions = Apollo.BaseMutationOptions<AddNoteMutation, AddNoteMutationVariables>;
export const CreateLectureDocument = gql`
    mutation CreateLecture($videoUrl: String!, $thumbnailUrl: String!, $title: String!) {
  createLecture(videoUrl: $videoUrl, thumbnailUrl: $thumbnailUrl, title: $title) {
    ...RegularLecture
  }
}
    ${RegularLectureFragmentDoc}`;
export type CreateLectureMutationFn = Apollo.MutationFunction<CreateLectureMutation, CreateLectureMutationVariables>;

/**
 * __useCreateLectureMutation__
 *
 * To run a mutation, you first call `useCreateLectureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLectureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLectureMutation, { data, loading, error }] = useCreateLectureMutation({
 *   variables: {
 *      videoUrl: // value for 'videoUrl'
 *      thumbnailUrl: // value for 'thumbnailUrl'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateLectureMutation(baseOptions?: Apollo.MutationHookOptions<CreateLectureMutation, CreateLectureMutationVariables>) {
        return Apollo.useMutation<CreateLectureMutation, CreateLectureMutationVariables>(CreateLectureDocument, baseOptions);
      }
export type CreateLectureMutationHookResult = ReturnType<typeof useCreateLectureMutation>;
export type CreateLectureMutationResult = Apollo.MutationResult<CreateLectureMutation>;
export type CreateLectureMutationOptions = Apollo.BaseMutationOptions<CreateLectureMutation, CreateLectureMutationVariables>;
export const GetLectureDocument = gql`
    query GetLecture($id: Int!) {
  getLecture(id: $id) {
    ...RegularLecture
  }
}
    ${RegularLectureFragmentDoc}`;

/**
 * __useGetLectureQuery__
 *
 * To run a query within a React component, call `useGetLectureQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLectureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLectureQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLectureQuery(baseOptions: Apollo.QueryHookOptions<GetLectureQuery, GetLectureQueryVariables>) {
        return Apollo.useQuery<GetLectureQuery, GetLectureQueryVariables>(GetLectureDocument, baseOptions);
      }
export function useGetLectureLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLectureQuery, GetLectureQueryVariables>) {
          return Apollo.useLazyQuery<GetLectureQuery, GetLectureQueryVariables>(GetLectureDocument, baseOptions);
        }
export type GetLectureQueryHookResult = ReturnType<typeof useGetLectureQuery>;
export type GetLectureLazyQueryHookResult = ReturnType<typeof useGetLectureLazyQuery>;
export type GetLectureQueryResult = Apollo.QueryResult<GetLectureQuery, GetLectureQueryVariables>;
export const GetLecturesDocument = gql`
    query GetLectures {
  lectures {
    ...RegularLecture
  }
}
    ${RegularLectureFragmentDoc}`;

/**
 * __useGetLecturesQuery__
 *
 * To run a query within a React component, call `useGetLecturesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLecturesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLecturesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLecturesQuery(baseOptions?: Apollo.QueryHookOptions<GetLecturesQuery, GetLecturesQueryVariables>) {
        return Apollo.useQuery<GetLecturesQuery, GetLecturesQueryVariables>(GetLecturesDocument, baseOptions);
      }
export function useGetLecturesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLecturesQuery, GetLecturesQueryVariables>) {
          return Apollo.useLazyQuery<GetLecturesQuery, GetLecturesQueryVariables>(GetLecturesDocument, baseOptions);
        }
export type GetLecturesQueryHookResult = ReturnType<typeof useGetLecturesQuery>;
export type GetLecturesLazyQueryHookResult = ReturnType<typeof useGetLecturesLazyQuery>;
export type GetLecturesQueryResult = Apollo.QueryResult<GetLecturesQuery, GetLecturesQueryVariables>;
export const GetYouTubeVideoDocument = gql`
    query GetYouTubeVideo($videoUrl: String!) {
  youtube(videoUrl: $videoUrl) {
    ...RegularYouTubeVideo
  }
}
    ${RegularYouTubeVideoFragmentDoc}`;

/**
 * __useGetYouTubeVideoQuery__
 *
 * To run a query within a React component, call `useGetYouTubeVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetYouTubeVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetYouTubeVideoQuery({
 *   variables: {
 *      videoUrl: // value for 'videoUrl'
 *   },
 * });
 */
export function useGetYouTubeVideoQuery(baseOptions: Apollo.QueryHookOptions<GetYouTubeVideoQuery, GetYouTubeVideoQueryVariables>) {
        return Apollo.useQuery<GetYouTubeVideoQuery, GetYouTubeVideoQueryVariables>(GetYouTubeVideoDocument, baseOptions);
      }
export function useGetYouTubeVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetYouTubeVideoQuery, GetYouTubeVideoQueryVariables>) {
          return Apollo.useLazyQuery<GetYouTubeVideoQuery, GetYouTubeVideoQueryVariables>(GetYouTubeVideoDocument, baseOptions);
        }
export type GetYouTubeVideoQueryHookResult = ReturnType<typeof useGetYouTubeVideoQuery>;
export type GetYouTubeVideoLazyQueryHookResult = ReturnType<typeof useGetYouTubeVideoLazyQuery>;
export type GetYouTubeVideoQueryResult = Apollo.QueryResult<GetYouTubeVideoQuery, GetYouTubeVideoQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;