import React, {useState, useEffect} from 'react';
import axios from 'axios';

const GetById = (props) => {

	function getGameById() {
		let gameId = prompt('Podaj id gry:');
		if (gameId == null) { return };
		axios.get(`http://localhost:9090/game/${gameId}`)
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