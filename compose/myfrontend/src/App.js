import React, {useState, useEffect} from 'react';
function App() {
  const [games, setGames] = useState(null);
  
  useEffect(() => {
    getGames();
  }, []);

  function getGames() {
    fetch('http://localhost:9090/games')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setGames(data);
      });
  }

  function getGame() {
    let id = prompt('Podaj id gry:');
    fetch(`http://localhost:9090/game/${id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setGames(data.data);
      });
  }

  function addGame() {
    let name = prompt('Podaj nazwę gry:');
    let price = prompt('Podaj cenę gry:');
    fetch('http://localhost:9090/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, price}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getGames();
      });
  }

  function deleteGame() {
    let id = prompt('Usuń grę o id:');
    fetch(`http://localhost:9090/game/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getGames();
      });
  }

  return (
    <div>
      <h1>GRY</h1>
      <table>
      <thead>
      <tr><th>Id</th><th>Nazwa</th><th>Cena</th></tr>
      </thead>
      <tbody>
      {games ? games.map( game => (<tr key={game.id} align='center'><td>{game.id}</td><td>{game.name}</td><td>{game.price}</td></tr>) ) : <tr><td>Brak gier/gry w bazie.</td></tr>}
      </tbody>
      </table>
      <br /><br />
      <button onClick={getGames}>Wszystkie gry</button>
      <button onClick={getGame}>Znajdź grę</button>
      <button onClick={addGame}>Dodaj grę</button>
      <button onClick={deleteGame}>Usuń grę</button>
    </div>
  );
}
export default App;