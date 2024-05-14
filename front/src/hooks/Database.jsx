import axios from "../lib/axios";

export const useDatabase = () => {
  const getBoardgamesIds = async () => {
    return axios
      .get("/user/boardgames")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const addBoardgame = async (boardgameId) => {
    return axios

      .post(`/user/newboardgame/${boardgameId}`)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const deleteBoardgame = async (boardgameId) => {
    return axios

      .post(`/user/deleteboardgame/${boardgameId}`)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const addFriend = async (friendName) => {
    return axios

      .post(`/user/addfriend/${friendName}`)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const getFriends = async () => {
    return axios
      .get("/user/friends")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const deleteFriend = async (friendId) => {
    return axios

      .post(`/user/deletefriend/${friendId}`)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const addPlayerFriend = async (boardgameId, friendId) => {
    return axios

      .post(`/user/addplayerfriend/${boardgameId}/${friendId}`)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const getPlayerFriends = async (boardgameId) => {
    return axios
      .get(`/user/playerfriends/${boardgameId}`)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const deletePlayerFriend = async (boardgameId, friendId) => {
    return axios

      .post(`/user/deleteplayerfriend/${boardgameId}/${friendId}`)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  return {
    getBoardgamesIds,
    addBoardgame,
    deleteBoardgame,
    addFriend,
    getFriends,
    deleteFriend,
    addPlayerFriend,
    getPlayerFriends,
    deletePlayerFriend,
  };
};
