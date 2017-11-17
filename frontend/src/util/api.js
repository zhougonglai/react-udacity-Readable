const api = process.env.NODE_ENV !== 'production' ? "http://localhost:3001" : '';
// Generate a unique token for storing your bookshelf data on the backend
// server.
let token = localStorage.token
if (!token) 
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': token
}
/**
 * 获取所有类型
 * @returns posts
 */
export const getCategories = () => 
    fetch(`${api}/categories`, {headers})
    .then(res => res.json())
    .then(data => data.categories)

/**
 * 获取类型 下的所有帖子
 * @param {string} category
 * @return posts
 */
export const getCategoryPosts = (category) =>
    fetch(`${api}/${category}/posts`, {headers})
    .then(res => res.json())
/**
 * 获取所有的帖子
 * @returns posts
 */
export const getPosts = () =>
    fetch(`${api}/posts`, {headers})
    .then(res => res.json())
/**
 * 发帖
 * id: uuid
 * timestamp: Date.now()
 * title: string
 * body: string,
 * author: string enum {thingone, thingtwo}
 * category: enum {...categorys}
 * @param {obj} post
 * @returns post
 */
export const createPost = (post) =>
    fetch(`${api}/posts`,{
      method: 'POST',
      headers,
      body: JSON.stringify({...post,timestamp: Date.now(),id: Math.random().toString(36).substr(-8)})
    }).then(res => res.json())

/**
 * 帖子详情
 * @param {uuid} id
 * @returns post
 */
export const postsDetail = (id) =>
    fetch(`${api}/posts/${id}`, {headers})
    .then(res => res.json())

/**
 * 投票
 * option: {upVote, downVote}
 * @param {uuid} id 
 * @param {enum} option 
 * @returns newPost
 */
export const votingPost = (id, option) =>
    fetch(`${api}/posts/${id}`,{
      method: 'POST',
      headers,
      body: JSON.stringify({option})
    }).then(res => res.json())
/**
 * 修改帖子
 * body:{
 *  title: string,
 *  body: string
 * }
 * @param {uuid} id 
 * @param {obj} body 
 */
export const updatePost = (id, body) =>
    fetch(`${api}/posts/${id}`,{
      method: 'PUT',
      headers,
      body: JSON.stringify({...body})
    }).then(res => res.json())

/**
 * 删除帖子
 * @param {uuid} id 
 */
export const deletePosts = (id) =>
    fetch(`${api}/posts/${id}`,{
      method: 'DELETE',
      headers
    }).then(res => res.json())

/**
 * 获取帖子的评论
 * @param {uuid} id 
 */
export const getComments = (id) =>
    fetch(`${api}/posts/${id}/comments`, {headers})
    .then(res => res.json())

/**
 * comment:{
 * id: uuid
 * timestamp: Date.now(),
 * - body: string,
 * - author: string,
 * - parentId: post.id
 * }
 * @param {obj} comment 
 */
export const addComment = (comment) =>
    fetch(`${api}/comments`,{
      method: 'POST',
      headers,
      body: JSON.stringify({...comment,timestamp: Date.now(), id: Math.random().toString(36).substr(-8)})
    }).then(res => res.json())
  
/**
 * 评论详情
 * @param {uuid} id 
 */
export const commentDetail = (id) =>
    fetch(`${api}/comments/${id}`, {headers})
    .then(res => res.json())

/**
 * 给评论投票
 * option enum:{same the post}
 * @param {uuid} id 
 * @param {string} option 
 */
export const votingComment = (id, option) =>
    fetch(`${api}/comments/${id}`,{
      method: 'POST',
      headers,
      body: JSON.stringify({option})
    }).then(res => res.json())

/**
 * 编辑评论
 * @param {uuid} id 
 * @param {string} body
 */
export const updateComment = (id, body) =>
    fetch(`${api}/comments/${id}`,{
      method: 'PUT',
      headers,
      body: JSON.stringify({...body, timestamp: Date.now()})
    }).then(res => res.json())

    /**
     * 删除评论
     * @param {uuid} id 
     */
export const deleteComment = (id) =>
    fetch(`${api}/comments/${id}`,{
      method: 'DELETE',
      headers
    }).then(res => res.json())