document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('forgotPasswordForm');
    const identifierInput = document.getElementById('identifier');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const identifier = identifierInput.value.trim().toLowerCase();
        if (!identifier) {
            alert('Harap masukkan email atau username Anda.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('socialMediaUsers')) || [];

        const foundUser = users.find(user => 
            (user.email && user.email.toLowerCase() === identifier) || 
            (user.username && user.username.toLowerCase() === identifier)
        );

        if (foundUser) {
            alert('Akun ditemukan! Anda akan diarahkan untuk verifikasi.');
            sessionStorage.setItem('userToReset', foundUser.username);
            
            // Arahkan ke halaman verifikasi (yang akan kita buat selanjutnya)
            window.location.href = 'Verifikasi.html'; 
        } else {
            alert('Akun dengan email atau username tersebut tidak ditemukan.');
        }
    });
});