import * as React from 'react';
import { Canvas } from './Canvas';
import './Logo.css';

class Logo extends React.Component {
	public componentDidMount() {
		const container = document.getElementById('Logo');
		if (container) {
			const logo = new Canvas(container);
			logo.render();
		}
	}

	public render() {
		return (
			<div id="Logo" />
		);
	}
}

export default Logo;
