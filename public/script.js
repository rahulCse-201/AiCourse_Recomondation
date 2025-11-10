// Sample dataset of courses
const courses = [
  { name: "Machine Learning A-Z", tags: ["ai", "ml", "data"], level: "Intermediate" },
  { name: "Web Development Bootcamp", tags: ["web", "html", "css", "javascript"], level: "Beginner" },
  { name: "Cyber Security Basics", tags: ["security", "network", "hacking"], level: "Intermediate" },
  { name: "Deep Learning with Python", tags: ["ai", "deep learning", "neural network"], level: "Advanced" },
  { name: "Database Design and SQL", tags: ["database", "sql", "backend"], level: "Beginner" },
  { name: "Data Science with Python", tags: ["data", "python", "ml"], level: "Intermediate" },
];
setInterval(() => {
  courses.forEach(c => {
    c.trendingCount += Math.floor(Math.random() * 3);
  });
}, 5000);
// const trendingCourses = allCourses.sort(() => 0.5 - Math.random()).slice(0, 5);

document.getElementById("recommenderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const interests = document.getElementById("interests").value.toLowerCase().split(",");
  const output = document.getElementById("output");
  output.innerHTML = "<h3>🎓 Recommended Courses:</h3>";

  // Simple matching logic
  const matched = courses.filter(course =>
    course.tags.some(tag => interests.includes(tag.trim()))
  );

  if (matched.length === 0) {
    output.innerHTML += "<p>No exact matches found. Try different interests!</p>";
  } else {
    matched.forEach(course => {
      output.innerHTML += `
        <div class="course-card">
          <h4>${course.name}</h4>
          <p>Level: ${course.level}</p>
          <p><b>Tags:</b> ${course.tags.join(", ")}</p>
        </div>
      `;
    });
  }
});
async function loadTrendingCourses() {
  const res = await fetch("/trending");
  const data = await res.json();
  const container = document.getElementById("trending-list");
  container.innerHTML = data.map(c => `
    <div>
      <strong>${c.name}</strong><br>
      🔥 Popularity: ${c.trendingCount}
    </div>
  `).join("");
}

async function loadTopRatedCourses() {
  const res = await fetch("/top-rated");
  const data = await res.json();
  const container = document.getElementById("top-rated-list");
  container.innerHTML = data.map(c => `
    <div>
      <strong>${c.name}</strong><br>
      ⭐ Rating: ${c.rating}
    </div>
  `).join("");
}

// Call both when page loads
window.onload = () => {
  loadTrendingCourses();
  loadTopRatedCourses();
};

// Fetch and render trending courses
async function loadTrendingCourses() {
  const res = await fetch("/trending");
  const data = await res.json();
  const container = document.getElementById("trending-list");
  container.innerHTML = data.map(c => `
    <div class="course-card" onclick='showCourseDetails(${JSON.stringify(c)})'>
      <strong>${c.name}</strong><br>
      🔥 Popularity: ${c.trendingCount}
    </div>
  `).join("");
}

// Fetch and render top-rated courses
async function loadTopRatedCourses() {
  const res = await fetch("/top-rated");
  const data = await res.json();
  const container = document.getElementById("top-rated-list");
  container.innerHTML = data.map(c => `
    <div class="course-card" onclick='showCourseDetails(${JSON.stringify(c)})'>
      <strong>${c.name}</strong><br>
      ⭐ Rating: ${c.rating}
    </div>
  `).join("");
}

// Show course details in modal
function showCourseDetails(course) {
  document.getElementById("modalName").textContent = course.name;
  document.getElementById("modalLevel").textContent = course.level || "N/A";
  document.getElementById("modalRating").textContent = course.rating;
  document.getElementById("modalTags").textContent = course.tags.join(", ");
  document.getElementById("modalLink").href = course.link || "#";

  document.getElementById("courseModal").style.display = "flex";
}

// Close modal
document.querySelector(".close-btn").addEventListener("click", () => {
  document.getElementById("courseModal").style.display = "none";
});

// Background close
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    document.getElementById("courseModal").style.display = "none";
  }
});

// Auto-update trending courses
setInterval(loadTrendingCourses, 10000);

// Initial load
window.onload = () => {
  loadTrendingCourses();
  loadTopRatedCourses();
};

// Form handling
document.getElementById("recommenderForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const branch = document.getElementById("branch").value;
  const semester = document.getElementById("semester").value;
  const marks = document.getElementById("marks").value;
  const interests = document.getElementById("interests").value;

  const res = await fetch("/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, branch, semester, marks, interests })
  });

  const data = await res.json();
  const output = document.getElementById("output");
  output.innerHTML = "<h3>🎓 Recommended Courses:</h3>" +
    data.map(c => `<div class="course-card">${c}</div>`).join("");
});
