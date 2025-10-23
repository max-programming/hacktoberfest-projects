// DO NOT EDIT. This is a generated file. Instead of this file, edit "repositories.gql".

export const GetRepositories = `#graphql
query GetRepositories($queryString: String!, $after: String, $before: String) {
  search(
    query: $queryString
    type: REPOSITORY
    first: 21
    after: $after
    before: $before
  ) {
    repositoryCount
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    nodes {
      ... on Repository {
        id
        name
        description
        url
        stargazerCount
        forkCount
        primaryLanguage {
          name
        }
        owner {
          login
          avatarUrl
        }
        repositoryTopics(first: 20) {
          nodes {
            topic {
              name
            }
          }
        }
        issues(states: OPEN) {
          totalCount
        }
        pullRequests(states: OPEN) {
          totalCount
        }
      }
    }
  }
}` as string & GetRepositories

export type GetRepositories = (vars: { queryString: string, after?: string | null, before?: string | null }) => {
  search: {
    repositoryCount: number
    pageInfo: {
      startCursor: string | null
      endCursor: string | null
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
    nodes: Array<{} & {
      id: string
      name: string
      description: string | null
      url: string
      stargazerCount: number
      forkCount: number
      primaryLanguage: {
        name: string
      } | null
      owner: {
        login: string
        avatarUrl: string
      }
      repositoryTopics: {
        nodes: Array<{
          topic: {
            name: string
          }
        }> | null
      }
      issues: {
        totalCount: number
      }
      pullRequests: {
        totalCount: number
      }
    } | null> | null
  }
}
