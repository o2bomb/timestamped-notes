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
  hello: Scalars['String'];
  todos: Array<Todo>;
  getLecture?: Maybe<Lecture>;
  lectures: Array<Lecture>;
};


export type QueryGetLectureArgs = {
  id: Scalars['Int'];
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['Float'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Lecture = {
  __typename?: 'Lecture';
  id: Scalars['Float'];
  videoUrl: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  notes: Array<Note>;
};

export type Note = {
  __typename?: 'Note';
  id: Scalars['Float'];
  content: Scalars['String'];
  timestamp: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo?: Maybe<Todo>;
  createLecture?: Maybe<Lecture>;
  createNote?: Maybe<Note>;
};


export type MutationAddTodoArgs = {
  content: Scalars['String'];
};


export type MutationCreateLectureArgs = {
  videoUrl: Scalars['String'];
};


export type MutationCreateNoteArgs = {
  timestamp: Scalars['Int'];
  content: Scalars['String'];
  lectureId: Scalars['Int'];
};

export type RegularLectureFragment = (
  { __typename?: 'Lecture' }
  & Pick<Lecture, 'id' | 'videoUrl' | 'createdAt' | 'updatedAt'>
  & { notes: Array<(
    { __typename?: 'Note' }
    & RegularNoteFragment
  )> }
);

export type RegularNoteFragment = (
  { __typename?: 'Note' }
  & Pick<Note, 'id' | 'content' | 'timestamp' | 'createdAt' | 'updatedAt'>
);

export type CreateLectureMutationVariables = Exact<{
  videoUrl: Scalars['String'];
}>;


export type CreateLectureMutation = (
  { __typename?: 'Mutation' }
  & { createLecture?: Maybe<(
    { __typename?: 'Lecture' }
    & RegularLectureFragment
  )> }
);

export type CreateNoteMutationVariables = Exact<{
  lectureId: Scalars['Int'];
  content: Scalars['String'];
  timestamp: Scalars['Int'];
}>;


export type CreateNoteMutation = (
  { __typename?: 'Mutation' }
  & { createNote?: Maybe<(
    { __typename?: 'Note' }
    & RegularNoteFragment
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
  videoUrl
  notes {
    ...RegularNote
  }
  createdAt
  updatedAt
}
    ${RegularNoteFragmentDoc}`;
export const CreateLectureDocument = gql`
    mutation CreateLecture($videoUrl: String!) {
  createLecture(videoUrl: $videoUrl) {
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
 *   },
 * });
 */
export function useCreateLectureMutation(baseOptions?: Apollo.MutationHookOptions<CreateLectureMutation, CreateLectureMutationVariables>) {
        return Apollo.useMutation<CreateLectureMutation, CreateLectureMutationVariables>(CreateLectureDocument, baseOptions);
      }
export type CreateLectureMutationHookResult = ReturnType<typeof useCreateLectureMutation>;
export type CreateLectureMutationResult = Apollo.MutationResult<CreateLectureMutation>;
export type CreateLectureMutationOptions = Apollo.BaseMutationOptions<CreateLectureMutation, CreateLectureMutationVariables>;
export const CreateNoteDocument = gql`
    mutation CreateNote($lectureId: Int!, $content: String!, $timestamp: Int!) {
  createNote(lectureId: $lectureId, content: $content, timestamp: $timestamp) {
    ...RegularNote
  }
}
    ${RegularNoteFragmentDoc}`;
export type CreateNoteMutationFn = Apollo.MutationFunction<CreateNoteMutation, CreateNoteMutationVariables>;

/**
 * __useCreateNoteMutation__
 *
 * To run a mutation, you first call `useCreateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoteMutation, { data, loading, error }] = useCreateNoteMutation({
 *   variables: {
 *      lectureId: // value for 'lectureId'
 *      content: // value for 'content'
 *      timestamp: // value for 'timestamp'
 *   },
 * });
 */
export function useCreateNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateNoteMutation, CreateNoteMutationVariables>) {
        return Apollo.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument, baseOptions);
      }
export type CreateNoteMutationHookResult = ReturnType<typeof useCreateNoteMutation>;
export type CreateNoteMutationResult = Apollo.MutationResult<CreateNoteMutation>;
export type CreateNoteMutationOptions = Apollo.BaseMutationOptions<CreateNoteMutation, CreateNoteMutationVariables>;
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