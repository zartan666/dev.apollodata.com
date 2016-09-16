import React from 'react';

import EmptySlide from './EmptySlide';
import Slide from './Slide';
import { libraries, librarySnippets } from './data';

const MenuItem = ({ library, active, onLibraryChange }) => (
  <div className={`btn small round ${active && 'active'}`} onClick={() => onLibraryChange(library)}>
    <div className="title-item">{library}</div>
  </div>
);

export default ({ operation, activeLibrary, onLibraryChange }) => {
  const snippet = librarySnippets[operation][activeLibrary];

  let slide;
  if (snippet) {
    slide = <Slide operation={operation} library={activeLibrary} snippet={snippet} />;
  } else {
    slide = <EmptySlide library={activeLibrary} />;
  }

  return (
    <div className="carousel">
      <div className="picker-carousel">
        {libraries.map(library =>
          <MenuItem key={library} library={library} active={library === activeLibrary} onLibraryChange={onLibraryChange} />
        )}
      </div>

      <div className="slides-carousel">
        {slide}
      </div>
    </div>
  );
}
