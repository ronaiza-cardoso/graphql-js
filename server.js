const { graphql, buildSchema } = require('graphql');

// GraphQL schema language
const schema = buildSchema (`
    type Query {
        hello: String
    }
`)

// The root provider a resolver function for each API endpoint
const root = {
    hello: () => {
        return `Hi Galaxy!`
    },
}

// Running the GraphQL query { hello } and print out the response
graphql(schema, '{ hello }', root).then(response => {
    console.log(response)
})
