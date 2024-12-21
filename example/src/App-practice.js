import logo from './logo.svg';
import './App.css';

const friends = [
  {id: 1234, name: "Adam", description: "Always early, and is pretty cool", comment: "first friend", ditched: false},
  {id: 11, name: "Ben", description: "Good friend but sometimes a little bit dirty", comment: "second friend", ditched: false},
  {id: 23, name: "Carl", description: "My personal assistant, always there to remind me things", comment: "third friend", ditched: true},
  {id: 325, name: "Drake", description: "Meh, into reptiles. Has a lizard or snake I think.", comment: "fourth friend", ditched: false}
];

function App() {
  return (
    <div className="container">
      <h1 className="my-4">Friends</h1>  

      <div className="row">
      {friends.map(friend =>

        <div key = {friend.id} className ="card m-2 w-25">
          <div className="card-body">
            <h5 className={`card-title ${friend.ditched ? 'text-danger' : ''}`}>
                {friend.name}
              </h5>
            <h6 className="card-subtitle mb-2 text-muted">{friend.comment}</h6>
            <p className="card-text">{friend.description}</p>
            {friend.ditched ? (
                <span></span>
              ) : (
                <button className="btn btn-danger">Ditch</button>
              )}

          </div>
        </div>
      )}
      </div>

    </div>
  );
}

export default App;
