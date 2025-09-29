document.addEventListener('DOMContentLoaded', function() {
    // --- Elemen yang dibutuhkan ---
    const usernameForm = document.getElementById('usernameForm');
    const usernameInput = document.getElementById('username');
    const usernameGroup = document.getElementById('usernameGroup');
    const validationMessage = document.getElementById('validationMessage');
    const submitBtn = document.getElementById('submitBtn');

    // --- Variabel & Konfigurasi ---
    const MIN_LENGTH = 3;
    const MAX_LENGTH = 20;
    const TAKEN_USERNAMES = ['admin', 'root', 'test', 'user', 'moderator']; // Simulasi username yang sudah dipakai
    let debounceTimer;

    // Regex untuk karakter yang diizinkan: huruf, angka, garis bawah, titik
    const allowedCharsRegex = /^[a-zA-Z0-9_.]+$/;


    // --- FUNGSI-FUNGSI ---

    // Fungsi untuk menampilkan status validasi
    function showValidationState(state, message) {
        // State bisa berupa: 'default', 'checking', 'valid', 'invalid'
        usernameGroup.className = 'input-group'; // Reset
        validationMessage.className = 'validation-message'; // Reset

        if (state !== 'default') {
            usernameGroup.classList.add(`is-${state}`);
            validationMessage.classList.add(`is-${state}`);
        }
        validationMessage.textContent = message;
    }

    // Fungsi utama untuk validasi username
    function validateUsername() {
        const username = usernameInput.value.trim();

        // 1. Cek panjang karakter
        if (username.length < MIN_LENGTH && username.length > 0) {
            showValidationState('invalid', `Username minimal ${MIN_LENGTH} karakter.`);
            setButtonState(false);
            return;
        }
        if (username.length > MAX_LENGTH) {
            showValidationState('invalid', `Username maksimal ${MAX_LENGTH} karakter.`);
            setButtonState(false);
            return;
        }

        // 2. Cek karakter yang tidak diizinkan
        if (!allowedCharsRegex.test(username) && username.length > 0) {
            showValidationState('invalid', 'Hanya boleh menggunakan huruf, angka, "_", dan "."');
            setButtonState(false);
            return;
        }
        
        // Jika input kosong, reset ke state default
        if (username.length === 0) {
            showValidationState('default', 'Hanya boleh menggunakan huruf, angka, titik (.), dan garis bawah (_).');
            setButtonState(false);
            return;
        }

        // 3. Simulasi pengecekan ketersediaan (availability)
        showValidationState('checking', 'Mengecek ketersediaan...');
        setButtonState(false);
        
        // Hapus timer debounce sebelumnya
        clearTimeout(debounceTimer);

        // Atur timer debounce baru
        debounceTimer = setTimeout(() => {
            if (TAKEN_USERNAMES.includes(username.toLowerCase())) {
                showValidationState('invalid', 'Username ini sudah dipakai.');
                setButtonState(false);
            } else {
                showValidationState('valid', 'Username tersedia!');
                setButtonState(true); // Aktifkan tombol jika semua valid
            }
        }, 500);
    }
    
    // Fungsi untuk mengatur status tombol
    function setButtonState(active) {
        if (active) {
            submitBtn.classList.add('active');
            submitBtn.disabled = false;
        } else {
            submitBtn.classList.remove('active');
            submitBtn.disabled = true;
        }
    }

    // --- EVENT LISTENERS ---
    usernameInput.addEventListener('input', validateUsername);

    usernameForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if(!submitBtn.disabled) {
        
        // 1. Ambil semua data progres dari Session Storage
        const userProgress = JSON.parse(sessionStorage.getItem('userProgress')) || {};
        
        // 2. Tambahkan username ke data
        userProgress.username = usernameInput.value;
        
        // 3. Ambil daftar pengguna yang sudah ada dari Local Storage
        // Jika belum ada, buat array kosong
        const users = JSON.parse(localStorage.getItem('socialMediaUsers')) || [];
        
        // 4. Tambahkan pengguna baru ke daftar
        users.push(userProgress);
        
        // 5. Simpan kembali daftar pengguna yang sudah diperbarui ke Local Storage
        localStorage.setItem('socialMediaUsers', JSON.stringify(users));
        
        // 6. Hapus data progres dari Session Storage
        sessionStorage.removeItem('userProgress');

        alert(`Pendaftaran Selesai! Akun untuk @${userProgress.username} telah disimpan.`);
        
        window.location.href = 'login.html';
     }
    });
});