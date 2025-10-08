// Dummy data untuk replies
const dummyReplies = [
    {
        id: 1,
        user: {
            username: "swan_creek1",
            displayName: "Swan Creek",
            avatar: "https://robohash.org/swancreek.png?size=50x50&set=set1"
        },
        content: "So here's how I see it: The Rules Are the Problem. The Constitution doesn't require 67 votes for every kind of removal— Congress sets its own rules for impeachment trials.",
        likes: 234,
        retweets: 56,
        createdAt: "2025-10-06T21:00:00Z"
    },
    {
        id: 2,
        user: {
            username: "political_analyst",
            displayName: "Political Analyst",
            avatar: "https://robohash.org/analyst.png?size=50x50&set=set1"
        },
        content: "This is an important clarification about the impeachment process. Many people don't understand the difference between impeachment and removal.",
        likes: 156,
        retweets: 23,
        createdAt: "2025-10-06T22:30:00Z"
    },
    {
        id: 3,
        user: {
            username: "law_student",
            displayName: "Law Student",
            avatar: "https://robohash.org/lawstudent.png?size=50x50&set=set1"
        },
        content: "As a law student, I can confirm this is accurate. The House has the sole power of impeachment, while the Senate conducts the trial.",
        likes: 89,
        retweets: 12,
        createdAt: "2025-10-07T08:15:00Z"
    }
];

// Fungsi untuk mendapatkan parameter URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        postId: parseInt(params.get('id')) || 1,
        username: params.get('user') || 'unseen1'
    };
}

// Utility: konversi createdAt ke time ago
function timeAgo(dateString) {
    const now = new Date();
    const postDate = new Date(dateString);
    const diff = Math.floor((now - postDate) / 1000);
    
    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
    return postDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Fungsi untuk menampilkan post utama
function displayMainPost(post) {
    const mainPostContainer = document.getElementById('main-post');
    
    const postHTML = `
        <div class="post-header">
            <img src="${post.user.avatar}" alt="${post.user.displayName}" class="avatar">
            <div class="user-info">
                <span class="display-name">${post.user.displayName}</span>
                <span class="username">@${post.user.username}</span>
            </div>
        </div>
        <div class="post-content">
            <p>${post.content}</p>
        </div>
        <div class="post-time">
            <span>${timeAgo(post.createdAt)}</span>
        </div>
        <div class="post-stats">
            <div class="stat">
                <strong>${post.replies || 0}</strong>
                <span>Comments</span>
            </div>
            <div class="stat">
                <strong>${post.retweets || 0}</strong>
                <span>Reposts</span>
            </div>
            <div class="stat">
                <strong>${post.likes || 0}</strong>
                <span>Likes</span>
            </div>
            <div class="stat">
                <strong>12.4K</strong>
                <span>Views</span>
            </div>
        </div>

    `;
    
    mainPostContainer.innerHTML = postHTML;
}

// Fungsi untuk menampilkan replies
function displayReplies() {
    const repliesContainer = document.getElementById('replies');
    
    const repliesHTML = dummyReplies.map(reply => `
        <div class="reply-post">
            <div class="post-header">
                <img src="${reply.user.avatar}" alt="${reply.user.displayName}" class="avatar">
                <div class="user-info">
                    <span class="display-name">${reply.user.displayName}</span>
                    <span class="username">@${reply.user.username}</span>
                    <span class="post-time">· ${timeAgo(reply.createdAt)}</span>
                </div>
            </div>
            <div class="post-content">
                <p>${reply.content}</p>
            </div>
            <div class="post-actions">
                <button class="action-btn reply-btn">
                    <img src="../public/icons/chat.svg" alt="Reply">
                    <span>${reply.replies || 0}</span>
                </button>
                <button class="action-btn retweet-btn">
                    <img src="../public/icons/refresh.svg" alt="Retweet">
                    <span>${reply.retweets}</span>
                </button>
                <button class="action-btn like-btn">
                    <img src="../public/icons/heart.svg" alt="Like">
                    <span>${reply.likes}</span>
                </button>
                <button class="action-btn share-btn">
                    <img src="../public/icons/view.svg" alt="view">
                </button>
            </div>
        </div>
    `).join('');
    
    repliesContainer.innerHTML = repliesHTML;
}

// Fungsi untuk kembali ke halaman sebelumnya
function goBack() {
    window.history.back();
}

// Fungsi utama untuk memuat halaman
function loadDetailPage() {
    const params = getUrlParams();
    
    // Load post data dari MOCK_DATA.json
    fetch('../Home/MOCK_DATA.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(posts => {
            const post = posts.find(p => p.id === params.postId) || posts[0];
            displayMainPost(post);
        })
        .catch(error => {
            console.error('Error loading post:', error);
            // Fallback ke post default
            const defaultPost = {
                id: 1,
                user: {
                    username: "unseen1",
                    displayName: "unseen1",
                    avatar: "https://robohash.org/unseen1.png?size=50x50&set=set1"
                },
                content: "There is a misunderstanding when it comes to impeachment of judges. You only need a simple majority in the house to impeach any judge. Once impeached, it goes to the senate where you need 67 votes to remove them.",
                media: [],
                replies: 12,
                retweets: 2200,
                likes: 10000,
                createdAt: "2025-10-06T22:56:00Z"
            };
            displayMainPost(defaultPost);
        });
    
    displayReplies();

    // Event listener untuk reply composer
    const replyText = document.getElementById('reply-text');
    const replyBtn = document.querySelector('.reply-composer .post-btn2');

    if (replyText && replyBtn) {
        replyText.addEventListener('input', function() {
            replyBtn.disabled = this.value.trim() === '';
            if (!replyBtn.disabled) {
                replyBtn.classList.add('active');
            } else {
                replyBtn.classList.remove('active');
            }
        });
    }
}

// Load halaman ketika DOM siap
document.addEventListener('DOMContentLoaded', loadDetailPage);