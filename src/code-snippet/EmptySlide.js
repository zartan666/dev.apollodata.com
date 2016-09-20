import React from 'react';

export default ({ libraryName, githubUrl, active }) => (
	<div className={`slide empty ${active && 'active'}`}>
		<div className="contribute">
			<div className="title-contribute">
				Help launch Apollo on <span className="language">{libraryName}</span><
			/div>
			<div className="message-contribute">
				Apollo for <span className="language">{libraryName}</span> is not available yet.
				Help accelerate our efforts by contributing to the open source project.
			</div>
			<a className="btn primary round small" href={githubUrl} target="_blank">Learn more</a>
		</div>
	</div>
);
