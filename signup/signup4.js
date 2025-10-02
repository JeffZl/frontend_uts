document.addEventListener('DOMContentLoaded', function() {
    // --- Elemen yang dibutuhkan ---
    const usernameForm = document.getElementById('usernameForm');
    const usernameInput = document.getElementById('username');
    const usernameGroup = document.getElementById('usernameGroup');
    const validationMessage = document.getElementById('validationMessage');
    const submitBtn = document.getElementById('submitBtn');

  
    const MIN_LENGTH = 3;
    const MAX_LENGTH = 20;
    let debounceTimer;

    // Regex karakter yang diizinkan
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

    // Fungsi untuk validasi username
    function validateUsername() {
        const username = usernameInput.value.trim();

        // Hapus timer debounce sebelumnya agar tidak ada pengecekan ganda
        clearTimeout(debounceTimer);
        
        // 1. Cek jika input kosong, reset ke state default
        if (username.length === 0) {
            showValidationState('default', 'Hanya boleh menggunakan huruf, angka, titik (.), dan garis bawah (_).');
            setButtonState(false);
            return;
        }

        // 2. Cek panjang karakter
        if (username.length < MIN_LENGTH) {
            showValidationState('invalid', `Username minimal ${MIN_LENGTH} karakter.`);
            setButtonState(false);
            return;
        }
        if (username.length > MAX_LENGTH) {
            showValidationState('invalid', `Username maksimal ${MAX_LENGTH} karakter.`);
            setButtonState(false);
            return;
        }

        // 3. Cek karakter yang tidak diizinkan
        if (!allowedCharsRegex.test(username)) {
            showValidationState('invalid', 'Hanya boleh menggunakan huruf, angka, "_", dan "."');
            setButtonState(false);
            return;
        }
        
        // --- Semua validasi dasar lolos, sekarang cek ketersediaan ---
        showValidationState('checking', 'Mengecek ketersediaan...');
        setButtonState(false);
        
        // Atur timer debounce baru untuk menunda pengecekan ke database (localStorage)
        debounceTimer = setTimeout(() => {
            // Ambil daftar pengguna dari Local Storage
            const users = JSON.parse(localStorage.getItem('socialMediaUsers')) || [];
            
            // Cek apakah username sudah ada di dalam daftar users (gunakan .some() untuk efisiensi)
            // .some() akan berhenti mencari setelah menemukan satu kecocokan
            const isTaken = users.some(user => user.username.toLowerCase() === username.toLowerCase());

            if (isTaken) {
                showValidationState('invalid', 'Username ini sudah dipakai.');
                setButtonState(false);
            } else {
                showValidationState('valid', 'Username tersedia!');
                setButtonState(true); // Aktifkan tombol HANYA jika semua valid
            }
        }, 500); // delay 0.5 detik untuk simulasi pengecekan ke server
    }

    // --- EVENT LISTENERS ---

    // Jalankan validasi setiap kali pengguna mengetik
    usernameInput.addEventListener('input', validateUsername);

    // Jalankan proses penyimpanan dan redirect saat form disubmit
    usernameForm.addEventListener('submit', function(e) {
        // Mencegah form mengirim data dan me-refresh halaman (default action)
        e.preventDefault(); 
        
        // Proses hanya berjalan JIKA tombol submit tidak dalam keadaan disabled
        if(!submitBtn.disabled) {
            try {
                // 1. Ambil semua data progres dari Session Storage
                const userProgress = JSON.parse(sessionStorage.getItem('userProgress')) || {};
                
                // 2. Tambahkan username ke data
                userProgress.username = usernameInput.value.trim();
                
                // 3. Ambil daftar pengguna yang sudah ada dari Local Storage
                const users = JSON.parse(localStorage.getItem('socialMediaUsers')) || [];
                
                // 4. Tambahkan pengguna baru ke daftar
                users.push(userProgress);
                
                // 5. Simpan kembali daftar pengguna yang sudah diperbarui ke Local Storage
                localStorage.setItem('socialMediaUsers', JSON.stringify(users));
                
                // 6. Hapus data progres dari Session Storage karena sudah tidak diperlukan
                sessionStorage.removeItem('userProgress');

                // Beri notifikasi ke pengguna
                alert(`Pendaftaran Selesai! Akun untuk @${userProgress.username} telah disimpan.`);
                
                // Arahkan pengguna ke halaman login
                window.location.href = '../login/login.html';

            } catch (error) {
                console.error("Terjadi kesalahan saat menyimpan data:", error);
                alert("Maaf, terjadi kesalahan saat menyimpan data Anda. Silakan coba lagi.");
            }
       }
    });
});