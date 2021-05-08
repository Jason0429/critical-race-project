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
	const [started, setStarted] = useState(false);
	const speed = 10;

	function handleStart() {
		setStarted(true);
		setTimeout(() => {
			$('.clouds').addClass('go');
			$('.mountains').addClass('go');
		}, 500);
	}

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
			{/* Blur overlay */}
			<div
				className="blur-overlay"
				style={{ display: started ? 'none' : 'block' }}></div>
			{/* Start Screen */}
			<div
				className="start-screen"
				style={{ display: started ? 'none' : 'flex' }}>
				<div className="title">Instructions</div>
				<ul>
					<li>Use UP and DOWN arrow keys to navigate the dragon.</li>
					<li>Collect envelopes to reveal hidden messages.</li>
					<li>Press the Start Button to begin the adventure.</li>
					<li>Collect as many points as you can!</li>
				</ul>
				<button className="btn" onClick={handleStart}>
					Start
				</button>
			</div>
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
