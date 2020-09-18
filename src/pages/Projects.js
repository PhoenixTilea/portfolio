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
				<img src={project.img} alt={`screenshot of the ${project.name} app`} />
				<h3>{project.name}</h3>
				<p>{project.desc}</p>
				<a href={project.url} target="_new">View the App</a>
				<a href={project.github} target="_new">View on GitHub</a>
			</li>
		))}
		</ul>
		</>
	);
}