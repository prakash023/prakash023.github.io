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

// Modal functions
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
    const canvas = document.getElementById("gridCanvas");
    const hero = document.querySelector(".hero");
    if (!canvas || !hero) return;
    
    const ctx = canvas.getContext("2d");
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = hero.offsetHeight;
    }
    
    window.addEventListener("resize", resizeCanvas);
    
    let time = 0;
    
    function noise(x, y) {
        return Math.sin(x * 0.02) * Math.cos(y * 0.02) + 
               Math.sin(x * 0.03 + time) * Math.cos(y * 0.03) * 0.5;
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 1.2;
        
        for (let y = 0; y < canvas.height; y += 20) {
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x += 5) {
                const n = noise(x + time * 10, y);
                const py = y + (n * 30);
                if (x === 0) ctx.moveTo(x, py);
                else ctx.lineTo(x, py);
            }
            ctx.strokeStyle = `rgba(100, 200, 255, 0.5)`;
            ctx.stroke();
        }
        
        time += 0.05;
        requestAnimationFrame(draw);
    }
    
    resizeCanvas();
    draw();
}

// Initialize
document.addEventListener("DOMContentLoaded", function() {
    initTopAnimation();
    setTimeout(initMap, 500);
});

window.addEventListener("load", function() {
    setTimeout(initMap, 200);
    setTimeout(initMap, 1000);
});

// Force map on mobile orientation change
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        const map = document.getElementById('berlin-map');
        if (map && map._leaflet_id) {
            map._leaflet_map.invalidateSize();
        } else {
            initMap();
        }
    }, 300);
});