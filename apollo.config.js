module.exports = {
    client: {
      service: {
        name: 'apollo-graphql',
        // URL to the GraphQL API
        url: 'http://localhost:4000/graphql', // Fixed URL
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue', // Corrected space after src
        'src/**/*.js',
      ],
    },
  };
  