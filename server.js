const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const app = express()

// GraphQL schema language
const schema = buildSchema (`
    type Query {
        quoteOfTheDay: String,
        random: Float!,
        rollTwoDice: [Int]
    }
`)

// The root provider a resolver function for each API endpoint
const root = {
    quoteOfTheDay: () => {
        return Math.random() < 0.5 ? 'Take easy' : 'Let\'s save the world'
    },
    random: () => {
        return Math.random()
    },
    rollTwoDice: () => {
        return [0, 1].map(_ => 1 + Math.floor(Math.random() * 4))
    },
}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')
