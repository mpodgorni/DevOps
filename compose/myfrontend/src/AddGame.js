import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AddGame = (props) => {

	function addGame() {
		let gameName = prompt('Podaj nazwę gry:');
		if (gameName.length == 0) { return };
		let gamePrice = prompt('Podaj cenę gry:');
		if (gamePrice.length == 0) { return };
		axios.post('http://localhost:9090/game', {
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