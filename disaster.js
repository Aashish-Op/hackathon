document.addEventListener('DOMContentLoaded', function() {
    const disasterForm = document.getElementById('disasterForm');
    const reportsList = document.getElementById('reportsList');

    disasterForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const disasterName = document.getElementById('disasterName').value;
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;

        const report = {
            name: disasterName,
            location: location,
            description: description
        };

        appendReport(report);
        alert('Disaster report submitted successfully!');
        disasterForm.reset();
    });

    function appendReport(report) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h3>${report.name}</h3>
            <p><strong>Location:</strong> ${report.location}</p>
            <p>${report.description}</p>
        `;
        reportsList.appendChild(listItem);
    }

    window.initMap = function() {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 20.5937, lng: 78.9629 }, // Centered on India
            zoom: 5
        });

        map.addListener('click', function(event) {
            placeMarker(event.latLng, map);
        });

        function placeMarker(location, map) {
            new google.maps.Marker({
                position: location,
                map: map
            });
            map.panTo(location);
        }
    };
});
