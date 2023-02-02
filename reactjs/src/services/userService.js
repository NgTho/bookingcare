import axios from '../axios';
let handleLogin = (email, password) => {
    return axios.post('/api/login', { email: email, password: password });
}
let getUser = (id) => {
    return axios.get('/api/get-all-user', { id: id })
}
let createUser = (data) => {
    return axios.post('/api/create-user', data)
}
let deleteUser = (id) => {
    return axios.delete('/api/delete-user', { data: { id: id } })
}
let updateUser = (data) => {
    return axios.put('/api/edit-user', data)
}
let getAllcode = (type) => {
    return axios.get(`/api/allcode/${type}`)
}
let getRole = (roleId, limit) => {
    return axios.post('/api/get-role', { roleId: roleId, limit: limit })
}
let createMarkdown = (data) => {
    return axios.post('/api/create-markdown', data)
}
let getDetail = (id) => {
    return axios.get(`/api/get-detail/${id}`)
}
export { handleLogin, getUser, createUser, deleteUser, updateUser, getAllcode, getRole, createMarkdown, getDetail }