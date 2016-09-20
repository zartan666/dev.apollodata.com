import React from 'react';

import EmptySlide from './EmptySlide';
import Slide from './Slide';
import { libraries, libraryKeys } from './data';

const MenuItem = ({ library, active, onLibraryChange }) => (
  <div className={`btn small round ${active && 'active'}`} onClick={() => onLibraryChange(library)}>
    <div className="title-item">{libraries[library].name}</div>
  </div>
);

export default ({ operation, activeLibrary, onLibraryChange }) => {
  function slide(library) {
    const libraryName = libraries[library].name;

    if (libraries[library].snippets) {
      const snippetLanguage = libraries[library].snippets.language;
      const clientSnippet = libraries[library].snippets[operation];
      const schemaSnippet = libraries.schema.snippets[operation];

      const image = libraries[library].images && libraries[library].images[operation];
      // This is a default if image is not defined
      const demoUrl = `http://dev.apollodata.com/frontpage-${library}-app-${operation}/`;

      // these two are completely standard
      const githubUrl = `https://github.com/apollostack/frontpage-${activeLibrary}-app`;
      const docsUrl = `http://dev.apollodata.com/${activeLibrary}`;

      return (
        <Slide
          key={library}
          libraryName={libraryName}
          snippetLanguage={snippetLanguage}
          clientSnippet={clientSnippet}
          schemaSnippet={schemaSnippet}
          image={image}
          demoUrl={demoUrl}
          githubUrl={githubUrl}
          docsUrl={docsUrl}
          active={activeLibrary === library}
        />
      );
    } else {
      const githubUrl = libraries[library].url;
      return (
        <EmptySlide
          key={library}
          libraryName={libraryName}
          githubUrl={githubUrl}
          active={activeLibrary === library}
        />
      );
    }
  }


  return (
    <div className="carousel">
      <div className="picker-carousel">
        {libraryKeys.map(library =>
          <MenuItem
            key={library}
            library={library}
            active={library === activeLibrary}
            onLibraryChange={onLibraryChange}
          />
        )}
      </div>

      <div className="slides-carousel">
        {libraryKeys.map(slide)}
      </div>
    </div>
  );
}
