const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const app = express()

// GraphQL schema language
const schema = buildSchema (`
    type Query {
        quoteOfTheDay: String,
        random: Float!,
        rollDice(numDice: Int!, numSides: Int): [Int]
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
    rollDice: function ({numDice, numSides}) {
        const output = [];
        for (let i = 0; i < numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (numSides || 6)));
        }
        return output;
    },
}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')
