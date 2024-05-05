import React, { useState, useEffect } from "react";
import { useDatabase } from "../hooks/Database";
const FriendsPage = () => {
const { addFriend, getFriends,deleteFriend } = useDatabase();
  const [friendName, setFriendName] = useState('');
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  useEffect(() => {

    const getAllFriends = async function () {
      const data = await getFriends();
      // console.log(data.boardgame_ids);
      setFriends(data.friends);
    }
  getAllFriends();
  
  }, []);


  const handleSubmit = async (e) => {
      e.preventDefault();
    //   setFriends([...friends, friendName]);
    await addFriend(friendName);
      setFriendName(''); 
      window.location.reload();
      
  };
  const handleFriendClick = (friendId) => {
    setSelectedFriend(friendId);
  };

  const handleDeleteFriend = async () => {
    if (!selectedFriend) {
      alert("Selecciona un amigo para eliminarlo.");
      return;
    }
    try {
      await deleteFriend(selectedFriend);
      setSelectedFriend(null);
      window.location.reload();

    } catch (error) {
      console.error("Error al eliminar amigo:", error);
    }
  };

  return (
      <div>
          <h1>Lista de Amigos</h1>
          <ul>
        {Object.values(friends).map((friend) => (
          <li
            key={friend.id}
            style={{ color: friend.id === selectedFriend ? "blue" : "black" }}
            onClick={() => handleFriendClick(friend.id)}
          >
            {friend.name}
            
          </li>
        ))}
      </ul>
      <button onClick={handleDeleteFriend}>Eliminar Amigo Seleccionado</button>
          <h2>Agregar Nuevo Amigo</h2>
          <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  placeholder="Nombre del amigo"
              />
              <button type="submit">Agregar Amigo</button>
          </form>
      </div>
  );
}
export default FriendsPage;
