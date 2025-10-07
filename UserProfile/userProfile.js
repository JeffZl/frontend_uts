//who to follow from dummy
document.addEventListener("DOMContentLoaded", () => {
    const followList = document.getElementById("follow-list");

    // Dummy data for "Who to follow"
    const suggestions = [
        {
        name: "Jane Doe",
        handle: "@janedoe",
        avatar: "https://robohash.org/jane.png?size=50x50",
        },
        {
        name: "Mark Smith",
        handle: "@marksmith",
        avatar: "https://robohash.org/mark.png?size=50x50",
        },
        {
        name: "Alice Johnson",
        handle: "@alicej",
        avatar: "https://robohash.org/alice.png?size=50x50",
        }
    ]

    suggestions.forEach(user => {
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

// userProfile.js

document.addEventListener('DOMContentLoaded', () => {
    //Redirect button Edit Profile
    const editButton = document.querySelector('.edit-btn');
    if (editButton) {
        editButton.addEventListener('click', () => {
            // Mengarahkan ke halaman EditProfile.html
            window.location.href = '/EditProfile/EditProfile.html'; 
        });
    }

});