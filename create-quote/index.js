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

document.addEventListener("DOMContentLoaded", () => {
    const followList = document.getElementById("follow-list");
    
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

const imageUpload = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');
const postBtn = document.getElementById('post-btn');

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
        imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
});

postBtn.addEventListener('click', () => {
    const quoteText = document.getElementById('quote-text').value.trim();
    if (!quoteText) {
        alert('Please write a quote before posting!');
        return;
    }
    alert('Quote posted successfully!');
});
