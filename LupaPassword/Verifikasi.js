document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('verifyForm');
    const phraseInput = document.getElementById('recoveryPhrase');
    const promptText = document.getElementById('promptText');

    // 1. Ambil username yang akan direset dari sessionStorage
    const usernameToReset = sessionStorage.getItem('userToReset');

    // Jika tidak ada username (misal: pengguna akses halaman ini langsung), kembalikan ke awal
    if (!usernameToReset) {
        alert('Sesi tidak valid. Silakan mulai lagi dari halaman Lupa Password.');
        window.location.href = 'Lupa.html';
        return;
    }

    // 2. Cari data lengkap pengguna dari localStorage
    const users = JSON.parse(localStorage.getItem('socialMediaUsers')) || [];
    const user = users.find(u => u.username === usernameToReset);

    // Jika karena suatu alasan pengguna tidak ditemukan
    if (!user) {
        alert('Data pengguna tidak ditemukan. Silakan mulai lagi.');
        window.location.href = 'Lupa.html';
        return;
    }
    
    // (Opsional) Memberi petunjuk yang lebih personal
    promptText.textContent = `Masukkan 2 kata rahasia untuk akun "${user.username}"`;

    // 3. Tambahkan event listener untuk form verifikasi
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const enteredPhrase = phraseInput.value.trim().toLowerCase();

        // 4. Bandingkan frasa yang dimasukkan dengan yang tersimpan
        if (enteredPhrase === user.recoveryPhrase) {
            // Jika cocok, lanjutkan ke halaman reset password
            alert('Verifikasi berhasil! Silakan buat password baru Anda.');
            window.location.href = 'ResetPassword.html'; // Halaman yang akan kita buat selanjutnya
        } else {
            // Jika tidak cocok, beri tahu pengguna
            alert('Frasa pemulihan salah. Silakan coba lagi.');
            phraseInput.focus(); // Fokuskan kembali ke input
        }
    });
});