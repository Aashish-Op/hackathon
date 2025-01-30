// 🔍 Search Functionality
function filterResources() {
    let input = document.getElementById("search-bar").value.toLowerCase();
    let resources = document.querySelectorAll(".resource-section");

    resources.forEach(resource => {
        let title = resource.querySelector("h3").textContent.toLowerCase();
        if (title.includes(input)) {
            resource.style.display = "block";
        } else {
            resource.style.display = "none";
        }
    });
}
