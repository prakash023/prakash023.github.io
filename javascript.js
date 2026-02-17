// Project data
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
        
    },
    earthflow: {
        image: "images/Air_earthwithin.gif",
        title: "Earth Air Flow 3D",
        description: "3D visualization of atmospheric circulation patterns.",
        tools: "Tools: Three.js · WebGL · Climate Data",
        link: "https://github.com/prakash023"
    },
    nile: {
    image: "images/nile.jpeg",
    title: "Nile Egypt Night Map",
    description: "High-resolution vertical visualization of the Nile corridor showing urban concentration and spatial morphology along the river system.",
    tools: "Tools: Remote Sensing · Cartography · Raster Visualization",
    
    },

    Itahari_c: {
    image: "images/Itahari_c.png",
    title: "Itahari Urban",
    description: "Urban core Itahari visualisation...",
    tools: "Tools: QGIS · Cartography"
},

dharan3d: {
    image: "images/Dharan, Nepal-3D.png",
    title: "Dharan, Nepal - 3D",
    description: "3D visualization of Dharan Nepal.",
    tools: "Tools: QGIS · 3D Modeling"
}




};

// Modal functions
function openModal(projectKey) {
    const modal = document.getElementById("projectModal");
    const modalContent = document.querySelector(".modal-content");
    const modalLink = document.getElementById("modalLink");
    const project = projects[projectKey];

    if (!project) return;

    document.getElementById("modalImage").src = project.image;
    document.getElementById("modalTitle").textContent = project.title;
    document.getElementById("modalDescription").textContent = project.description;
    document.getElementById("modalTools").textContent = project.tools;

    modalContent.classList.remove("kathmandu-full");

    if (!project.link) {
        // Full preview mode
        modalContent.classList.add("kathmandu-full");
        modalLink.style.display = "none";
    } else {
        // Normal mode
        modalLink.style.display = "inline-block";
        modalLink.href = project.link;
    }

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}




function closeModal() {
    const modal = document.getElementById("projectModal");
    const modalContent = document.querySelector(".modal-content");

    modal.style.display = "none";
    modalContent.classList.remove("kathmandu-full");
    document.body.style.overflow = "auto";
}


document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
window.addEventListener("click", (e) => { if (e.target === document.getElementById("projectModal")) closeModal(); });

// Map initialization
function initMap() {
    console.log("Initializing map...");
    
    const mapElement = document.getElementById('berlin-map');
    if (!mapElement) { console.error("Map element not found"); return; }
    if (typeof L === 'undefined') { console.error("Leaflet not loaded"); return; }
    
    try {
        const map = L.map('berlin-map').setView([52.52, 13.405], 11);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);
        
        L.marker([52.52, 13.405]).addTo(map)
            .bindPopup('<b>Berlin, Deutschland</b><br>📍 Based here')
            .openPopup();
        
        setTimeout(() => map.invalidateSize(), 300);
        console.log("Map created!");
        return map;
    } catch (error) {
        console.error("Map error:", error);
    }
}

// Top animation
function initTopAnimation() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "1";
    canvas.style.pointerEvents = "none";

    hero.insertBefore(canvas, hero.firstChild);

    const ctx = canvas.getContext("2d");
    let time = 0;

    function resize() {
        canvas.width = hero.clientWidth;
        canvas.height = hero.clientHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height * 0.55;

        const maxRadius = Math.max(canvas.width, canvas.height) * 0.85;
        const spacing = 20;

        // 🌄 Elevation glow background
        const gradient = ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            maxRadius
        );

        gradient.addColorStop(0, "rgba(88,150,50,0.18)");
        gradient.addColorStop(0.4, "rgba(88,150,50,0.10)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 🗻 Terrain contours
        for (let r = spacing; r < maxRadius; r += spacing) {

            ctx.beginPath();

            for (let angle = 0; angle <= Math.PI * 2; angle += 0.015) {

                const terrain =
                    Math.sin(angle * 2 + r * 0.02 + time * 0.4) * 12 +
                    Math.cos(angle * 3 - r * 0.015 - time * 0.3) * 9 +
                    Math.sin(r * 0.05 + time * 0.5) * 5;

                const radius = r + terrain;

                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);

                if (angle === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }

            ctx.closePath();

            const depthFade = 0.2 + (r / maxRadius) * 0.4;
            ctx.strokeStyle = `rgba(88,150,50,${depthFade})`;
            ctx.lineWidth = 1.3;

            ctx.stroke();
        }

        time += 0.015; // slow but visible motion
        requestAnimationFrame(draw);
    }

    draw();
}




//Second animation 
function initProjectsBackground() {
    const section = document.querySelector(".projects");
    if (!section) return;

    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.classList.add("projects-bg-canvas");
    section.prepend(canvas);

    const ctx = canvas.getContext("2d");
    let time = 0;

    function resize() {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        ctx.strokeStyle = "rgba(88,150,50,0.15)";
        ctx.lineWidth = 1;

        for (let y = 0; y < h; y += 30) {
            ctx.beginPath();
            for (let x = 0; x < w; x += 8) {
                const wave = Math.sin(x * 0.02 + time) * 10;
                if (x === 0) ctx.moveTo(x, y + wave);
                else ctx.lineTo(x, y + wave);
            }
            ctx.stroke();
        }

        time += 0.01;
        requestAnimationFrame(draw);
    }

    draw();
}




// Initialize
function initProjectsRubberContours() {
    const section = document.querySelector(".projects");
    if (!section) return;

    const canvas = document.createElement("canvas");
    canvas.classList.add("projects-bg-canvas");
    section.prepend(canvas);

    const ctx = canvas.getContext("2d");

    let time = 0;
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };

    function resize() {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    section.addEventListener("mousemove", (e) => {
        const rect = section.getBoundingClientRect();
        targetMouse.x = e.clientX - rect.left;
        targetMouse.y = e.clientY - rect.top;
    });

    section.addEventListener("mouseleave", () => {
        targetMouse.x = -1000;
        targetMouse.y = -1000;
    });

    function draw() {
        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        mouse.x += (targetMouse.x - mouse.x) * 0.08;
        mouse.y += (targetMouse.y - mouse.y) * 0.08;

        const pulse = 0.15 + Math.sin(time * 2) * 0.05;
        ctx.strokeStyle = `rgba(88,150,50,${pulse})`;

        ctx.lineWidth = 1;

        for (let y = 0; y < h; y += 25) {
            ctx.beginPath();

            for (let x = 0; x < w; x += 6) {

                const dx = x - mouse.x;
                const dy = y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const influence = 120;
                const distortion = Math.exp(-distance / influence) * 40;

                const wave =
                    Math.sin(x * 0.015 + time) * 15 +
                    Math.cos(y * 0.01 + time * 0.6) * 8 +
                    distortion;

                if (x === 0) ctx.moveTo(x, y + wave);
                else ctx.lineTo(x, y + wave);
            }

            ctx.stroke();
        }

        time += 0.01;
        requestAnimationFrame(draw);
    }

    draw();
}

//Animation 3 for beispielsweise Projekte section

function initProjectsCityGlow() {
    const section = document.querySelector(".projects");
    if (!section) return;

    const canvas = document.createElement("canvas");
    canvas.classList.add("projects-bg-canvas");
    section.prepend(canvas);

    const ctx = canvas.getContext("2d");

    let particles = [];
    let time = 0;

    function resize() {
        // Use scrollHeight to capture full dynamic height
        canvas.width = section.offsetWidth;
        canvas.height = section.scrollHeight;

        // Rebuild particles so they fill full new area
        particles = [];
        const density = Math.floor((canvas.width * canvas.height) / 15000);

        for (let i = 0; i < density; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.4 + 0.8,
                pulseSpeed: Math.random() * 0.01 + 0.003,
                pulseOffset: Math.random() * Math.PI * 2,
                driftX: (Math.random() - 0.5) * 0.04,
                driftY: (Math.random() - 0.5) * 0.04
            });
        }
    }

    resize();
    window.addEventListener("resize", resize);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {

            // Slow drift
            p.x += p.driftX;
            p.y += p.driftY;

            // Wrap edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            const pulse = 0.4 + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.3;

            const gradient = ctx.createRadialGradient(
                p.x, p.y, 0,
                p.x, p.y, p.radius * 6
            );

            gradient.addColorStop(0, `rgba(255, 210, 120, ${pulse})`);
            gradient.addColorStop(1, "rgba(255, 210, 120, 0)");

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 6, 0, Math.PI * 2);
            ctx.fill();
        });

        time += 0.5;
        requestAnimationFrame(animate);
    }

    animate();
}





//DOMContentLoaded listener.//
document.addEventListener("DOMContentLoaded", function() {
    initTopAnimation();
    initFloatingDots();
    initProjectsCityGlow();
    initProjectsBackground();
    initProjectsRubberContours();
    setTimeout(initMap, 500);
});


window.addEventListener("load", function() {
    setTimeout(initMap, 200);
    setTimeout(initMap, 1000);
});

// Force map on mobile orientation change
// Make sure your map initialization looks something like this:
document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('berlin-map', {
        center: [52.5200, 13.4050],
        zoom: 13,
        zoomControl: true,
        scrollWheelZoom: true, // Enable scroll wheel zoom
        dragging: true, // Enable dragging
        touchZoom: true, // Enable touch zoom
        doubleClickZoom: true,
        boxZoom: true,
        tap: true // Enable tap for mobile
    });
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add a marker
    L.marker([52.5200, 13.4050]).addTo(map)
        .bindPopup('Berlin, Germany')
        .openPopup();
});

function initProjectsRubberContours() {
    const section = document.querySelector(".projects");
    if (!section) return;

    const canvas = document.createElement("canvas");
    canvas.classList.add("projects-bg-canvas");
    section.prepend(canvas);

    const ctx = canvas.getContext("2d");

    let time = 0;
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };

    function resize() {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    section.addEventListener("mousemove", (e) => {
        const rect = section.getBoundingClientRect();
        targetMouse.x = e.clientX - rect.left;
        targetMouse.y = e.clientY - rect.top;
    });

    section.addEventListener("mouseleave", () => {
        targetMouse.x = -1000;
        targetMouse.y = -1000;
    });

    function draw() {
        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        // smooth mouse interpolation (rubber feel)
        mouse.x += (targetMouse.x - mouse.x) * 0.08;
        mouse.y += (targetMouse.y - mouse.y) * 0.08;

        ctx.strokeStyle = "rgba(88,150,50,0.18)";
        ctx.lineWidth = 1;

        for (let y = 0; y < h; y += 25) {
            ctx.beginPath();

            for (let x = 0; x < w; x += 6) {

                const dx = x - mouse.x;
                const dy = y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // rubber distortion strength
                const influence = 120;
                const distortion = Math.exp(-distance / influence) * 40;

                const wave =
                    Math.sin(x * 0.015 + time) * 15 +
                    Math.cos(y * 0.01 + time * 0.6) * 8 +
                    distortion;

                if (x === 0) ctx.moveTo(x, y + wave);
                else ctx.lineTo(x, y + wave);
            }

            ctx.stroke();
        }

        time += 0.01;
        requestAnimationFrame(draw);
    }

    draw();
}
/*Floating dots animation for hero section */
function initFloatingDots() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "2";

    hero.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let stars = [];
    let time = 0;

    function createStars() {
        stars = [];
        const starCount = Math.floor((canvas.width * canvas.height) / 15000);

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1.5,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulseOffset: Math.random() * Math.PI * 2
            });
        }
    }

    function resize() {
        canvas.width = hero.clientWidth;
        canvas.height = hero.clientHeight;
        createStars(); // regenerate stars for new width
    }

    resize();
    window.addEventListener("resize", resize);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            const pulse = 0.6 + Math.sin(time * star.pulseSpeed + star.pulseOffset) * 0.4;

            const gradient = ctx.createRadialGradient(
                star.x, star.y, 0,
                star.x, star.y, star.radius * 5
            );

            gradient.addColorStop(0, `rgba(255, 223, 120, ${pulse})`);
            gradient.addColorStop(1, "rgba(255, 223, 120, 0)");

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius * 5, 0, Math.PI * 2);
            ctx.fill();
        });

        time += 0.02;
        requestAnimationFrame(animate);
    }

    animate();
}


    initFloatingDots();


 /*Scroll reveal animation*/ 
 function initScrollReveal() {
    const elements = document.querySelectorAll(".card, .intro, .skills-section");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.6s ease";
        observer.observe(el);
    });
}
initScrollReveal();


function resizeGridItems() {
    const grid = document.querySelector(".grid");
    const rowHeight = parseInt(getComputedStyle(grid).getPropertyValue("grid-auto-rows"));
    const rowGap = parseInt(getComputedStyle(grid).getPropertyValue("gap"));

    grid.querySelectorAll(".card").forEach(item => {
        const img = item.querySelector("img");
        const contentHeight = img.getBoundingClientRect().height;
        const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = "span " + rowSpan;
    });
}

window.addEventListener("load", resizeGridItems);
window.addEventListener("resize", resizeGridItems);
