const burger = document.querySelector('.menu__burger')
const body = document.body

burger.addEventListener('click', () => {
    burger.parentElement.classList.toggle('active')
    body.classList.toggle('lock')
})

const animItems = document.querySelectorAll('.scroll-anim');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('scroll-anim')
            observer.unobserve(entry.target);
        } else {
            entry.target.classList.add('scroll-anim')
        }
    })
}, {
    threshold: 0.25
    })

animItems.forEach(item => {
    observer.observe(item)
})

let nextPage = 2;

const infiniteObserver = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        loadPosts(nextPage++)
    }
})

const loadPosts = (page = 1) => {
    fetch(`https://jsonplaceholder.typicode.com/photos?_limit=5&_page=${page}`)
    .then(res => res.json())
    .then(posts => {
        posts.forEach(post => {
            const card = document.createElement('div');
            const title = document.createElement('h2');
            const img = document.createElement('img');
            const subImg = document.createElement('img');
            title.textContent = post.title;
            img.src = post.thumbnailUrl;
            card.classList.add('card');
            card.append(title,img);
            document.body.append(card);
        })
        const lastCard = document.querySelector('.card:last-child');
        if (lastCard) {
            infiniteObserver.observe(lastCard);
        }
    })
    .catch(console.error)
}
loadPosts()