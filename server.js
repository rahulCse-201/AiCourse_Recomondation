const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// 🎯 All Courses (Main Data)
const courses = [
  // 🌐 Web Development
  { name: "Web Development Bootcamp", tags: ["web", "html", "css", "javascript"], level: "Beginner", trendingCount: 18, rating: 4.4 },
  { name: "Frontend Development with React", tags: ["web", "react", "frontend", "javascript"], level: "Intermediate", trendingCount: 14, rating: 4.6 },
  { name: "Backend Development with Node.js", tags: ["backend", "node", "express", "api"], level: "Intermediate", trendingCount: 16, rating: 4.5 },
  { name: "Full Stack Web Development", tags: ["web", "frontend", "backend", "database"], level: "Advanced", trendingCount: 20, rating: 4.7 },

  // 🤖 AI & Machine Learning
  { name: "Machine Learning A-Z", tags: ["ai", "ml", "data"], level: "Intermediate", trendingCount: 25, rating: 4.9 },
  { name: "Deep Learning with TensorFlow", tags: ["ai", "deep learning", "neural network", "tensorflow"], level: "Advanced", trendingCount: 21, rating: 4.8 },
  { name: "Natural Language Processing Basics", tags: ["nlp", "ai", "python"], level: "Intermediate", trendingCount: 15, rating: 4.5 },
  { name: "AI for Everyone", tags: ["ai", "intro", "beginner"], level: "Beginner", trendingCount: 17, rating: 4.3 },

  // 📊 Data Science & Analytics
  { name: "Data Science with Python", tags: ["data", "python", "ml"], level: "Intermediate", trendingCount: 19, rating: 4.6 },
  { name: "Statistics for Data Science", tags: ["data", "math", "statistics"], level: "Beginner", trendingCount: 11, rating: 4.2 },
  { name: "Power BI and Data Visualization", tags: ["data", "visualization", "powerbi"], level: "Intermediate", trendingCount: 9, rating: 4.4 },
  { name: "Excel to Advanced Analytics", tags: ["excel", "analytics", "data"], level: "Beginner", trendingCount: 7, rating: 4.1 },

  // 💾 Databases & Cloud
  { name: "Database Design and SQL", tags: ["database", "sql", "backend"], level: "Beginner", trendingCount: 10, rating: 4.2 },
  { name: "MongoDB for Developers", tags: ["database", "mongodb", "backend"], level: "Intermediate", trendingCount: 8, rating: 4.3 },
  { name: "Cloud Computing with AWS", tags: ["cloud", "aws", "devops"], level: "Intermediate", trendingCount: 22, rating: 4.8 },
  { name: "Azure Fundamentals", tags: ["cloud", "azure"], level: "Beginner", trendingCount: 13, rating: 4.3 },

  // 🔐 Cyber Security
  { name: "Cyber Security Basics", tags: ["security", "network", "hacking"], level: "Intermediate", trendingCount: 15, rating: 4.5 },
  { name: "Ethical Hacking for Beginners", tags: ["security", "hacking", "cyber"], level: "Beginner", trendingCount: 12, rating: 4.4 },
  { name: "Network Security Essentials", tags: ["network", "security"], level: "Intermediate", trendingCount: 8, rating: 4.2 },

  // 📱 Mobile App Development
  { name: "Android App Development with Kotlin", tags: ["mobile", "android", "kotlin"], level: "Intermediate", trendingCount: 9, rating: 4.3 },
  { name: "iOS App Development with Swift", tags: ["mobile", "ios", "swift"], level: "Intermediate", trendingCount: 6, rating: 4.1 },
  { name: "Flutter for Cross-Platform Apps", tags: ["mobile", "flutter", "dart"], level: "Intermediate", trendingCount: 10, rating: 4.4 },

  // ⚙️ DevOps & Tools
  { name: "DevOps with Docker & Kubernetes", tags: ["devops", "docker", "kubernetes", "cloud"], level: "Advanced", trendingCount: 19, rating: 4.7 },
  { name: "CI/CD Pipelines with GitHub Actions", tags: ["devops", "git", "ci/cd"], level: "Intermediate", trendingCount: 11, rating: 4.3 },

  // 🧠 Other Fields
  { name: "Blockchain Fundamentals", tags: ["blockchain", "crypto", "web3"], level: "Intermediate", trendingCount: 14, rating: 4.5 },
  { name: "UI/UX Design Essentials", tags: ["design", "ui", "ux", "figma"], level: "Beginner", trendingCount: 12, rating: 4.2 },
  { name: "Game Development with Unity", tags: ["game", "unity", "csharp"], level: "Intermediate", trendingCount: 10, rating: 4.3 },
  { name: "Internet of Things (IoT) Basics", tags: ["iot", "hardware", "sensor"], level: "Beginner", trendingCount: 8, rating: 4.1 },
  { name: "AR & VR Development", tags: ["ar", "vr", "3d"], level: "Advanced", trendingCount: 7, rating: 4.4 }
];

// ⚡ Auto-update trending count every 5 sec
setInterval(() => {
  courses.forEach(c => {
    c.trendingCount += Math.floor(Math.random() * 3);
  });
}, 5000);

// 🎯 Recommendation API
app.post("/recommend", (req, res) => {
  const interests = req.body.interests.map(i => i.trim().toLowerCase());
  const matched = courses.filter(course =>
    course.tags.some(tag => interests.includes(tag))
  );

  if (matched.length === 0) {
    return res.json({ recommendations: [{ name: "No Match Found", tags: [], level: "N/A" }] });
  }

  res.json({ recommendations: matched });
});

// 🔥 Trending Courses API
app.get("/trending", (req, res) => {
  const trending = [...courses]
    .sort((a, b) => b.trendingCount - a.trendingCount)
    .slice(0, 5);
  res.json(trending);
});

// ⭐ Top Rated Courses API
app.get("/top-rated", (req, res) => {
  const topRated = [...courses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
  res.json(topRated);
});


// 🚀 Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
