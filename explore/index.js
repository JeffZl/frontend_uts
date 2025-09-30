const suggestions = [
    {
        name: "Excell",
        handle: "@excell",
        avatar: "https://robohash.org/jane.png?size=50x50",
    },
    {
        name: "Thendy",
        handle: "@thendy",
        avatar: "https://robohash.org/mark.png?size=50x50",
    },
    {
        name: "Jeffly",
        handle: "@jeffly",
        avatar: "https://robohash.org/alice.png?size=50x50",
    },
    {
        name: "Andrean",
        handle: "@andrean",
        avatar: "https://robohash.org/magnamomnisdolorem.png?size=50x50&set=set1",
    },
    {
        name: "Viencent",
        handle: "@viencent",
        avatar: "https://robohash.org/fugitsitet.png?size=50x50&set=set1",
    },
]

const trending = [
    {
        topic: "Esports",
        title: "Valorant Champions",
        postCount: "12.3K posts"
    },
    {
        topic: "Music",
        title: "Taylor Swift",
        postCount: "89.1K posts"
    },
    {
        topic: "Technology",
        title: "AI Revolution",
        postCount: "45.7K posts"
    },
    {
        topic: "Movies",
        title: "Avengers Reboot",
        postCount: "23.4K posts"
    },
]

document.addEventListener("DOMContentLoaded", () => {
    const followList = document.getElementById("follow-list");
    const trendList = document.getElementById("trend-list");
    
    suggestions.map(user => {
        const div = document.createElement("div")
        div.classList.add("follow-card")

        div.innerHTML = `
            <img src="${user.avatar}" alt="${user.name}">
            <div class="info">
                <span class="name">${user.name}</span>
                <span class="handle">${user.handle}</span>
            </div>
            <button class="follow-btn">Follow</button>
        `

        followList.appendChild(div)
    })

    trending.map(data => {
        const div = document.createElement("div")

        div.classList.add("trend-item")

        div.innerHTML = `
            <span class="category">${data.topic} · Trending</span>
            <p class="title">${data.title}</p>
            <span class="count">${data.postCount}</span>
        `

        trendList.appendChild(div)
    })
})