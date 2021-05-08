import React, { useState, useEffect } from 'react';
import './App.css';
import dragon from './img/dragon_transparent.png';
import envelope from './img/envelope.png';
import $ from 'jquery';

function App() {
	function getTop() {
		let value = document.querySelector('.dragon').style.top;
		return parseInt(value.substring(0, value.length - 2));
	}

	const [dragonTop, setDragonTop] = useState(200);
	const speed = 10;

	$('.clouds').addClass('go');
	$('.mountains').addClass('go');

	useEffect(() => {
		document.addEventListener('keydown', moveDragon);
		setDragonTop(getTop());
	}, [setDragonTop]);

	function moveDragon(e) {
		const key = e.keyCode;
		switch (key) {
			// Up Arrow
			case 38:
				setDragonTop((prevState) =>
					prevState - speed < 0 ? prevState : prevState - speed
				);
				break;

			// Down Arrow
			case 40:
				setDragonTop((prevState) =>
					prevState + speed >
					window.innerHeight -
						document.querySelector('.dragon').offsetHeight
						? prevState
						: prevState + speed
				);
				break;

			default:
				break;
		}
	}

	return (
		<div className="App">
			<div className="clouds"></div>
			<img src={envelope} alt="envelope" className="envelope" />
			<img
				src={dragon}
				alt="dragon"
				className="dragon"
				style={{ top: `${dragonTop}px` }}
			/>
			<div className="mountains"></div>
		</div>
	);
}

export default App;
