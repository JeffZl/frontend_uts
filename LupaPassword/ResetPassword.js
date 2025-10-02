document.addEventListener('DOMContentLoaded', function () {
    // --- Ambil semua elemen ---
    const form = document.getElementById('resetPasswordForm');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitBtn = document.getElementById('submitBtn');

    // Elemen UI validasi
    const ruleLength = document.getElementById('ruleLength');
    const ruleUppercase = document.getElementById('ruleUppercase');
    const ruleNumber = document.getElementById('ruleNumber');
    const confirmMessage = document.getElementById('confirmMessage');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

    const usernameToReset = sessionStorage.getItem('userToReset');

    if (!usernameToReset) {
        alert('Sesi tidak valid. Silakan ulangi proses lupa password.');
        window.location.href = 'Lupa.html';
        return;
    }

    // --- FUNGSI-FUNGSI VALIDASI REAL-TIME ---

    function validatePasswordRules() {
        const value = newPasswordInput.value;
        const hasMinLength = value.length >= 8;
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);

        ruleLength.classList.toggle('is-met', hasMinLength);
        ruleUppercase.classList.toggle('is-met', hasUppercase);
        ruleNumber.classList.toggle('is-met', hasNumber);

        return hasMinLength && hasUppercase && hasNumber;
    }

    function validateConfirmPassword() {
        if (confirmPasswordInput.value.length === 0) {
            confirmMessage.textContent = '';
            return false;
        }
        const doPasswordsMatch = newPasswordInput.value === confirmPasswordInput.value;
        confirmMessage.textContent = doPasswordsMatch ? '✓ Password cocok' : '✗ Password tidak cocok';
        confirmMessage.className = doPasswordsMatch ? 'confirm-message is-valid' : 'confirm-message is-invalid';
        return doPasswordsMatch;
    }

    function validateFormState() {
        const areRulesMet = validatePasswordRules();
        const doPasswordsMatch = validateConfirmPassword();
        const isFormValid = areRulesMet && doPasswordsMatch;
        submitBtn.disabled = !isFormValid;
    }
    
    function toggleVisibility(input, toggle) {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        toggle.classList.toggle('show', isPassword);
    }

    // --- EVENT LISTENERS ---

    // Jalankan validasi setiap kali pengguna mengetik
    newPasswordInput.addEventListener('keyup', validateFormState);
    confirmPasswordInput.addEventListener('keyup', validateFormState);
    
    // Listener untuk ikon mata
    togglePassword.addEventListener('click', () => toggleVisibility(newPasswordInput, togglePassword));
    toggleConfirmPassword.addEventListener('click', () => toggleVisibility(confirmPasswordInput, toggleConfirmPassword));
    
    // Listener untuk form submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        if (submitBtn.disabled) {
            alert('Pastikan semua syarat password terpenuhi dan password konfirmasi cocok.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('socialMediaUsers')) || [];
        const userIndex = users.findIndex(user => user.username === usernameToReset);

        if (userIndex !== -1) {
            users[userIndex].password = newPasswordInput.value;
            localStorage.setItem('socialMediaUsers', JSON.stringify(users));
            sessionStorage.removeItem('userToReset');
            alert('Password berhasil diubah! Anda akan diarahkan ke halaman login.');
            window.location.href = '../login/login.html';
        } else {
            alert('Terjadi kesalahan. Pengguna tidak ditemukan.');
            window.location.href = 'Lupa.html';
        }
    });
});