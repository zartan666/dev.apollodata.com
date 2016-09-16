import React from 'react';

export default ({ library, projectLink }) => (
	<div className="slide empty active">
		<div className="contribute">
			<div className="title-contribute">
				Help launch Apollo on <span className="language">{library}</span><
			/div>
			<div className="message-contribute">
				Apollo for <span className="language">{library}</span> is not available yet.
				Help accelerate our efforts by contributing to the open source project.
			</div>
			<a className="btn primary round small" href={projectLink} target="_blank">Learn more</a>
		</div>
	</div>
);
