import React, { Component } from 'react';

const CONTEXTS = ['client', 'schema'];
const CONTEXTS_WITH_GRAPHQL = ['client', 'graphql', 'schema'];
const CONTEXT_NAMES = {
  client: 'Client',
  graphql: 'Query',
  schema: 'Schema'
}
const activeClassName = cond => cond ? 'active' : ''

export default class Slide extends Component {
  constructor() {
    super();
    this.state = { pane: 'client' };
  }

  setPane(pane) {
    this.setState({ pane });
  }

  render() {
    const { libraryName, snippetLanguage, clientSnippet, graphqlSnippet,
      schemaSnippet, githubUrl, docsUrl, image, demoUrl, active } = this.props;
    const { pane } = this.state;

    let demo;
    if (image) {
      demo = <img src={image} alt="App Demo" />;
    } else {
      demo = <iframe src={demoUrl} />;
    }

    const contexts = graphqlSnippet ? CONTEXTS_WITH_GRAPHQL : CONTEXTS;

    return (
      <div className={`slide ${activeClassName(active)} ${libraryName.toLowerCase().replace(/ /g,"_")}`}>
        <div className="snippet">
          <div className="topcap">
            <div className="btn-group toggle">
              {contexts.map(context => (
                <div key={context} className={`btn ancillary small ${activeClassName(context === pane)}`} onClick={() => this.setPane(context)}>
                  {CONTEXT_NAMES[context]}
                </div>
              ))}
            </div>
          </div>
          <div className={`client ${activeClassName(pane === 'client')}`}>
            <pre><code className={`language-${snippetLanguage}`}>
              {clientSnippet}
            </code></pre>
          </div>
          {graphqlSnippet &&
            <div className={`client ${activeClassName(pane === 'graphql')}`}>
              <pre><code className={`language-graphql`}>
                {graphqlSnippet}
              </code></pre>
            </div>
          }
          <div className={`schema ${activeClassName(pane === 'schema')}`}>
            <pre><code className={`language-graphql`}>
              {schemaSnippet}
            </code></pre>
          </div>
        </div>
        <div className="output">
          <div className="topcap">
            <div className="heading">Output</div>
            <a className="cta-try link primary" href={githubUrl} target="_blank">
              View on Github
              <span className="icon-arrow-right"></span>
            </a>
            <a className="cta-try link primary" href={docsUrl} target="_blank">
              <span className="language">{libraryName}</span> docs
              <span className="icon-arrow-right"></span>
            </a>
          </div>
          <div className="output-content">
            {demo}
          </div>
        </div>
      </div>
    );
  }
}
