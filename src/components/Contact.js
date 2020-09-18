import React from "react";
import { sites } from "../data.json";

export default function Contact(props) {
	return (
		<ul id="site-list">
			<li>
				<strong>Email</strong>
				<p>sabelyn@outlook.com</p>
			</li>
			{props.sites.map(site => (
				<li key={site.name}>
					<a href={site.url} target="_new">{site.name}</a>
					<p>{site.message}</p>
				</li>
			))}
		</ul>
	);
}
