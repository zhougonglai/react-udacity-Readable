const api = "http://localhost:3001"
// Generate a unique token for storing your bookshelf data on the backend
// server.
let token = localStorage.token
if (!token) 
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () => 
    fetch(`${api}/categories`, {headers})
    .then(res => res.json())
    .then(data => data.categories)

export const getCategoryPosts = (category) =>
    fetch(`${api}/${category}/posts`, {headers})
    .then(res => res.json())

export const getPosts = () =>
    fetch(`${api}/posts`)
    .then(res => res.json())

export const createPosts = (posts) =>
    fetch(`${api}/posts`,{
      method: 'POST',
      headers,
      body: JSON.stringify({posts})
    }).then(res => res.json())

export const postsDetail = (id) =>
    fetch(`${api}/posts/${id}`)
    .then(res => res.json())

export const votingPosts = (id, option) =>
    fetch(`${api}/posts/${id}`,{
      method: 'POST',
      headers,
      body: JSON.stringify({id, option})
    }).then(res => res.json())

export const updatePosts = (id, body) =>
    fetch(`${api}/posts/${id}`,{
      method: 'PUT',
      headers,
      body: JSON.stringify({body})
    }).then(res => res.json())

export const deletePosts = (id) =>
    fetch(`${api}/posts/${id}`,{
      method: 'DELETE',
      headers
    }).then(res => res.json())

export const getComments = (id) =>
    fetch(`${api}/posts/${id}/comments`)
    .then(res => res.json())

export const addComment = (comment) =>
    fetch(`${api}/comments`,{
      method: 'POST',
      headers,
      body: JSON.stringify(comment)
    }).then(res => res.json())
  
export const commentDetail = (id) =>
    fetch(`${api}/comments/${id}`)
    .then(res => res.json())

export const votingComment = (id, option) =>
    fetch(`${api}/commments/${id}`,{
      method: 'POST',
      headers,
      body: JSON.stringify({option})
    }).then(res => res.json())

export const updateComment = (id, body) =>
    fetch(`${api}/comments/${id}`,{
      method: 'PUT',
      headers,
      body: JSON.stringify({body, timestamp: new Date()})
    }).then(res => res.json())

export const deleteComment = (id) =>
    fetch(`${api}/comments/${id}`,{
      method: 'DELETE',
      headers
    }).then(res => res.json())