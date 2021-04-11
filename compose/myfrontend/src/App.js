import React, {useState, useEffect} from 'react';
//import Post from './Post.js';
//import MyForm from './MyForm.js';

import GetAll from './GetAll.js';
import GetById from './GetById.js';
import AddGame from './AddGame.js';
import DeleteById from './DeleteById.js';

function App() {

  const [games, setGames] = useState(null);

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <h1>•GRY•</h1>
      <table>
        <thead>
          <tr><th>Id</th><th>Nazwa</th><th>Cena</th></tr>
        </thead>
        <tbody>
          {games 
            ? games.map( game => (<tr key={game.id} align='center'><td>{game.id}</td><td>{game.name}</td><td>{game.price}</td></tr>) ) 
            : <tr><td colSpan='3'>Brak gier w bazie.</td></tr>}
        </tbody>
      </table>
      <br /><br />
      <GetAll handlerParentChange={setGames} />
      <GetById handlerParentChange={setGames} />
      <AddGame handlerParentChange={setGames} />
      <DeleteById handlerParentChange={setGames} />
    </div>
  );

}

export default App;