import React, {useState, useEffect} from 'react';
import axios from 'axios';

const DeleteById = (props) => {

	function deleteGameById() {
		let gameId = prompt('Podaj id gry:');
		if (gameId == null) { return };
		axios.delete(`http://localhost:9090/game/${gameId}`)
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