# udemy_GraphQLApolloServerNodeMongo
Udemy course: GraphQL Apollo Server with Node.js, MongoDB - GraphQL API

## Instructions
1. Open command window in directory ./my-code (instructions based on bash shell)
1. Run command: $ docker-compose up --build

The docker compose up command will start three services:  
  1. Api:   
    1. Main api can be reached at http://localhost:3001
    1. Graphql Playground can be reached at http://localhost:3001/graphql
  1. Mongodb
  1. Mongo Express (MongoDB admin tool): can be reached at http://localhost:8081

## Mongo Info
1. Need to use the '?authSource=admin' query parameter to get auth working ,for example: MONGO_DB_URL=mongodb://mdk:abcd1234@mongodb:27017/mydb?authSource=admin


## Sample Graphql Playground scripts
1. Tasks:
    ```gql
    query getTasks {
      tasks {
        id
        name
        completed
        user {
          name
          email
        }
      }  
    }

    query getTask {
      # note: ID scalar is always serialized to string
      task(id: 4) {
        id
        name
        user {
          name
          tasks {
            name
          }
        }
      }  
    }

    query getTask2 {
      task(id: "4") {
        id
        name
        user {
          name
          tasks {
            name
          }
        }
      }  
    }

    mutation createTask {
      createTask(input: {
        name: "take training"
        completed: true
        userId: 2
      }) {
        id
        name
        completed
        user {
          name
        }
      }
    }
    ```
1. Users:
    ```gql
    query getUsers {
      users {
        id
        name
        email
        tasks {
          name
        }
      }
    }

    query getUser($userId: ID!) {
      user(id: $userId) {
        id
        name
        email
        tasks {
          name
          completed 
        }
      }
    }


    # Query Variables
    {
      "userId": 4
    }
    ```