import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDatabase } from "../hooks/Database";
import Loading from "./Loading";
import { FaTrashAlt, FaPlus } from "react-icons/fa";

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
      alert("Select a friend to delete.");
      return;
    }
    try {
      await deletePlayerFriend(props.id,selectedPlayerFriend);
      setSelectedPlayerFriend(null);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting friend:", error);
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
      alert("Please select a friend.");
      return;
    }
    const selectedFriendId = parseInt(selectedFriend);
    const existingFriend = playerFriends.map(friend => friend.id).includes(selectedFriendId);

    if (existingFriend) {
      alert("This friend is already in the players list.");
      return;
    }

    try {
      await addPlayerFriend(props.id, selectedFriend);
      // alert("Friend added successfully to the board game.");
      // window.location.reload();
      const updatedPlayerFriends = await getPlayerFriends(props.id);
      setPlayerFriends(updatedPlayerFriends.friends);
    } catch (error) {
      console.error("Error adding friend to the board game:", error);
    }
  };

  if (loading) {
    return (
      <Loading source="DetailsPage"/>
    );
  }
  

  return (
    
    <div className="bg-orange-300 border border-gray-300 rounded-lg shadow p-6">
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
      className="flex items-center w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
      onClick={handleAddFriendToGame}
    >
      <FaPlus className="mr-2" />
      Add friend to game
    </button>

    <div className="mt-8">
      <h1 className="text-xl font-semibold mb-4">Players list</h1>
     <ul className="mb-4">
  {Object.values(playerFriends).map((playerFriend) => (
    <li
      key={playerFriend.id}
      className={`py-2 mt-1 px-4 border bg-orange-200 border-orange-400 hover:bg-orange-400 hover:text-white text-center rounded-md cursor-pointer transition-colors duration-300 ${
        playerFriend.id === selectedPlayerFriend ? "text-white bg-orange-400" : "text-gray-800 hover:bg-orange-200"
      }`}
      onClick={() => handlePlayerFriendClick(playerFriend.id)}
    >
      {playerFriend.name}
    </li>
  ))}
</ul>

      <button
  className=" mt-4 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 flex items-center"
  onClick={handleDeletePlayerFriend}
>
  <FaTrashAlt className="mr-2" />
  Delete selected player
</button>
    </div>
  </div>
        
  );
};

export default FriendDetails;
