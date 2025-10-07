let conversations = [];
let currentChat = null;

async function loadConversations() {
    const res = await fetch("data.json");
    conversations = await res.json();

    const dmList = document.getElementById("dm-list");
    dmList.innerHTML = conversations.map(conv => `
        <div class="conversation" onclick="openChat(${conv.id})">
            <img src="${conv.avatar}" alt="${conv.name}">
            <div class="details">
                <div class="name">${conv.name}</div>
                <div class="lastMessage">${conv.lastMessage}</div>
            </div>
        </div>
    `).join("");
}

function openChat(id) {
    currentChat = conversations.find(c => c.id === id);
    if (window.innerWidth <= 768) {
        document.body.classList.add("mobile-chat-active");
        document.getElementById("chat-header").innerHTML = `<button id="backBtn" style="margin-right: 10px;">← Back</button> <br> ${currentChat.name} ${currentChat.handle}`;
    } else {
        document.getElementById("chat-header").innerHTML = `${currentChat.name} ${currentChat.handle}`;
    }
    

    const chatMessages = document.getElementById("chat-messages");
    chatMessages.innerHTML = currentChat.messages.map(msg => `
        <div class="message ${msg.from === 'Me' ? 'me' : 'other'}">
            ${msg.text}
        </div>
    `).join("");

    const backBtn = document.getElementById("backBtn");
    backBtn.addEventListener("click", () => {
        document.body.classList.remove("mobile-chat-active");
    });
}


document.getElementById("sendBtn").addEventListener("click", () => {
    const input = document.getElementById("messageInput");
    const text = input.value.trim();
    if (!text || !currentChat) return;

    currentChat.messages.push({ from: "Me", text, time: new Date().toLocaleTimeString() });
    input.value = "";
    openChat(currentChat.id);
});

loadConversations();

