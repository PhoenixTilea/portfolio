import React from "react";
import { projects } from "../data.json";

import "./Projects.css";

export default function Projects() {
	return (
		<>
		<h2>Projects</h2>
		<ul id="projects">
		{projects.map(project => (
			<li key={project.name}>
				<h3>{project.name}</h3>
				<p>{project.desc}</p>
				<a href={project.url} target="_blank">View the App</a>
				<a href={project.github} target="_blank">View on GitHub</a>
				<img src={project.img} alt={`screenshot of the ${project.name} app`} />
			</li>
		))}
		</ul>
		</>
	);
}