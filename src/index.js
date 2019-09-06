document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  init()
})
const init = () => getData().then(renderPage).then(delEvents)

const imageId = 3388 // Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = 'https://randopic.herokuapp.com/likes/'
const commentsURL = 'https://randopic.herokuapp.com/comments/'

const imageEl = document.querySelector('img')
const nameEl = document.querySelector('h4#name')
const likesEl = document.querySelector('span#likes')
const likeBtn = document.querySelector('button#like_button')
const formEl = document.querySelector('form#comment_form')
const commentsEl = document.querySelector('ul#comments')

// const renderPage

const getData = () => fetch(imageURL).then(response => response.json())

const renderPage = (data) => {
  imageEl.src = data.url
  nameEl.innerText = data.name
  likesEl.innerText = data.like_count
  commentsEl.innerHTML = data.comments.map(comment => `<li>${comment.content + ' '}<button id="del-btn" data-id="${comment.id}">x</button></li>`).join('')
}

likeBtn.addEventListener('click', (ev) => addLikes())

const addLikes = () => {
  return fetch(likeURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId
    })
  })
    .then(response => response.json()).then(init)
}

formEl.addEventListener('submit', (ev) => {
  ev.preventDefault()
  addComment(ev.target.comment.value)
})

const addComment = (comment) => {
  return fetch(commentsURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: comment
    })
  })
    .then(response => response.json()).then(init)
}

const delEvents = () => document.querySelectorAll('li button').forEach(btn => btn.addEventListener('click', (ev) => {
  delComment(ev.target.dataset.id)
  ev.target.parentNode.remove()
}))

const delComment = (commentId) => fetch(commentsURL + commentId, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})
