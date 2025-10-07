async function loadPosts() {
  try {
    const response = await fetch("MOCK_DATA.json"); // pastikan path sesuai
    const posts = await response.json();

    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";

    posts.forEach(post => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      postElement.innerHTML = `
        <div class="post-header">
          <img src="${post.user.avatar}" alt="User Avatar">
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
          <div class="action"><img src="public/icons/chat.png" alt="Comment"><span>${post.replies}</span></div>
          <div class="action"><img src="public/icons/refresh.png" alt="Share"><span>${post.retweets}</span></div>
          <div class="action"><img src="public/icons/heart.png" alt="Like"><span>${post.likes}</span></div>
          <div class="action"><img src="public/icons/view.png" alt="View"><span>0</span></div>
        </div>
      `;

      postsContainer.appendChild(postElement);
    });
  } catch (err) {
    console.error("Error loading posts:", err);
  }
}

// Utility: konversi createdAt → "5m", "2h", dst
function timeAgo(dateString) {
  const now = new Date();
  const postDate = new Date(dateString);
  const diff = Math.floor((now - postDate) / 1000); // detik

  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return postDate.toLocaleDateString();
}

loadPosts();
