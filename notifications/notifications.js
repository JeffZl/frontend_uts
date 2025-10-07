const notifications = [
  { id: 1, type: "message", content: "Kamu mendapat pesan baru dari Séréna", redirectId: 2, time: "2m ago", read: false },
  { id: 2, type: "birthday", content: "Hari ini ulang tahun Clémentine 🎉", redirectId: null, time: "3h ago", read: true },
  { id: 3, type: "message", content: "Pesan baru dari Françoise", redirectId: 1, time: "1d ago", read: false },
];

const notifList = document.getElementById("notification-list");

function renderNotifications() {
  notifList.innerHTML = notifications.map(n => `
    <div class="notification ${n.read ? '' : 'unread'}" onclick="openNotif(${n.id})">
      <div class="notification-icon">
        ${n.type === "message" ? "💬" : "🎂"}
        ${!n.read ? '<span class="notif-dot"></span>' : ''}
      </div>
      <div class="notification-content">
        <div class="type">${n.type === "message" ? "Pesan Baru" : "Ulang Tahun"}</div>
        <div class="message">${n.content}</div>
        <div class="time">${n.time}</div>
      </div>
    </div>
  `).join("");
}

renderNotifications();

function openNotif(id) {
  const n = notifications.find(x => x.id === id);
  n.read = true;
  renderNotifications(); // re-render supaya berubah jadi “dibaca”

  if (n.type === "message" && n.redirectId) {
    window.location.href = `/messages/index.html?id=${n.redirectId}`;
  } else if (n.type === "birthday") {
    alert("🎂 Selamat ulang tahun untuk temanmu!");
  }
}
