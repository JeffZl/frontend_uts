document.addEventListener('DOMContentLoaded', function() {
    // --- Mengambil elemen yang dibutuhkan ---
    const loginForm = document.getElementById('loginForm');
    const credentialInput = document.getElementById('credential');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const errorMessage = document.getElementById('errorMessage');

    // --- IKON MATA ---
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('show');
    });

    // --- LOGIKA FORM SUBMISSION ---
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const credential = credentialInput.value;
        const password = passwordInput.value;

        // 1. Ambil daftar pengguna dari Local Storage
        const users = JSON.parse(localStorage.getItem('socialMediaUsers')) || [];

        // 2. Cari pengguna berdasarkan email atau username
        const foundUser = users.find(user => 
            user.email === credential || user.username === credential
        );

        // 3. Cek apakah pengguna ditemukan dan passwordnya cocok
        if (foundUser && foundUser.password === password) {
            // Jika login berhasil
            alert(`Login berhasil! Selamat datang kembali, @${foundUser.username}`);
            errorMessage.classList.remove('show');
            // Arahkan ke halaman utama/dashboard
            // window.location.href = '/dashboard.html';
        } else {
            // Jika login gagal
            errorMessage.textContent = 'Email/Username atau password salah.';
            errorMessage.classList.add('show');
        }
    });

    // --- Sembunyikan pesan error saat pengguna mulai mengetik lagi ---
    credentialInput.addEventListener('input', function() {
        errorMessage.classList.remove('show');
    });

    passwordInput.addEventListener('input', function() {
        errorMessage.classList.remove('show');
    });
});