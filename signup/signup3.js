document.addEventListener('DOMContentLoaded', function() {
    // --- Konfigurasi dan Elemen ---
    const interestGrid = document.getElementById('interestGrid');
    const submitBtn = document.getElementById('submitBtn');
    const subtitle = document.getElementById('subtitle');
    const interestForm = document.getElementById('interestForm');

    const MIN_SELECTIONS = 3;

    // Daftar minat 
    const interests = [
        { name: 'Teknologi', icon: '💻' },
        { name: 'Musik', icon: '🎵' },
        { name: 'Film', icon: '🎬' },
        { name: 'Game', icon: '🎮' },
        { name: 'Olahraga', icon: '⚽' },
        { name: 'Kuliner', icon: '🍔' },
        { name: 'Seni', icon: '🎨' },
        { name: 'Buku', icon: '📚' },
        { name: 'Travel', icon: '✈️' },
        { name: 'Fotografi', icon: '📷' },
        { name: 'Fashion', icon: '👗' },   // <-- KATEGORI BARU
        { name: 'Kesehatan', icon: '🧘‍♀️' } // <-- KATEGORI BARU
    ];

    // --- FUNGSI-FUNGSI ---

    // 1. Fungsi untuk membuat dan menampilkan kartu minat
    function renderInterestCards() {
        interests.forEach(interest => {
            const card = document.createElement('div');
            card.className = 'interest-card';
            card.dataset.interest = interest.name; 

            card.innerHTML = `
                <span class="icon">${interest.icon}</span>
                <span class="text">${interest.name}</span>
                <span class="checkmark">✓</span>
            `;
            interestGrid.appendChild(card);
        });
    }

    // 2. Fungsi untuk memvalidasi jumlah pilihan
    function validateSelection() {
        const selectedCards = document.querySelectorAll('.interest-card.selected');
        const selectionCount = selectedCards.length;
        
        // Update subtitle untuk memberikan feedback
        if (selectionCount > 0) {
            subtitle.textContent = `${selectionCount} / ${MIN_SELECTIONS} minat dipilih.`;
        } else {
            subtitle.textContent = `Pilih minimal ${MIN_SELECTIONS} minat untuk personalisasi timeline-mu.`;
        }

        // Aktifkan atau non-aktifkan tombol
        if (selectionCount >= MIN_SELECTIONS) {
            submitBtn.classList.add('active');
            submitBtn.disabled = false;
        } else {
            submitBtn.classList.remove('active');
            submitBtn.disabled = true;
        }
    }

    // --- EVENT LISTENERS ---

    // Gunakan event delegation untuk menangani klik pada semua kartu
    interestGrid.addEventListener('click', function(e) {
        const card = e.target.closest('.interest-card');

        if (card) {
            // Toggle kelas 'selected' pada kartu yang diklik
            card.classList.toggle('selected');
            // Validasi ulang setiap kali ada perubahan
            validateSelection();
        }
    });
    
    // Mencegah form di-submit
    interestForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if(!submitBtn.disabled) {
        // Kumpulkan minat yang dipilih
        const selectedInterests = Array.from(document.querySelectorAll('.interest-card.selected'))
                                       .map(card => card.dataset.interest);
        
        const userProgress = JSON.parse(sessionStorage.getItem('userProgress')) || {};
        userProgress.interests = selectedInterests;
        sessionStorage.setItem('userProgress', JSON.stringify(userProgress));

        window.location.href = 'signup4.html';
        }
    });

    // --- Inisialisasi kartu"---
    renderInterestCards(); 
});