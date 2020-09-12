import React from "react";
import { Link } from "react-router-dom";
import ThemeForm from "./ThemeForm";
import "./Header.css";

export default function Header(props) {
	return (
		<header id="header">
			<h1>Sabelyn Thorpe</h1>
			<h3>Web Software Engineer</h3>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/projects">Projects</Link>
			</nav>
			<ThemeForm {...props} />
		</header>
	);
}