import axios from 'axios'
import authHeader from './auth-header'
const url = `${process.env.REACT_APP_BACKURL}/event`
const loginURL = `${process.env.REACT_APP_BACKURL}/user/login`
const registerURL = `${process.env.REACT_APP_BACKURL}/user/register`
const config = {headers: authHeader()}
export const fetchEvents = () => axios.get(url)
export const deleteEvent = (id) => axios.delete(`${url}/${id}`)

export const signIn = (formData) => axios.post(loginURL, formData)
export const signUp = (formData) => axios.post(registerURL, formData)

export const getEvent = (id) => axios.get(`${url}/${id}`)

export const createEvent = (formData,roomName,roomUsers) => {
  axios.post(`${process.env.REACT_APP_BACKURL}/event/createEvent`,formData,config).then((res)=>{axios.post(`${process.env.REACT_APP_BACKURL}/api/chat/group/${roomUsers[0]}`,{name:roomName,users:roomUsers,eventId:res.data._id}).then((resChat)=>{axios.patch(`${process.env.REACT_APP_BACKURL}/event/${res.data._id}`,{chat:resChat.data._id})})})
}

export const payRequest = (amount) =>
  axios.post(`${process.env.REACT_APP_BACKURL}//pay`, amount)

export const fetchQuizzs = () => axios.get(`${process.env.REACT_APP_BACKURL}/quiz`)

export const contactUs = async (fd) =>
  await axios.post(`${process.env.REACT_APP_BACKURL}/contactUs`, fd)

export const createRes = (userId, eventId, nbPlace) => {
  axios.post(
    `${process.env.REACT_APP_BACKURL}/res/createReservation/${eventId}/${userId}`,
    { nombre_de_place: nbPlace }
  )
  //console.log(nbPlace)
}

export const updateUser = (formData, userId) =>{
  axios.patch(`${process.env.REACT_APP_BACKURL}/user/updateUser/${userId}`, formData)}

export const getAllUsersChats = async(userId) => await axios.get(`${process.env.REACT_APP_BACKURL}/api/chat/6348964ede420574b1c0a366`)

export const getUsers =()=>{ axios.get(`${process.env.REACT_APP_BACKURL}/user/getUsers`,config)}
