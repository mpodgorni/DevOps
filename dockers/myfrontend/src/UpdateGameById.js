import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UpdateGameById = (props) => {

	function updateGameById() {
		let gameId = parseInt(prompt('Podaj id gry:'));
		if (gameId == null) { return };
		if (isNaN(Number(gameId))) { alert(`Podana wartość ${gameId} nie jest liczbą całkowitą dodatnią.`); return; }
    	let gameName = prompt('Podaj nową nazwe dla gry:');
    	if (gameName.length == 0) { return };
		let gamePrice = prompt('Podaj nową cenę dla gry:');
    	if (gamePrice.length == 0) { return };
		if (isNaN(Number(gamePrice))) { alert('To nie liczba'); return; }
		axios.put(`/api/game/${gameId}`, {
      		name: gameName,
			price: gamePrice
    	})
		.then(response => response)
		.catch(error => console.log(error));
	}

	return (
		<>
			<div>
				<button onClick={updateGameById}>Aktualizuj grę (po id)</button>
			</div>
		</>
	);
};

export default UpdateGameById;
