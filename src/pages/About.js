import React from "react";
import Contact from "../components/Contact";
import Skills from "../components/Skills";
import { skills, sites } from "../data.json";
import "./About.css";

export default function About() {
	return (
		<>
		<h2>Contact Me</h2>
		<Contact sites={sites} />
		<h2>Technical Skills</h2>
		<Skills skills={skills} />
		</>
	);
}