import React, {useState, useEffect} from 'react';
import axios from 'axios';

const GetAll = (props) => {

	function getAllGames() {
		axios.get('http://localhost:9090/games')
			.then(response => response)
			.then(data => props.handlerParentChange(data.data))
			.catch(error => console.log(error));
	}

	return (
		<>
			<div>
				<button onClick={getAllGames}>Wszystkie gry</button>
			</div>
		</>
	);
};

export default GetAll;