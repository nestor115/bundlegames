import React, { useState, useEffect } from "react";
import { useDatabase } from "../hooks/Database";
import Layout from "../components/Layout";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import Loading from "../components/Loading";

const FriendsPage = () => {
  const { addFriend, getFriends, deleteFriend } = useDatabase();
  const [friendName, setFriendName] = useState("");
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAllFriends = async function () {
      const data = await getFriends();
      setFriends(data.friends);
      setLoading(false);
    };
    getAllFriends();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const existingFriend = friends.find((friend) => friend.name === friendName);
    if (existingFriend) {
      alert("Este amigo ya está en la lista.");
      return;
    }
    await addFriend(friendName);
    setFriendName("");
    window.location.reload();
  };
  const handleFriendClick = (friendId) => {
    setSelectedFriend(friendId);
  };

  const handleDeleteFriend = async () => {
    if (!selectedFriend) {
      alert("Select a friend to remove.");
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
    <Layout showButtons={true}>
      <div className=" p-4">
        <h1 className="text-2xl mb-4">Friends list</h1>
        {loading ? ( // Muestra el indicador de carga mientras `loading` sea true
          <Loading source="FriendsPage"/>
        ) : (
          <div className=" max-w-xs">
            <ul className="mb-4">
              {Object.values(friends).map((friend) => (
                <li
                  key={friend.id}
                  className={`py-2 px-4 mt-2 border bg-orange-100 border-orange-400 hover:bg-orange-400 hover:text-white  text-center rounded-md cursor-pointer transition-colors duration-300 ${
                    friend.id === selectedFriend
                      ? "text-white bg-orange-400 "
                      : "text-gray-800 hover:bg-orange-200"
                  }`}
                  onClick={() => handleFriendClick(friend.id)}
                >
                  {friend.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg flex items-center"
          onClick={handleDeleteFriend}
        >
          <FaTrashAlt className="mr-2" />
          Delete selected friend
        </button>

        <h2 className="text-lg mb-2">Add new friend</h2>
        <form onSubmit={handleSubmit} className="flex items-center mb-4">
          <input
            type="text"
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
            placeholder="Friend name"
            className="mr-2 px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg flex items-center"
          >
            <FaPlus className="mr-2" />
            Add friend
          </button>
        </form>
      </div>
    </Layout>
  );
};
export default FriendsPage;
