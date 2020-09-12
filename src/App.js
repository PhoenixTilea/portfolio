import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./pages/About";
import Projects from "./pages/Projects";
import "./App.css";

export default function App() {
	const [theme, setTheme] = useState("dark");
	
	return (
		<div id="app" className={`${theme}-theme`}>
			<Header theme={theme} setTheme={setTheme} />
			<main>
				<Switch>
					<Route exact path="/"><About /></Route>
					<Route exact path="/projects"><Projects /></Route>
				</Switch>
			</main>
		</div>
	);
}