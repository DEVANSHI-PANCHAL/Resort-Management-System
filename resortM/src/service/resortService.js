import axios from 'axios';

const API_URL = 'http://localhost:5003';

async function addResort(data) {
    return await axios.post(API_URL + '/resort/addResort', data)
}

async function getResort() {
    return await axios.get(API_URL + '/resort/getResort')
}
async function getAvailableResort() {
    return await axios.get(API_URL + '/resort/getAvailableResort')
}


async function editResort(formData) {
    const userId = formData._id;
    return await axios.put(API_URL + `/resort/editResort/${userId}`, formData)
}

async function deleteResort(resortId) {
    return await axios.delete(API_URL + `/resort/deleteResort/${resortId}`)
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
    addResort, editResort, getResort,deleteResort,getAvailableResort
}