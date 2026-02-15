/* ===============================
   PROJECT MODAL DATA - YOUR ORIGINAL PROJECTS
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
    },
    earthflow: {
        image: "images/Air_earthwithin.gif",
        title: "Earth Air Flow 3D",
        description: "3D visualization of atmospheric circulation patterns.",
        tools: "Tools: Three.js · WebGL · Climate Data",
        link: "https://github.com/prakash023"
    }
};

/* ===============================
   MODAL FUNCTIONS
================================= */

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
        document.body.style.overflow = "hidden";
    }
}

function closeModal() {
    document.getElementById("projectModal").style.display = "none";
    document.body.style.overflow = "auto";
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

window.addEventListener("click", function(event) {
    const modal = document.getElementById("projectModal");
    if (event.target === modal) {
        closeModal();
    }
});

/* ================================
   LEAFLET MAP - IMPROVED FOR MOBILE
================================= */

function initMap() {
    const mapElement = document.getElementById("berlin-map");
    if (!mapElement || typeof L === "undefined") return;

    // Clear any existing map
    mapElement.innerHTML = '';

    // Ensure the map container has dimensions
    if (mapElement.clientWidth === 0 || mapElement.clientHeight === 0) {
        console.log("Map container has zero size, waiting...");
        setTimeout(initMap, 200);
        return;
    }

    // Create map with explicit size handling
    const map = L.map("berlin-map", {
        dragging: true,              // Enable dragging on mobile
        touchZoom: true,              // Enable touch zoom on mobile
        scrollWheelZoom: false,
        doubleClickZoom: true,
        boxZoom: true,
        tap: true,
        keyboard: false,
        zoomControl: true,            // Enable zoom controls on mobile
        attributionControl: true
    }).setView([52.5200, 13.4050], 11);
    
    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap',
        maxZoom: 19,
        detectRetina: true
    }).addTo(map);
    
    // Add marker
    L.marker([52.5200, 13.4050]).addTo(map)
        .bindPopup("<b>Berlin, Deutschland</b><br>📍 Based here")
        .openPopup();
    
    // Force map to recalculate size after a short delay
    setTimeout(() => {
        map.invalidateSize(true);
        console.log("Map size invalidated");
    }, 300);

    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            map.invalidateSize(true);
        }, 300);
    });

    // Handle resize events
    window.addEventListener('resize', function() {
        setTimeout(() => {
            map.invalidateSize(true);
        }, 100);
    });

    return map;
}

/* ================================
   MOBILE MAP FIX
================================= */

function ensureMapLoads() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        console.log("Mobile device detected, ensuring map loads...");
        // Force map to initialize after DOM is fully ready
        setTimeout(() => {
            if (document.getElementById("berlin-map")) {
                // Clear and reinitialize map
                initMap();
            }
        }, 500);
    }
}

/* ===============================
   SIMPLE BUT ATTRACTIVE TOP ANIMATION
================================= */

function initTopAnimation() {
    const canvas = document.getElementById("gridCanvas");
    const hero = document.querySelector(".hero");
    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth * 0.5;
        canvas.height = hero.offsetHeight;
        console.log("Canvas resized:", canvas.width, "x", canvas.height);
    }

    window.addEventListener("resize", resizeCanvas);

    let time = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    window.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    // Simple Perlin noise function to simulate elevation
    function noise(x, y) {
        return Math.sin(x * 0.02) * Math.cos(y * 0.02) + 
               Math.sin(x * 0.03 + time) * Math.cos(y * 0.03) * 0.5;
    }

    // Function to draw contour lines based on Perlin noise
    function drawContours() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.lineWidth = 1.2;

        // Loop through the canvas to generate contour lines
        for (let y = 0; y < canvas.height; y += 20) {
            ctx.beginPath();

            // Loop through each point in the row and generate noise
            for (let x = 0; x < canvas.width; x += 5) {
                const n = noise(x + time * 10, y);
                const offset = n * 30;
                const py = y + offset;

                // Move to the first point
                if (x === 0) ctx.moveTo(x, py);
                else ctx.lineTo(x, py);
            }

            // Choose a color based on the elevation (Perlin noise value)
            const colorFactor = Math.sin(time * 0.01) * 0.5 + 0.5;
            ctx.strokeStyle = `rgba(${Math.floor(255 * colorFactor)}, ${Math.floor(255 * (1 - colorFactor))}, 255, 0.5)`;

            ctx.stroke();
        }
    }

    // Function to animate the contour lines
    function animate() {
        time += 0.05;
        drawContours();
        requestAnimationFrame(animate);
    }

    animate();
    console.log("Animation started!");

    resizeCanvas();
}

/* ================================
   INITIALIZE EVERYTHING
================================= */

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded, initializing...");
    initMap();
    initTopAnimation();
    ensureMapLoads();
});

// Also run when window loads (ensures all resources are ready)
window.addEventListener("load", function() {
    ensureMapLoads();
});