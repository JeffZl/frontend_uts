document.addEventListener("DOMContentLoaded", () => {
  const notifications = [
    { id: 1, type: "message", content: "Kamu mendapat pesan baru dari Séréna", redirectId: 2, time: "2m ago", read: false },
    { id: 2, type: "message", content: "Lucie menanyakan tentang project kamu", redirectId: 5, time: "15m ago", read: false },
    { id: 3, type: "message", content: "Jean mengirimkan kamu pesan baru", redirectId: 3, time: "30m ago", read: false },
    { id: 4, type: "message", content: "Camille membalas pesan kamu", redirectId: 7, time: "1h ago", read: true },
    { id: 5, type: "birthday", content: "Hari ini ulang tahun Clémentine 🎉", redirectId: null, time: "3h ago", read: true },
    { id: 6, type: "message", content: "Thomas ingin berdiskusi di DM", redirectId: 8, time: "5h ago", read: false },
    { id: 7, type: "message", content: "Françoise membagikan file baru", redirectId: 1, time: "7h ago", read: true },
    { id: 8, type: "message", content: "Pierre menambahkan kamu ke grup diskusi", redirectId: 10, time: "10h ago", read: false },
    { id: 9, type: "message", content: "Chloé mengomentari pesan kamu", redirectId: 9, time: "12h ago", read: false },
    { id: 10, type: "birthday", content: "Hari ini ulang tahun Louise 🎂", redirectId: null, time: "1d ago", read: false },
    { id: 11, type: "message", content: "Arnaud mengirim tautan baru", redirectId: 6, time: "2d ago", read: false },
    { id: 12, type: "message", content: "Jules mengirimi kamu pesan motivasi 😄", redirectId: 11, time: "2d ago", read: true },
    { id: 13, type: "message", content: "Michel membagikan dokumen ke kamu", redirectId: 12, time: "3d ago", read: false },
    { id: 14, type: "message", content: "Sophie menandai kamu di pesan grup", redirectId: 13, time: "4d ago", read: false },
    { id: 15, type: "birthday", content: "Selamat ulang tahun untuk Alice 🎉", redirectId: null, time: "5d ago", read: true },
    { id: 16, type: "message", content: "Jules mengirim pesan follow-up", redirectId: 14, time: "1w ago", read: false },
    { id: 17, type: "message", content: "Pierre mengirim update jadwal meeting", redirectId: 15, time: "1w ago", read: true },
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

  window.openNotif = function(id) {
    const n = notifications.find(x => x.id === id);
    n.read = true;
    renderNotifications();

    if (n.type === "message" && n.redirectId) {
      window.location.href = `/messages/index.html?id=${n.redirectId}`;
    } else if (n.type === "birthday") {
      alert("🎂 Selamat ulang tahun untuk temanmu!");
    }
  };
});
