// Add this to your blog page
async function fetchMediumPosts() {
    try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mark.mozheiko');
        const data = await response.json();
        
        if (data.status === 'ok') {
            displayMediumPosts(data.items);
        }
    } catch (error) {
        console.error('Error fetching Medium posts:', error);
    }
}

function displayMediumPosts(posts) {
    const blogList = document.querySelector('.blog-list');
    
    posts.forEach(post => {
        const postElement = `
            <article class="blog-post-card">
                <h2 class="text-2xl font-semibold mb-3">
                    <a href="${post.link}" target="_blank" class="hover:text-blue-600 transition-colors">
                        ${post.title}
                    </a>
                </h2>
                <div class="post-meta">
                    <time datetime="${post.pubDate}">${new Date(post.pubDate).toLocaleDateString()}</time>
                </div>
                <div class="text-gray-600 mb-4">${post.description.replace(/<[^>]*>/g, '').substring(0, 200)}...</div>
                <a href="${post.link}" target="_blank" class="text-blue-600 font-semibold hover:text-blue-800">
                    Read on Medium →
                </a>
            </article>
        `;
        blogList.innerHTML += postElement;
    });
}

// Call when page loads
document.addEventListener('DOMContentLoaded', fetchMediumPosts);