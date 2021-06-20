import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AddGame = (props) => {

	function addGame() {
		let gameName = prompt('Podaj nazwę dla nowej gry:');
		if (gameName.length == 0) { return; }
		let gamePrice = prompt('Podaj cenę dla nowej gry:');
		if (gamePrice.length == 0) { return; }
		if (isNaN(Number(gamePrice))) { alert('To nie liczba'); return; }
		axios.post('/api/game', {
				name: gameName,
				price: gamePrice
			})
			.then(response => response)
			.catch(error => console.log(error));
	}

	return (
		<>
			<div>
				<button onClick={addGame}>Dodaj grę</button>
			</div>
		</>
	);
};

export default AddGame;