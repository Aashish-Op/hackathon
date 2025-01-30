document.addEventListener('DOMContentLoaded', function() {
    const donationForm = document.getElementById('donationForm');

    donationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const donorName = document.getElementById('donorName').value;
        const donorEmail = document.getElementById('donorEmail').value;
        const donationAmount = document.getElementById('donationAmount').value;
        const donationType = document.getElementById('donationType').value;
        const message = document.getElementById('message').value;

        console.log('Donation Submitted:');
        console.log('Name:', donorName);
        console.log('Email:', donorEmail);
        console.log('Amount:', donationAmount);
        console.log('Type:', donationType);
        console.log('Message:', message);

        alert('Thank you for your generous donation!');
        donationForm.reset();
    });
});
