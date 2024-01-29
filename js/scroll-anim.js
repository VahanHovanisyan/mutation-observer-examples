const burger = document.querySelector('.menu__burger')
const body = document.body



burger.addEventListener('click', () => {
    burger.parentElement.classList.toggle('active')
    body.classList.toggle('lock')
})

const animItems = document.querySelectorAll('.scroll-anim');

const animObserver = new IntersectionObserver((entries, observer) => {
    console.log(entries);
    console.log(observer);
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('scroll-anim')
            // observer.unobserve(entry.target);
        } else {
            entry.target.classList.add('scroll-anim')
        }
    })
}, {
    rootMargin:'0px 0px 100px 0px'
    })

animItems.forEach(item => {
    animObserver.observe(item)
})
