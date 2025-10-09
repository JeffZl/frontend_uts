document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabs button');
  const postsFeed = document.querySelector('.posts-feed');

  // fetch data dari file JSON
  async function loadLikedPosts() {
    try {
      const res = await fetch('./MOCK_DATA.json');
      const data = await res.json();
      renderLikedPosts(data);
    } catch (err) {
      console.error('Failed to load liked posts:', err);
    }
  }

  // fungsi render liked posts
  function renderLikedPosts(posts) {
    postsFeed.innerHTML = posts
      .map(
        (post) => `
        <div class="post">
          <div class="post-header">
            <img src="https://robohash.org/likedpost.png?size=50x50" alt="User Avatar" class="post-avatar">
            <div class="post-user-info">
              <span class="post-name">joe</span>
              <span class="post-handle">@bnn_joe</span>
              <span class="post-time"> · ${new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <button class="post-options">...</button>
          </div>    
          <div class="post-content">
            <p>${post.content}</p>
          </div>
          <div class="post-actions">
            <button class="action-btn reply-btn">
              <img src="/public/icons/chat.png" alt="Reply">
              <span>${post.replies}</span>
            </button>
            <button class="action-btn repost-btn">
              <img src="/public/icons/refresh.png" alt="Repost">
              <span>${post.retweets}</span>
            </button>
            <button class="action-btn like-btn">
              <img src="/public/icons/heart.png" alt="Like">
              <span>${post.likes}</span>
            </button>
            <button class="action-btn share-btn">
              <img src="/public/icons/view.png" alt="view">
              <span>—</span>
            </button>
          </div>
        </div>`
      )
      .join('');
  }

  // handle switching tab
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      if (tab.textContent === 'Likes') {
        loadLikedPosts();
      } else {
        // reload default posts tanpa reload page
        postsFeed.innerHTML = `
          <div class="post">
            <div class="post-header">
              <img src="https://robohash.org/voluptatibusdoloremquetemporepng?size=50x50&set=set1" alt="User Avatar" class="post-avatar">
              <div class="post-user-info">
                <span class="post-name">jane_doe</span>
                <span class="post-handle">@jane_doe</span>
                <span class="post-time"> · 1h</span>
              </div>
              <button class="post-options">...</button>
            </div>    
            <div class="post-content">
              <p>Finally finished coding the initial user profile layout! Took a while, but it's looking clean. Time for some rest! 😴</p>
              <p class="hashtags">#WebDevelopment #CodingLife #HTMLCSS</p>
            </div>
            <div class="post-actions">
              <button class="action-btn reply-btn">
                <img src="/public/icons/chat.png" alt="Reply">
                <span>12</span>
              </button>
              <button class="action-btn repost-btn">
                <img src="/public/icons/refresh.png" alt="Repost">
                <span>5</span>
              </button>
              <button class="action-btn like-btn">
                <img src="/public/icons/heart.png" alt="Like">
                <span>42</span>
              </button>
              <button class="action-btn share-btn">
                <img src="/public/icons/view.png" alt="view">
                <span>211</span>
              </button>
            </div>
          </div>
        `;
      }
    });
  });
});
