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

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Map initialization script with OSM
window.addEventListener('load', function() {
    console.log('Page loaded, initializing map...');
    
    // Berlin coordinates
    const berlinLat = 52.5200;
    const berlinLng = 13.4050;
    
    const mapElement = document.getElementById('berlin-map');
    if (mapElement) {
        // Initialize map with zoom level 10 (shows more of Berlin)
        const map = L.map('berlin-map').setView([berlinLat, berlinLng], 10);
        
        // Add standard OpenStreetMap tiles (light theme)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            
        }).addTo(map);
        
        // Add standard red marker (or use green to match your theme)
        const marker = L.marker([berlinLat, berlinLng]).addTo(map);
        marker.bindPopup('<b>Berlin, Germany</b><br>📍 Based here').openPopup();
        
        // Force map to refresh
        setTimeout(function() {
            map.invalidateSize();
        }, 200);
        
        console.log('OSM map initialized successfully!');
    }
});