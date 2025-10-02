document.addEventListener('DOMContentLoaded', function() {
    const securityForm = document.getElementById('securityForm');

    securityForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 1. Ambil data yang sudah ada dari sessionStorage
        const userProgress = JSON.parse(sessionStorage.getItem('userProgress')) || {};

        // 2. Ambil dan tambahkan Frasa Pemulihan
        userProgress.recoveryPhrase = document.getElementById('recoveryPhrase').value.trim().toLowerCase();

        // Hapus properti lama jika ada (untuk kebersihan data)
        delete userProgress.securityQuestion;
        delete userProgress.securityAnswer;

        // 3. Simpan kembali semua data ke sessionStorage
        sessionStorage.setItem('userProgress', JSON.stringify(userProgress));

        // 4. Arahkan ke langkah berikutnya (halaman username)
        window.location.href = 'signup4.html';
    });
});