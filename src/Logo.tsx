import * as React from 'react';
import './Logo.css';
import { WebGl } from './WebGL';

class Logo extends React.Component {
	public componentDidMount() {
		const container = document.getElementById('Logo');
		if (container) {
			const logo = new WebGl(container);
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
