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
          tasks {
            id
            name
          }
        }
      }  
    }

    query getTask {
      # note: ID scalar is always serialized to string
      task(id: "5f29f981ff0c280cb74487ef") {
        id
        name
        completed
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
        name: "take training 6.1"
        completed: false
      }) {
        id
        name
        completed
        user {
          name
          email
        }
      }
    }

    mutation updateTask {
      updateTask(
        id: "5f29f981ff0c280cb74487ef", 
        input: { name: "take training 6.1 rev. 1", completed: true }
      ) {
        id
        name
        completed
      }
    }

    mutation deleteTask {
      deleteTask(id: "5f2b31e1d8bb611de170d72b") {
        id
        name
      }
    }
    
    #------------------------------------------------
    # HTTP Headers
    # Note: get token with the User "login" mutation
    #------------------------------------------------
    {
      "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1rQGEuYyIsImlhdCI6MTU5NjU2NzQzNSwiZXhwIjoxNTk2NjUzODM1fQ.BwfIhctOR6IQe56QbP8ZuEFP5x7MUY8nAtOBZWrH4Aw"
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

    query getMe {
      me {
        id
        name
        email
        tasks {
          name
          completed
        }
      }
    }

    mutation signUp {
      signUp(input: {
        name: "Mark"
        email: "mk@a.c"
        password: "password"
      }) {
        id
        name
        email
        createdAt
        updatedAt
        tasks {
          id
          name
        }
      }
    }

    mutation login {
      login(input: {
        email: "mk@a.c"
        password: "password"
      }) {
        token
      }
    }

    #---------------------------
    # Query Variables
    #---------------------------
    {
      "userId": 4
    }

    #------------------------------------------------
    # HTTP Headers
    # Note: get token with the User "login" mutation
    #------------------------------------------------
    {
      "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1rQGEuYyIsImlhdCI6MTU5NjU2NzQzNSwiZXhwIjoxNTk2NjUzODM1fQ.BwfIhctOR6IQe56QbP8ZuEFP5x7MUY8nAtOBZWrH4Aw"
    }
    ```