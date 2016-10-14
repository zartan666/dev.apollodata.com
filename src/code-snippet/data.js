const operations = ['query', 'mutation'];
const libraries = {
  'react': {
    name: 'React',
    snippets: {
      language: 'jsx',
      // This bizarre syntax means we use the `raw` loader rather than the
      // default es6 loader
      query: require(`!!raw!./react/query.js`),
      mutation: require(`!!raw!./react/mutation.js`),
    },
  },
  'react-native': {
    name: 'React Native',
    snippets: {
      language: 'jsx',
      query: require(`!!raw!./react-native/query.js`),
      mutation: require(`!!raw!./react-native/mutation.js`),
    },
    images: {
      query: 'img/react-native/query.png',
      mutation: 'img/react-native/mutation.gif',
    }
  },
  'angular2': {
    name: 'Angular',
    snippets: {
      language: 'typescript',
      query: require(`!!raw!./angular2/query.js`),
      mutation: require(`!!raw!./angular2/mutation.js`),
    },
  },
  'ios': {
    name: 'iOS',
    snippets: {
      language: 'swift',
      query: require(`!!raw!./ios/query.swift`),
      queryGraphQL: require(`!!raw!./ios/query.graphql`),
      mutation: require(`!!raw!./ios/mutation.swift`),
      mutationGraphQL: require(`!!raw!./ios/mutation.graphql`),
    },
    images: {
      query: 'img/ios/query.png',
      mutation: 'img/ios/mutation.gif',
    }
  },
  'schema': {
    snippets: {
      query: require(`raw!./schema/query.graphql`),
      mutation: require(`raw!./schema/mutation.graphql`),
    },
  },
};

const libraryKeys = Object.keys(libraries).filter(l => l !== 'schema')

export { operations, libraries, libraryKeys };
