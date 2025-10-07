document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const notifToggle = document.getElementById("notifToggle");
  const addAccountBtn = document.getElementById("addAccountBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // === THEME SWITCH ===
  // Cek preferensi theme sebelumnya (dari localStorage)
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.checked = true;
  }

  // Event toggle theme
  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
  });

  // === NOTIFICATION SWITCH ===
  // Simpan status notifikasi di localStorage juga
  const savedNotif = localStorage.getItem("notifications");
  if (savedNotif === "off") {
    notifToggle.checked = false;
  }

  notifToggle.addEventListener("change", () => {
    const enabled = notifToggle.checked;
    localStorage.setItem("notifications", enabled ? "on" : "off");

    alert(enabled ? "🔔 Notifications enabled" : "🔕 Notifications disabled");
  });

  // === ADD ACCOUNT ===
  addAccountBtn.addEventListener("click", () => {
    window.location.href = "/LandingPage/landingpage.html"; 
    // ganti path di atas sesuai file landing page kamu
  });


  // === LOG OUT ===
  logoutBtn.addEventListener("click", () => {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Hapus data login simulasi
      localStorage.clear();
      window.location.href = "/LandingPage/landingpage.html";
    }
  });
});
