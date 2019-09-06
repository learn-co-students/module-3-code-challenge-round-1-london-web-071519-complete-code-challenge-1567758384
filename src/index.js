// Sort the needed elements

  let imageId = 3394 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

//
const image = document.querySelector("#image")
const comments = document.querySelector("#comments")
const name = document.querySelector("#name")
const likes = document.querySelector("#likes")

//fetch the data
fetch(imageURL)
.then(resp => resp.json())
.then(json => renderPage(json))

// Render the page
const renderPage = json => {
  image.src = json.url
  name.innerText = json.name
  likes.innerText = json.like_count

  //Comments
  json.comments.forEach(comment => {
    
    let li = document.createElement('li') // Create new li tag to append to the ul
    li.innerText = comment.content
   // debugger
    comments.append(li)
  })
}

// Increase Likes
  const likeImage = () => {
    let span = document.getElementById('likes')
    //likes.parentNode.children[0]
    span.parentNode.children
    //debugger
    span.innerText ++
    // debugger

    fetch(likeURL, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'accept' : 'application/json'
      },
      body: JSON.stringify({image_id: imageId})
    })
    //debugger
    .then(resp => resp.json())
    
  }

// Submit Comments
  const submitComment = (e) => {
    e.preventDefault()
    let userComment = e.target[0].value
    // debugger
    fetch(commentsURL, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({image_id:imageId, content:userComment})
    })
    .then(resp => resp.json())
    .then(json => publishComment(e,json))
  }

// Publish Comments to Page
const publishComment = (e,json) => {
  console.log("OK")
  e.target[0].value = ""
  //debugger
  let newComment = document.createElement('li')
  newComment.innerText = json.content
  comments.append(newComment)
}


//Add Event Listeners
let like_btn = document.querySelector("#like_button").addEventListener("click",likeImage) 
let submit_btn = document.querySelector("#comment_form").addEventListener("submit",submitComment)

renderPage()
