document.addEventListener("DOMContentLoaded", () => {
    const followList = document.getElementById("follow-list");

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
})
