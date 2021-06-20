import React, {useState, useEffect} from 'react';
import axios from 'axios';

const DeleteById = (props) => {

	function deleteGameById() {
		let gameId = parseInt(prompt('Podaj id gry:'));
		if (gameId == null) { return; }
		if (isNaN(Number(gameId))) { alert(`Podana wartość ${gameId} nie jest liczbą całkowitą dodatnią.`); return; }
		axios.delete(`/api/game/${gameId}`)
			.then(response => response)
			.catch(error => console.log(error));
	}

	return (
		<>
			<div>
				<button onClick={deleteGameById}>Usuń gre (po id)</button>
			</div>
		</>
	);
};

export default DeleteById;