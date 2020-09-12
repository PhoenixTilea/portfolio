import React, { useState } from "react";

export default function ThemeForm(props) {
	const [selection, setSelection] = useState(props.theme);
	const handleChange = e => setSelection(e.target.value);
	const handleSubmit = e => {
		e.preventDefault();
		props.setTheme(selection);
	}
	
	return (
		<form onSubmit={handleSubmit}>
			<label>
				<strong>Change Theme: </strong>
				<select value={selection} onChange={handleChange}>
					<option value="dark">Dark</option>
					<option vlaue="light">Light</option>
				</select>
			</label>
			<button>Change</button>
		</form>
	);
}