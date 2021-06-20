import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UpdateNameById = (props) => {

	function updateNameById() {
		let gameId = prompt('Podaj id gry:');
		if (gameId == null) { return };
    let gameName = prompt('Podaj nową nazwe gry:');
    if (gameName.length == 0) { return };
		axios.put(`/api/game/${gameId}`, {
      name: gameName
    })
			.then(response => response)
			.catch(error => console.log(error));
	}

	return (
		<>
			<div>
				<button onClick={updateNameById}>Aktualizuj nazwę (po id)</button>
			</div>
		</>
	);
};

export default UpdateNameById;
