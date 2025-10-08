async function loadPosts() {
  try {
    const response = await fetch("MOCK_DATA.json");
    const posts = await response.json();
    displayPosts(posts);
  } catch (err) {
    console.error("Error loading posts:", err);
  }
}

// Fungsi untuk membuka detail page ketika post diklik
function openDetailPage(postId, username) {
    window.location.href = `../DetailPage/detailpage.html?id=${postId}&user=${username}`;
}

// Fungsi untuk menampilkan posts
function displayPosts(posts) {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = "";
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.user.avatar}" alt="${post.user.displayName}">
                <div class="post-user">
                    <span class="name">${post.user.displayName}</span>
                    <span class="handle">@${post.user.username}</span>
                    <span class="time">· ${timeAgo(post.createdAt)}</span>
                </div>
            </div>
            <div class="post-content">
                ${post.content}
            </div>
            <div class="post-actions">
                <div class="action">
                    <img src="../public/icons/chat.svg" alt="Reply">
                    <span>${post.replies}</span>
                </div>
                <div class="action">
                    <img src="../public/icons/refresh.svg" alt="Retweet">
                    <span>${post.retweets}</span>
                </div>
                <div class="action">
                    <img src="../public/icons/heart.svg" alt="Like">
                    <span>${post.likes}</span>
                </div>
                <div class="action">
                    <img src="../public/icons/view.svg" alt="View">
                </div>
            </div>
        `;
        
        // Tambahkan event listener untuk klik post
        postElement.addEventListener('click', (e) => {
            // Cegah event bubbling jika mengklik action buttons
            if (!e.target.closest('.post-actions')) {
                openDetailPage(post.id, post.user.username);
            }
        });
        
        postsContainer.appendChild(postElement);
    });
}

// Utility: konversi createdAt ke time ago
function timeAgo(dateString) {
    const now = new Date();
    const postDate = new Date(dateString);
    const diff = Math.floor((now - postDate) / 1000); // difference in seconds
    
    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
    return postDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Event listener untuk composer
document.addEventListener('DOMContentLoaded', function() {
    loadPosts();
    
    // Composer functionality
    const composerText = document.getElementById('composer-text');
    const postBtn2 = document.querySelector('.post-btn2');
    
    if (composerText && postBtn2) {
        composerText.addEventListener('input', function() {
            postBtn2.disabled = this.value.trim() === '';
            if (!postBtn2.disabled) {
                postBtn2.classList.add('active');
            } else {
                postBtn2.classList.remove('active');
            }
        });
    }
});