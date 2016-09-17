import React, { Component } from 'react';

const CONTEXTS = ['client', 'schema'];

export default class Slide extends Component {
  constructor() {
    super();
    this.state = { pane: 'client' };
  }

  setPane(pane) {
    this.setState({ pane });
  }

  render() {
    const { operation, library, snippet, githubUrl, docsUrl } = this.props;
    const { pane } = this.state;

    return (
      <div className="slide active">
      	<div className="snippet">
      		<div className="topcap">
      			<div className="btn-group toggle">
              {CONTEXTS.map(context => (
                <div key={context} className={`btn ancillary small ${context === pane && 'active'}`} onClick={() => this.setPane(context)}>
                  {context}
                </div>
              ))}
      			</div>

      		</div>
      		{CONTEXTS.map(context => (
            <div key={context} className={`${context} ${context === pane && 'active'}`}>
              <pre><code>
                {snippet[context]}
              </code></pre>
            </div>
          ))}
      	</div>
      	<div className="output">
      		<div className="topcap">
      			<div className="heading">Output</div>
      			<a className="cta-try link primary" href={githubUrl} target="_blank">
              View on Github
              <span className="icon-arrow-right"></span>
            </a>
      			<a className="cta-try link primary" href={docsUrl} target="_blank">
              <span className="language">{library}</span> docs
              <span className="icon-arrow-right"></span>
            </a>
      		</div>
      		<div className="output-content">
      			<iframe src={`http://dev.apollodata.com/frontpage-${library}-app-${operation}/`}></iframe>
      		</div>
      	</div>
      </div>
    );

  }
}
