import React from "react";

export default function Skills(props) {
	return (
		<div id="skills">
			<h3>Languages</h3>
			<ul id="languages">
			{props.skills.languages.map(language => <li key={language}>{language}</li>)}
			</ul>
			<h3>Frameworks/Libraries</h3>
			<ul id="libs">
			{props.skills.libs.map(lib => <li key={lib}>{lib}</li>)}
			</ul>
		</div>
	);
}