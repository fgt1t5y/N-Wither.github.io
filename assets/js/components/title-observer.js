let toTop = document.createElement('div')
let toTopButton = document.createElement('button')
toTopButton.innerHTML = '▲'
toTop.appendChild(toTopButton)
toTop.classList.add('float-div')
toTop.id = 'to-top'
toTop.style.position = 'fixed'
toTop.style.right = '20px'
toTop.style.bottom = '20px'
toTop.style.zIndex = '99'
toTopButton.classList.add('menu-button')
toTopButton.addEventListener('click', () => {
    window.scrollTo(0, 0)
})
document.body.appendChild(toTop)
toTop.style.display = 'none'

let titleObserver = new IntersectionObserver(entries => {
    if(entries[0].intersectionRatio <= 0){
        document.querySelector('.page-header .page-title').style.opacity = 1
        toTop.style.display = 'block'
        toTop.classList.remove('ani__hide')
    }else{
        document.querySelector('.page-header .page-title').style.opacity = 0
        toTop.classList.add('ani__hide')
        setTimeout(() => {toTop.style.display = 'none'}, 400)
    }
})

titleObserver.observe(document.querySelector('.page-content .page-title'))