/* ===============================
   PROJECT MODAL
================================= */

const projects = {
    ahrensfelde: {
        image: "images/Ahrensfelde Berg.png",
        title: "Ahrensfelde Terrain Analysis",
        description: "Digital elevation modelling using EU-DEM. Contour analysis and slope interpretation in QGIS.",
        tools: "Tools: QGIS · Raster Analysis · Terrain Modelling",
        link: "https://github.com/prakash023"
    },
    malta: {
        image: "images/Malta_CellTower_Option3_Preview.png",
        title: "Malta Urban Density",
        description: "Hexagonal aggregation of OpenStreetMap building data for urban density modelling.",
        tools: "Tools: Python · GeoPandas · Spatial Aggregation",
        link: "https://github.com/prakash023"
    },
    germanyrail: {
        image: "images/Eisenbahnnetz-Deutschland2025.png",
        title: "Germany Railway Network Density",
        description: "Infrastructure density modelling using national railway data.",
        tools: "Tools: QGIS · Network Analysis",
        link: "https://github.com/prakash023"
    },
    walkability: {
        image: "images/Walkability.png",
        title: "Urban Walkability Modelling",
        description: "10, 20 and 30 minute accessibility modelling using spatial network analysis.",
        tools: "Tools: QGIS · Network Analysis · OSM",
        link: "https://github.com/prakash023"
    },
    nepal: {
        image: "images/Nepal_Nationalparks and its connection wth main Roadway.png",
        title: "Nepal National Parks & Infrastructure",
        description: "Spatial interaction between protected areas and transport networks.",
        tools: "Tools: QGIS · Spatial Overlay · Infrastructure Data",
        link: "https://github.com/prakash023"
    },
    kathmandu: {
        image: "images/Kathmandu_Urban.jpeg",
        title: "Kathmandu Urban Mapping",
        description: "Urban landmark cartography with thematic representation.",
        tools: "Tools: QGIS · Cartography",
        link: "https://github.com/prakash023"
    }
};

function openModal(projectKey) {
    const modal = document.getElementById("projectModal");
    const project = projects[projectKey];

    if (project) {
        document.getElementById("modalImage").src = project.image;
        document.getElementById("modalTitle").textContent = project.title;
        document.getElementById("modalDescription").textContent = project.description;
        document.getElementById("modalTools").textContent = project.tools;
        document.getElementById("modalLink").href = project.link;

        modal.style.display = "flex";
    }
}

function closeModal() {
    document.getElementById("projectModal").style.display = "none";
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});


/* ===============================
   LEAFLET MAP
================================= */

window.addEventListener("load", function () {
    const berlinLat = 52.5200;
    const berlinLng = 13.4050;

    const mapElement = document.getElementById("berlin-map");

    if (mapElement && typeof L !== "undefined") {
        const map = L.map("berlin-map").setView([berlinLat, berlinLng], 10);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        L.marker([berlinLat, berlinLng])
            .addTo(map)
            .bindPopup("<b>Berlin, Germany</b><br>📍 Based here")
            .openPopup();

        setTimeout(() => map.invalidateSize(), 200);
    }

    initHeroAnimation();
});


/* ===============================
   HERO CANVAS ANIMATION
================================= */

function initHeroAnimation() {
    const canvas = document.getElementById("ballCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let balls = [];
    let particles = [];
    const maxBalls = 20;

    function createBall() {
        balls.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 12 + Math.random() * 8,
            dx: (Math.random() - 0.5) * 1.5,
            dy: (Math.random() - 0.5) * 1.5,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`
        });
    }

    function createExplosion(x, y, color) {
        for (let i = 0; i < 20; i++) {
            particles.push({
                x: x,
                y: y,
                size: 2 + Math.random() * 3,
                dx: (Math.random() - 0.5) * 6,
                dy: (Math.random() - 0.5) * 6,
                life: 70,
                gravity: 0.12,
                color: color
            });
        }
    }

    for (let i = 0; i < maxBalls; i++) {
        createBall();
    }

    canvas.addEventListener("mousemove", function (e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        balls = balls.filter(ball => {
            const distance = Math.sqrt(
                (mouseX - ball.x) ** 2 +
                (mouseY - ball.y) ** 2
            );

            if (distance <= ball.radius) {
                createExplosion(ball.x, ball.y, ball.color);

                setTimeout(() => {
                    createBall();
                }, 300);

                return false;
            }

            return true;
        });
    });

    function drawBall(ball) {
        ctx.shadowColor = ball.color;
        ctx.shadowBlur = 12;
        
        
        
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();

        ctx.shadowBlur = 0;
    }

    function drawParticle(p) {
        ctx.globalAlpha = p.life / 70;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 1;
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        balls.forEach(ball => {
            ball.x += ball.dx;
            ball.y += ball.dy;

            if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
                ball.dx *= -1;
            }

            if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
                ball.dy *= -1;
            }

            drawBall(ball);
        });

        particles = particles.filter(p => p.life > 0);

        particles.forEach(p => {
            p.dy += p.gravity;
            p.x += p.dx;
            p.y += p.dy;
            p.life--;
            drawParticle(p);
        });

        requestAnimationFrame(update);
    }

    update();
}
/* ===============================
   GIF HOVER SWAP
================================= */

document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(".card").forEach(card => {

        const img = card.querySelector("img");
        const staticSrc = card.getAttribute("data-static");
        const gifSrc = card.getAttribute("data-gif");

        console.log("GIF swap script running"); 


        if (gifSrc && staticSrc) {

            card.addEventListener("mouseenter", () => {
                img.src = gifSrc;
            });

            card.addEventListener("mouseleave", () => {
                img.src = staticSrc;
            });

        }

    });

});

/* ===============================
   HERO CANVAS ANIMATION
================================= */
/* ===============================
   HERO CANVAS ANIMATION
================================= */

document.addEventListener("DOMContentLoaded", function () {

    const canvas = document.getElementById("ballCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let balls = [];
    let particles = [];
    const maxBalls = 20;

    function createBall() {
        balls.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 12 + Math.random() * 8,
            dx: (Math.random() - 0.5) * 1.8,
            dy: (Math.random() - 0.5) * 1.8,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`
        });
    }

    function createExplosion(x, y, color) {
        for (let i = 0; i < 20; i++) {
            particles.push({
                x,
                y,
                size: 2 + Math.random() * 3,
                dx: (Math.random() - 0.5) * 6,
                dy: (Math.random() - 0.5) * 6,
                life: 60,
                gravity: 0.12,
                color
            });
        }
    }

    for (let i = 0; i < maxBalls; i++) {
        createBall();
    }

    canvas.addEventListener("mousemove", function (e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        balls = balls.filter(ball => {
            const distance = Math.sqrt(
                (mouseX - ball.x) ** 2 +
                (mouseY - ball.y) ** 2
            );

            if (distance <= ball.radius) {
                createExplosion(ball.x, ball.y, ball.color);

                setTimeout(createBall, 300);
                return false;
            }

            return true;
        });
    });

    function drawBall(ball) {
        ctx.shadowColor = ball.color;
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();

        ctx.shadowBlur = 0;
    }

    function drawParticle(p) {
        ctx.globalAlpha = p.life / 60;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 1;
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        balls.forEach(ball => {
            ball.x += ball.dx;
            ball.y += ball.dy;

            if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
                ball.dx *= -1;
            }

            if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
                ball.dy *= -1;
            }

            drawBall(ball);
        });

        particles = particles.filter(p => p.life > 0);

        particles.forEach(p => {
            p.dy += p.gravity;
            p.x += p.dx;
            p.y += p.dy;
            p.life--;
            drawParticle(p);
        });

        requestAnimationFrame(update);
    }

    update();
});
