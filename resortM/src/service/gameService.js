import axios from 'axios';

const API_URL = 'http://localhost:5003';

async function addGame(data) {
    return await axios.post(API_URL + '/game/addGame', data)
}


async function getAllGames() {
    return await axios.get(API_URL + '/game/getAllGames')
}

async function getGame() {
    return await axios.get(API_URL + '/game/getGame')
}

async function getAvailableGames(id) {
    return await axios.get(API_URL + `/game/getGame/${id}`);
}


async function editGame(formData) {
    const gameId = formData._id;
    return await axios.put(API_URL + `/game/editGame/${gameId}`, formData)
}

async function deleteGame(gameId) {
    return await axios.delete(API_URL + `/game/deleteGame/${gameId}`)
}



// async function complaintStatus(_id) {
//     return await axios.get(API_URL + `/complaint/status/${_id}`, {
//         params: {
//             _id:_id
//         },
//         headers: {'authorization': 'Bearer ' + localStorage.getItem("token")}
//     })
// }


export {
    addGame, getGame, editGame,deleteGame,getAvailableGames,getAllGames
}