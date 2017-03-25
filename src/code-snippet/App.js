import React, { Component } from 'react';
import CodeSnippet from './CodeSnippet';

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
        <h2 className="headline-section">Queries</h2>
        <div className="desc-section">Apollo makes fetching the exact data you need for your component easy and allows you to put your queries exactly where you need them.</div>
        <CodeSnippet operation="query" activeLibrary={library} onLibraryChange={this.onLibraryChange} />

        <h2 className="headline-section">Mutations</h2>
        <div className="desc-section">Thanks to Apollo's caching store, you can use GraphQL mutations to change your data and see the results reflected in your UI automatically.</div>
        <CodeSnippet operation="mutation" activeLibrary={library} onLibraryChange={this.onLibraryChange} />
      </div>
    );
  }
}
