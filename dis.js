document.addEventListener('DOMContentLoaded', function() {
    // Handle disaster report form submission
    const disasterForm = document.getElementById('disasterForm');
    disasterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const disasterName = document.getElementById('disasterName').value;
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;
        // Submit the report (you can integrate your backend logic here)
        console.log('Disaster Report Submitted:', { disasterName, location, description });
        alert('Disaster report submitted successfully!');
        disasterForm.reset();
    });

    // Fetch live disaster updates
    async function fetchLiveUpdates() {
        try {
            const response = await fetch('https://api.example.com/live-disaster-updates'); // Replace with your API endpoint
            const data = await response.json();
            const newsContainer = document.getElementById('news-container');
            newsContainer.innerHTML = '';
            data.updates.forEach(update => {
                const updateElement = document.createElement('div');
                updateElement.className = 'update';
                updateElement.innerHTML = `
                    <h3>${update.title}</h3>
                    <p>${update.description}</p>
                `;
                newsContainer.appendChild(updateElement);
            });
        } catch (error) {
            console.error('Error fetching live updates:', error);
        }
    }

    // Initialize Google Map
    window.initMap = function() {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 20.5937, lng: 78.9629 }, // Centered on India
            zoom: 5
        });

        // Add a marker on click
        map.addListener('click', function(event) {
            placeMarker(event.latLng, map);
        });

        // Get precise location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
                placeMarker(pos, map);
            }, function() {
                handleLocationError(true, map.getCenter(), map);
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, map.getCenter(), map);
        }
    };

    function placeMarker(location, map) {
        const marker = new google.maps.Marker({
            position: location,
            map: map
        });
        map.panTo(location);
    }

    function handleLocationError(browserHasGeolocation, pos, map) {
        const infoWindow = new google.maps.InfoWindow({ map: map });
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }

    // Fetch live updates on page load
    fetchLiveUpdates();
});


document.addEventListener("DOMContentLoaded", function () {
    const alertBar = document.getElementById("alertBar");

    // Sample alerts (Replace with dynamic fetching if needed)
    const alerts = [
        "🔔 Earthquake detected in Tibet | 3.6 Magnitude",
        "🔔 Flood Warning in Myanmar | Stay Alert",
        "🔔 Storm approaching Afghanistan | Take Precautions",
        "🔔 Landslide risk in Uttarkashi, Uttarakhand"
    ];

    function updateAlerts() {
        alertBar.innerHTML = "";
        alerts.forEach(alert => {
            const alertSpan = document.createElement("span");
            alertSpan.classList.add("alert-message");
            alertSpan.textContent = alert;
            alertBar.appendChild(alertSpan);
        });
    }

    updateAlerts();
});
        // Sample data
        const mockData = {
            alert: {
                type: 'Flood Warning',
                location: 'Downtown Area',
                description: 'Rising water levels observed. Please move to higher ground.',
                time: new Date().toLocaleTimeString()
            },
            resources: [
                { type: 'Shelter', location: 'Central High School', distance: '0.8 km' },
                { type: 'Medical', location: 'City Hospital', distance: '1.2 km' },
                { type: 'Supplies', location: 'Relief Center', distance: '1.5 km' }
            ],
            communityStatus: {
                checkedIn: 245,
                total: 300
            }
        };

        // Initialize the app
        function initApp() {
            updateAlert();
            updateResources();
            updateCommunityStatus();
            // Simulate real-time updates
            setInterval(updateAlert, 5000);
        }

        // Update alert banner
        function updateAlert() {
            const alertMessage = document.getElementById('alertMessage');
            alertMessage.innerHTML = `
                <strong>${mockData.alert.type}</strong> - ${mockData.alert.location}<br>
                ${mockData.alert.description}<br>
                <small>Last updated: ${mockData.alert.time}</small>
            `;
        }

        // Update resources list
        function updateResources() {
            const resourceList = document.getElementById('resourceList');
            resourceList.innerHTML = mockData.resources.map(resource => `
                <div class="resource-item">
                    <div>
                        <strong>${resource.type}</strong><br>
                        <small>${resource.location}</small>
                    </div>
                    <div>${resource.distance}</div>
                </div>
            `).join('');
        }

        // Update community status
        function updateCommunityStatus() {
            const { checkedIn, total } = mockData.communityStatus;
            document.getElementById('checkedInCount').textContent = `${checkedIn}/${total}`;
            document.getElementById('checkedInProgress').style.width = `${(checkedIn/total) * 100}%`;
        }

        // SOS function
        function triggerSOS() {
            alert('SOS signal sent! Emergency services have been notified.');
        }

        // Share location function
        function shareLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        alert(`Location shared!\nLat: ${position.coords.latitude}\nLong: ${position.coords.longitude}`);
                    },
                    error => {
                        alert('Error getting location. Please enable location services.');
                    }
                );
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        }

        // Get help function
        function getHelp() {
            const helpTypes = ['Medical', 'Supplies', 'Evacuation', 'Other'];
            const helpType = prompt(`What type of help do you need?\n${helpTypes.join(', ')}`);
            if (helpType) {
                alert(`Help request for ${helpType} has been registered. Help is on the way!`);
            }
        }

        // Initialize the app when page loads
        window.onload = initApp;