document.addEventListener('DOMContentLoaded', function() {
    // --- Elemen Form ---
    const form = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const emailGroup = document.getElementById('emailGroup');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    const submitBtn = document.getElementById('submitBtn');
    
    // --- Elemen Validasi & UI ---
    const confirmMessage = document.getElementById('confirmMessage');
    const ruleLength = document.getElementById('ruleLength');
    const ruleUppercase = document.getElementById('ruleUppercase');
    const ruleNumber = document.getElementById('ruleNumber');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

    // --- FUNGSI VALIDASI ---

    function validateEmailFormat() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.length === 0) {
            emailGroup.classList.remove('is-valid', 'is-invalid');
            return false;
        }
        const isValid = emailRegex.test(emailInput.value);
        emailGroup.classList.toggle('is-valid', isValid);
        emailGroup.classList.toggle('is-invalid', !isValid);
        return isValid;
    }

    function validatePasswordRules() {
        const value = passwordInput.value;
        const hasMinLength = value.length >= 8;
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);

        ruleLength.classList.toggle('is-met', hasMinLength);
        ruleUppercase.classList.toggle('is-met', hasUppercase);
        ruleNumber.classList.toggle('is-met', hasNumber);

        return hasMinLength && hasUppercase && hasNumber;
    }

    function validateConfirmPassword() {
        if (confirmPasswordInput.value.length === 0 && passwordInput.value.length === 0) {
            confirmMessage.textContent = '';
            confirmMessage.className = 'confirm-message';
            return false;
        }
        
        const doPasswordsMatch = passwordInput.value === confirmPasswordInput.value && confirmPasswordInput.value.length > 0;
        confirmMessage.textContent = doPasswordsMatch ? '✓ Password cocok' : '✗ Password tidak cocok';
        confirmMessage.className = doPasswordsMatch ? 'confirm-message is-valid' : 'confirm-message is-invalid';
        return doPasswordsMatch;
    }

    function validateFormState() {
        const isNameValid = nameInput.value.trim() !== '';
        const isEmailFormatValid = validateEmailFormat();
        const arePasswordRulesMet = validatePasswordRules();
        const doPasswordsMatch = validateConfirmPassword();
        const areTermsAccepted = termsCheckbox.checked;

        const isFormValid = isNameValid && isEmailFormatValid && arePasswordRulesMet && doPasswordsMatch && areTermsAccepted;
        
        submitBtn.disabled = !isFormValid;
        submitBtn.classList.toggle('active', isFormValid);
    }

    function toggleVisibility(inputElement, toggleElement) {
        const isPassword = inputElement.type === 'password';
        inputElement.type = isPassword ? 'text' : 'password';
        toggleElement.classList.toggle('show', isPassword);
    }

    // --- EVENT LISTENERS ---

    const inputsToValidate = [nameInput, emailInput, passwordInput, confirmPasswordInput];
    inputsToValidate.forEach(input => input.addEventListener('keyup', validateFormState));
    termsCheckbox.addEventListener('change', validateFormState);

    togglePassword.addEventListener('click', () => toggleVisibility(passwordInput, togglePassword));
    toggleConfirmPassword.addEventListener('click', () => toggleVisibility(confirmPasswordInput, toggleConfirmPassword));

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Mencegah submit jika tombol disabled/via Enter
        if (submitBtn.disabled) {
            return; 
        }

        // Pengecekan email duplikat
        const users = JSON.parse(localStorage.getItem('socialMediaUsers')) || [];
        const isEmailTaken = users.some(user => user.email && user.email.toLowerCase() === emailInput.value.trim().toLowerCase());
        if (isEmailTaken) {
            alert('Email ini sudah terdaftar. Silakan gunakan email lain atau login.');
            return; 
        }

        // Kalo semua aman, simpan data dan lanjutkan
        const userProgress = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
        };
        sessionStorage.setItem('userProgress', JSON.stringify(userProgress));

        window.location.href = 'signup2.html';
    });
});