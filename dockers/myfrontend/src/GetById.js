import React, {useState, useEffect} from 'react';
import axios from 'axios';

const GetById = (props) => {

	function getGameById() {
		let gameId = parseInt(prompt('Podaj id gry:'));
		if (gameId == null) { return; }
		if (isNaN(Number(gameId))) { alert(`Podana wartość ${gameId} nie jest liczbą całkowitą dodatnią.`); return; }
		axios.get(`/api/game/${gameId}`)
			.then(response => response)
			.then(data => props.handlerParentChange(data.data.data))
			.catch(error => console.log(error));
	};

	return (
		<>
			<div>
				<button onClick={getGameById}>Znajdź grę (po id)</button>
			</div>
		</>
	);
};

export default GetById;