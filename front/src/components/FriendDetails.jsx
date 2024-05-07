import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDatabase } from "../hooks/Database";
import Loading from "./Loading";

const FriendDetails = (props) => {
  const { getFriends, addPlayerFriend, getPlayerFriends, deletePlayerFriend } =
    useDatabase();
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState();
  const [playerFriends, setPlayerFriends] = useState([]);
  const [selectedPlayerFriend, setSelectedPlayerFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAllFriends = async () => {
      const data = await getFriends();
      setFriends(data.friends);
      setLoading(false);

    };
    getAllFriends();

  }, []);
  const handleFriendChange = (e) => {
    setSelectedFriend(e.target.value);
  };

  const handlePlayerFriendClick = (friendId) => {
    setSelectedPlayerFriend(friendId);
  };
  const handleDeletePlayerFriend = async () => {
    if (!selectedPlayerFriend) {
      alert("Selecciona un amigo para eliminarlo.");
      return;
    }
    try {
      await deletePlayerFriend(props.id,selectedPlayerFriend);
      setSelectedPlayerFriend(null);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar amigo:", error);
    }
  };

  useEffect(() => {
    const getPlayerFriendsData = async () => {
      const data = await getPlayerFriends(props.id);
      setPlayerFriends(data.friends);
    };
    getPlayerFriendsData();
  }, [props.id]);

  const handleAddFriendToGame = async () => {
    if (!selectedFriend) {
      alert("Por favor, selecciona un amigo.");
      return;
    }
    const selectedFriendId = parseInt(selectedFriend);
    const existingFriend = playerFriends.map(friend => friend.id).includes(selectedFriendId);

    if (existingFriend) {
      alert("Este amigo ya esta en la lista de jugadores");
      return;
    }

    try {
      await addPlayerFriend(props.id, selectedFriend);
      alert("Amigo añadido correctamente al juego de mesa.");
      // window.location.reload();
      const updatedPlayerFriends = await getPlayerFriends(props.id);
      setPlayerFriends(updatedPlayerFriends.friends);
    } catch (error) {
      console.error("Error al añadir amigo al juego de mesa:", error);
    }
  };

  if (loading) {
    return (
      <Loading source="DetailsPage"/>
    );
  }
  

  return (
    
    <div className="bg-orange-200 border border-gray-300 rounded-lg shadow p-6">
    <h1 className="text-xl font-semibold mb-4 text-center">Friends list</h1>
    <select
      className="block w-full p-2 border border-gray-300 rounded-md mb-4"
      value={selectedFriend}
      onChange={handleFriendChange}
    >
      <option value="">Select a friend</option>
      {friends.map((friend) => (
        <option key={friend.id} value={friend.id}>
          {friend.name}
        </option>
      ))}
    </select>

    <button
      className="block w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      onClick={handleAddFriendToGame}
    >
      Add friend to game
    </button>

    <div className="mt-8">
      <h1 className="text-xl font-semibold mb-4">Players list</h1>
      <ul>
        {Object.values(playerFriends).map((playerFriend) => (
          <li
            key={playerFriend.id}
            className={`cursor-pointer mb-2 ${
              playerFriend.id === selectedPlayerFriend ? "text-blue-500 font-semibold" : ""
            }`}
            onClick={() => handlePlayerFriendClick(playerFriend.id)}
          >
            {playerFriend.name}
          </li>
        ))}
      </ul>

      <button
        className="block mt-4 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        onClick={handleDeletePlayerFriend}
      >
        Delete selected player
      </button>
    </div>
  </div>
        
  );
};

export default FriendDetails;
