// Fetch dữ liệu người dùng từ API
      fetch('https://api.example.com/user') // Thay 'https://api.example.com/user' bằng URL API thật của bạn
         .then(response => response.json())
         .then(data => {
            // Cập nhật thông tin người dùng
            document.getElementById('profile-name').textContent = data.name;
            document.getElementById('sidebar-profile-name').textContent = data.name;
            document.getElementById('profile-img').src = data.profileImage;
            document.getElementById('sidebar-profile-img').src = data.profileImage;
            document.getElementById('profile-role').textContent = data.role;
         })
         .catch(error => console.error('Error fetching user data:', error));

      // Fetch dữ liệu khóa học từ API
      fetch('https://api.example.com/courses') // Thay 'https://api.example.com/courses' bằng URL API thật của bạn
         .then(response => response.json())
         .then(courses => {
            const coursesContainer = document.getElementById('courses-container');
            courses.forEach(course => {
               const courseElement = document.createElement('div');
               courseElement.classList.add('box');
               courseElement.innerHTML = `
                  <div class="tutor">
                     <img src="${course.tutorImage}" alt="Tutor">
                     <div class="info">
                        <h3>${course.tutorName}</h3>
                        <span>${course.date}</span>
                     </div>
                  </div>
                  <div class="thumb">
                     <img src="${course.thumbnail}" alt="Course Thumbnail">
                     <span>${course.videoCount} videos</span>
                  </div>
                  <h3 class="title">${course.title}</h3>
                  <a href="playlist.html?course_id=${course.id}" class="inline-btn">View Playlist</a>
               `;
               coursesContainer.appendChild(courseElement);
            });
         })
         .catch(error => console.error('Error fetching courses data:', error));

      // Fetch dữ liệu "Quick Options" từ API
      fetch('https://api.example.com/quick-options') // Thay 'https://api.example.com/quick-options' bằng URL API thật của bạn
         .then(response => response.json())
         .then(options => {
            const quickOptionsContainer = document.getElementById('quick-options-container');
            options.forEach(option => {
               const optionElement = document.createElement('div');
               optionElement.classList.add('box');
               optionElement.innerHTML = `
                  <h3 class="title">${option.title}</h3>
                  <p class="likes">Total likes: <span>${option.likes}</span></p>
                  <a href="${option.likesUrl}" class="inline-btn">View Likes</a>
                  <p class="likes">Total comments: <span>${option.comments}</span></p>
                  <a href="${option.commentsUrl}" class="inline-btn">View Comments</a>
                  <p class="likes">Saved playlists: <span>${option.playlists}</span></p>
                  <a href="${option.playlistsUrl}" class="inline-btn">View Playlists</a>
               `;
               quickOptionsContainer.appendChild(optionElement);
            });
         })
         .catch(error => console.error('Error fetching quick options data:', error));
