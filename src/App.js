import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import dragon from './img/dragon_transparent.png';
import envelope from './img/envelope.png';
import Envelope from './components/Envelope';
import $ from 'jquery';
import { trivia } from './data/trivia';

function App() {
	const currentTrivia = useRef(0);
	const [dragonTop, setDragonTop] = useState(200);
	const [started, setStarted] = useState(false);
	const [isTriviaOpen, setIsTriviaOpen] = useState(false);
	const [answered, setAnswered] = useState(false);
	const speed = 10;

	useEffect(() => {
		// HTML elements and JQuery HTML elements
		const dragon = document.querySelector('.dragon');
		const envelope = document.querySelector('.envelope');
		const $dragon = $('.dragon');
		const $envelope = $('.envelope');
		const $clouds = $('.clouds');
		const $mountains = $('.mountains');

		// Arrow event listeners
		document.addEventListener('keydown', moveDragon);

		// Set initial top position
		setDragonTop(getTop());

		// Check for dragon and envelope collision
		const collisionTimer = setInterval(() => {
			if (isCollide(dragon, envelope)) {
				// alert('collided');
				$envelope.removeClass('go-right');
				$clouds.removeClass('go-left');
				$mountains.removeClass('go-left');

				handleOpenTrivia();

				// clearInterval(collisionTimer);
			}
		}, 100);
	}, [setDragonTop]);

	function getTop() {
		let value = document.querySelector('.dragon').style.top;
		return parseInt(value.substring(0, value.length - 2));
	}

	// a: HTML element
	// b: HTML element
	function isCollide(a, b) {
		var aRect = a.getBoundingClientRect();
		var bRect = b.getBoundingClientRect();

		return !(
			aRect.top + aRect.height < bRect.top ||
			aRect.top > bRect.top + bRect.height ||
			aRect.left + aRect.width < bRect.left ||
			aRect.left > bRect.left + bRect.width
		);
	}

	function handleStart() {
		setStarted(true);
		setTimeout(() => {
			$('.clouds').addClass('go-left');
			$('.mountains').addClass('go-left');
			$('.envelope').addClass('go-right');
		}, 500);
	}

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

	function handleOpenTrivia() {
		console.log('THIS OPEN TRIVIA: ' + currentTrivia.current);
		if (currentTrivia.current >= trivia.length) {
			setStarted(false);
			setIsTriviaOpen(false);
			currentTrivia.current = 0;
			endGame();
			return;
		}

		setIsTriviaOpen(true);
	}

	function handleCloseTrivia() {
		setIsTriviaOpen(false);
		setAnswered(false);
		currentTrivia.current++;
	}

	function handleAnswerCheck(e) {
		let answer = e.target.innerText.trim();
		if (answer === trivia[currentTrivia.current].correctAnswer) {
			setAnswered(true);
			setTimeout(() => {
				handleCloseTrivia();
				$('.clouds').addClass('go-left');
				$('.mountains').addClass('go-left');
				$('.envelope').addClass('go-right');
			}, 2000);
		} else {
			alert('Try again!');
		}
	}

	function endGame() {
		alert('Game has ended');
	}

	return (
		<div className="App">
			{/* Blur overlay */}
			{(!started || isTriviaOpen) && <div className="blur-overlay"></div>}

			{/* Start Screen */}
			{!started && (
				<div className="start-screen">
					<div className="title">Instructions</div>
					<ul>
						<li>
							Use UP and DOWN arrow keys to navigate the dragon.
						</li>
						<li>Collect envelopes to reveal hidden messages.</li>
						<li>Press the Start Button to begin the adventure.</li>
					</ul>
					<button className="btn" onClick={handleStart}>
						Start
					</button>
				</div>
			)}

			{/* Trivia Screen */}
			{isTriviaOpen && started && (
				<div className="trivia-screen">
					<div className="question">
						{trivia[currentTrivia.current].question}
					</div>
					<div className="answer-list">
						{trivia[currentTrivia.current].answers.map((answer) => (
							<div
								className="answer-choice"
								onClick={handleAnswerCheck}>
								{answer}
							</div>
						))}
					</div>
					{answered && (
						<div className="correct-answer">
							The correct answer is:{' '}
							{trivia[currentTrivia.current].correctAnswer}!
						</div>
					)}
				</div>
			)}

			<div className="clouds"></div>
			<Envelope />
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
