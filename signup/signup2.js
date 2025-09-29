document.addEventListener('DOMContentLoaded', function() {
    // --- Mengambil elemen yang dibutuhkan ---
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    const ageMessage = document.getElementById('ageMessage');
    const submitBtn = document.getElementById('submitBtn');
    const dobForm = document.getElementById('dobForm');

    const MIN_AGE = 17; 

    // --- FUNGSI-FUNGSI ---

    // Mengisi dropdown Tahun
    function populateYears() {
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= currentYear - 100; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }
    }

    // Mengisi dropdown Bulan
    function populateMonths() {
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        months.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index; // 0 for January, 1 for February, etc.
            option.textContent = month;
            monthSelect.appendChild(option);
        });
    }

    // Mengisi dropdown Hari (LOGIKA DIPERBARUI)
    function populateDays() {
        const month = monthSelect.value;
        const year = yearSelect.value;
        const currentDay = daySelect.value;
        
        daySelect.innerHTML = '<option value="" disabled selected>Hari</option>';

        if (month !== "") {
            const yearToUse = year || 2001; 

            const daysInMonth = new Date(yearToUse, parseInt(month) + 1, 0).getDate();

            for (let i = 1; i <= daysInMonth; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                daySelect.appendChild(option);
            }
            
            // Kembalikan pilihan hari jika masih valid
            if (currentDay && currentDay <= daysInMonth) {
                daySelect.value = currentDay;
            }
        }
    }
    
    // Validasi form dan usia
    function validateForm() {
        const day = daySelect.value;
        const month = monthSelect.value;
        const year = yearSelect.value;

        if (day && month && year) {
            const today = new Date();
            const birthDate = new Date(year, month, day);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            ageMessage.textContent = `Usiamu adalah ${age} tahun.`;
            if (age >= MIN_AGE) {
                ageMessage.className = 'age-validation-message is-valid';
                submitBtn.classList.add('active');
                submitBtn.disabled = false;
            } else {
                ageMessage.className = 'age-validation-message is-invalid';
                ageMessage.textContent += ` (Minimal usia ${MIN_AGE} tahun)`;
                submitBtn.classList.remove('active');
                submitBtn.disabled = true;
            }
        } else {
            ageMessage.textContent = '';
            submitBtn.classList.remove('active');
            submitBtn.disabled = true;
        }
    }


    // --- Inisialisasi & Event Listeners ---
    
    populateYears();
    populateMonths();
    populateDays();

    daySelect.addEventListener('change', validateForm);
    monthSelect.addEventListener('change', () => {
        populateDays();
        validateForm();
    });
    yearSelect.addEventListener('change', () => {
        populateDays();
        validateForm();
    });
    
    dobForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if(!submitBtn.disabled) {
    
        // Ambil data dari Session Storage
        const userProgress = JSON.parse(sessionStorage.getItem('userProgress')) || {};
        
        // Tambahkan tanggal lahir
        userProgress.dob = {
            day: daySelect.value,
            month: monthSelect.value,
            year: yearSelect.value
        };
        
        // Simpan kembali ke Session Storage
        sessionStorage.setItem('userProgress', JSON.stringify(userProgress));

        // Arah ke halaman berikutnya
        window.location.href = 'signup3.html';
        }
    });

});