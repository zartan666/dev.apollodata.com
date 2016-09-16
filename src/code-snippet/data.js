const operations = ['query', 'mutation'];
const libraries = ['react', 'angular', 'swift'];
const librarySnippets = {};
operations.forEach(operation => {
  libraries.forEach(library => {
    try {
      librarySnippets[operation] = librarySnippets[operation] || {};
      librarySnippets[operation][library] = {
        client: require(`raw!./${library}/${operation}.txt`),
        schema: require(`raw!./schema/${operation}.txt`),
      }
      // just don't do anything if require fails
    } catch (e) {}
  });
});

export { operations, libraries, librarySnippets };
