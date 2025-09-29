document.addEventListener('DOMContentLoaded', function() {
    // --- Mengambil semua elemen yang dibutuhkan ---
    const form = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const emailGroup = document.getElementById('emailGroup');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const confirmMessage = document.getElementById('confirmMessage');
    const termsCheckbox = document.getElementById('terms');
    const submitBtn = document.getElementById('submitBtn');

    // Elemen untuk aturan password
    const ruleLength = document.getElementById('ruleLength');
    const ruleUppercase = document.getElementById('ruleUppercase');
    const ruleNumber = document.getElementById('ruleNumber');

    // Elemen untuk ikon mata
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');


    // --- FUNGSI-FUNGSI VALIDASI ---

    // 1. Validasi Email
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.length === 0) {
            emailGroup.classList.remove('is-valid', 'is-invalid');
            return false;
        }
        if (emailRegex.test(emailInput.value)) {
            emailGroup.classList.add('is-valid');
            emailGroup.classList.remove('is-invalid');
            return true;
        } else {
            emailGroup.classList.add('is-invalid');
            emailGroup.classList.remove('is-valid');
            return false;
        }
    }

    // 2. Validasi Aturan Password
    function validatePasswordRules() {
        const value = passwordInput.value;
        let allRulesMet = true;

        // Aturan 1: Panjang minimal 8 karakter
        if (value.length >= 8) {
            ruleLength.classList.add('is-met');
        } else {
            ruleLength.classList.remove('is-met');
            allRulesMet = false;
        }

        // Aturan 2: Mengandung huruf besar
        if (/[A-Z]/.test(value)) {
            ruleUppercase.classList.add('is-met');
        } else {
            ruleUppercase.classList.remove('is-met');
            allRulesMet = false;
        }

        // Aturan 3: Mengandung angka
        if (/[0-9]/.test(value)) {
            ruleNumber.classList.add('is-met');
        } else {
            ruleNumber.classList.remove('is-met');
            allRulesMet = false;
        }

        return allRulesMet;
    }

    // 3. Validasi Konfirmasi Password
    function validateConfirmPassword() {
        if (confirmPasswordInput.value.length === 0 && passwordInput.value.length === 0) {
            confirmMessage.textContent = '';
            confirmMessage.className = 'confirm-message';
            return false;
        }
        
        if (confirmPasswordInput.value.length > 0 && passwordInput.value === confirmPasswordInput.value) {
            confirmMessage.textContent = '✓ Password cocok';
            confirmMessage.className = 'confirm-message is-valid';
            return true;
        } else {
            confirmMessage.textContent = '✗ Password tidak cocok';
            confirmMessage.className = 'confirm-message is-invalid';
            return false;
        }
    }

    // 4. Fungsi Utama untuk Validasi Keseluruhan Form
    function validateForm() {
        const isNameValid = nameInput.value.trim() !== '';
        const isEmailValid = validateEmail();
        const arePasswordRulesMet = validatePasswordRules();
        const doPasswordsMatch = validateConfirmPassword();
        const areTermsAccepted = termsCheckbox.checked;
        
        // Cek kembali kecocokan password karena bisa saja field confirm kosong
        const finalPasswordMatch = passwordInput.value === confirmPasswordInput.value && passwordInput.value.length > 0;

        if (isNameValid && isEmailValid && arePasswordRulesMet && finalPasswordMatch && areTermsAccepted) {
            submitBtn.classList.add('active');
            submitBtn.disabled = false;
        } else {
            submitBtn.classList.remove('active');
            submitBtn.disabled = true;
        }
    }

    // --- FUNGSI UNTUK IKON MATA ---
    function toggleVisibility(inputElement, toggleElement) {
        if (inputElement.type === 'password') {
            inputElement.type = 'text';
            toggleElement.classList.add('show');
        } else {
            inputElement.type = 'password';
            toggleElement.classList.remove('show');
        }
    }

    
    // --- EVENT LISTENERS ---

    // Panggil validateForm setiap kali ada input atau perubahan
    const allInputs = [nameInput, emailInput, passwordInput, confirmPasswordInput];
    allInputs.forEach(input => input.addEventListener('keyup', validateForm));
    termsCheckbox.addEventListener('change', validateForm);

    // Listener untuk ikon mata
    togglePassword.addEventListener('click', function() {
        toggleVisibility(passwordInput, this);
    });
    toggleConfirmPassword.addEventListener('click', function() {
        toggleVisibility(confirmPasswordInput, this);
    });

    // Mencegah form di-submit jika tidak valid
   form.addEventListener('submit', function(e) {
    e.preventDefault();
    validateForm(); // Lakukan validasi terakhir sebelum submit
    if (!submitBtn.disabled) {
        // --- BARIS BARU DITAMBAHKAN ---
        // Simpan data dari form ini ke Session Storage
        const userProgress = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };
        sessionStorage.setItem('userProgress', JSON.stringify(userProgress));
        // --- AKHIR BARIS BARU ---

        // Mengarahkan ke halaman signup2.html
        window.location.href = 'signup2.html';
      }
    });
});