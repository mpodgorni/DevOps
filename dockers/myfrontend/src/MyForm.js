import React, {useState, useEffect} from 'react';
import axios from 'axios';

const MyForm = (props) => {

	const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = (event) => {
        console.log(`Dane do wysłania ${title} ${body}`);

        axios.post('https://jsonplaceholder.typicode.com/posts', {
            title: title,
            body: body,
            userId: 2
            })
			.then(function (response) {
                console.log(response);
            })
			.catch(function (error) { 
                console.log(error);
            });

        event.preventDefault();
    };

    return (
        <>
            <input type='text' value={title} onChange={event => setTitle(event.target.value)} />
            <input type='text' value={body} onChange={event => setBody(event.target.value)} />

            <input type='submit' value='OK' onClick={handleSubmit} />
        </>
    );

};

export default MyForm;