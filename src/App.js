import React, { Component } from 'react';
import CodeSnippet from './code-snippet';

export default class App extends Component {
  constructor() {
    super();
    this.state = { library: 'react' };
    this.onLibraryChange = this.onLibraryChange.bind(this);
  }
  onLibraryChange(library) {
    this.setState({ library });
  }
  render() {
    const { library } = this.state;
    return (
      <div>
        <h2 className="headline-section">Query Example</h2>
        <div className="desc-section">XXX: Pitch why Apollo is awesome for querying data.</div>
        <CodeSnippet operation="query" activeLibrary={library} onLibraryChange={this.onLibraryChange} />

        <h2 className="headline-section">Mutation Example</h2>
        <div className="desc-section">XXX: Pitch why Apollo is awesome for mutating data.</div>
        <CodeSnippet operation="mutation" activeLibrary={library} onLibraryChange={this.onLibraryChange} />
      </div>
    );
  }
}
