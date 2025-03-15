window.addEventListener('load',()=>{
    renderPhoto()
})

async function getRandomPhoto() {
    const apiKey = '3IHBwx4xSPkInsrX2YTQywLycTDvDyCEXsMfW5AUy1A'
    try{
        const response = await fetch(
            `https://api.unsplash.com/photos/randem?client_id=${apiKey}`
        )
        const photo = await response.json()
        return photo
    } catch(error){
        console.error('Error download photo:', error)
        return {}
    }
}

async function renderPhoto(){
    const photo = await getRandomPhoto()
    if(photo){
        const imageBox = document.querySelector('.image_box')
        const img = document.createElement('img')
        img.classList.add('image')

        img.src = photo.urls.small
        img.alt = photo.alt_description
        imageBox.appendChild(img)

        const cameraManName = document.querySelector(
            '.image_cameraMan-name'
        )
        cameraManName.textContent = `${photo.user.name}`

        const iamgelikesCounterSpan = document.querySelector(
            '.image_likes-counter'
        )
        iamgelikesCounterSpan.textContent = `${photo.likes}`
        }
}

const counterButton = document.querySelector('.image_likes-button')

counterButton.addEventListener('click', function(){
    increaseCounter()
})

function increaseCounter(){
    const likesCounter = document.querySelector('.image_likes-counter')
    const cameraManName = document.querySelector(
        '.image_cameraMan-name'
    )
    const name = cameraManName.textContent
    const currentCounter = parseInt(likesCounter.textContent, 10)
    likesCounter.textContent = currentCounter + 1
    counterButton.disabled = true
    localStorage.setItem(`${name}`, JSON.stringify('liked'))
}
const btnNext = document.querySelector('.next')
btnNext.addEventListener('click', ()=>{
    const cameraManName = document.querySelector(
        '.image_cameraMan-name'
    )
    const name = cameraManName.textContent
    Object.keys(localStorage).forEach((key) =>{
        if (key === name) {
            counterButton.disabled = true
        }
    })
    location.reload()
})