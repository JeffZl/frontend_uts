// Fungsi untuk membuat elemen <option>
function createOption(value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    return option;
}

// Fungsi untuk mengisi opsi bulan
function populateMonths(selectElement) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    selectElement.appendChild(createOption("", "Month"));
    months.forEach((month, index) => {
        // Nilai (value) adalah angka 1-12
        selectElement.appendChild(createOption(index + 1, month));
    });
}

// Fungsi untuk mengisi opsi hari (1-31)
function populateDays(selectElement) {
    selectElement.appendChild(createOption("", "Day"));
    for (let i = 1; i <= 31; i++) {
        selectElement.appendChild(createOption(i, i));
    }
}

// Fungsi untuk mengisi opsi tahun
function populateYears(selectElement) {
    const currentYear = new Date().getFullYear();
    selectElement.appendChild(createOption("", "Year"));
    // Kita hanya perlu tahun hingga 100 tahun ke belakang
    for (let year = currentYear; year >= currentYear - 100; year--) {
        selectElement.appendChild(createOption(year, year));
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const birthdateDisplay = document.getElementById('birthdate-display');
  const birthdateInputGroup = document.getElementById('birthdate-input-group');
  const cancelDateEdit = document.getElementById('cancel-date-edit');
  const editDateBtn = document.getElementById('edit-date-btn');

  const monthSelect = document.getElementById('birth-month');
  const daySelect = document.getElementById('birth-day');
  const yearSelect = document.getElementById('birth-year');

  populateMonths(monthSelect);
  populateDays(daySelect);
  populateYears(yearSelect);

  // Tampilkan alert konfirmasi
  if (editDateBtn) {
    editDateBtn.addEventListener('click', () => {
      const confirmEdit = confirm('Are you sure you want to change your birth date?');
      if (confirmEdit) {
        // Sembunyikan tampilan teks
        birthdateDisplay.style.display = 'none';
        // Tampilkan dropdown input
        birthdateInputGroup.style.display = 'block';
      }
    });
  }

  // Tombol cancel
  if (cancelDateEdit) {
    cancelDateEdit.addEventListener('click', () => {
      birthdateInputGroup.style.display = 'none';
      birthdateDisplay.style.display = 'flex';
      monthSelect.value = "";
      daySelect.value = "";
      yearSelect.value = "";
    });
  }

  const cameraButtons = document.querySelectorAll('.icon-button img[alt="Upload"]');

  cameraButtons.forEach((button, index) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    document.body.appendChild(input);

    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (index === 0) {
          document.querySelector('.banner-preview').src = reader.result;
        } else {
          document.querySelector('.profile-preview').src = reader.result;
        }
      };
      reader.readAsDataURL(file);
    });

    button.addEventListener('click', () => input.click());
  });
});
