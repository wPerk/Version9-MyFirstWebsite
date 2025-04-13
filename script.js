const menuIcon = document.querySelector('.menu-icon');
const dropdown = document.querySelector('.dropdown');
const progressBar = document.getElementById('myProgressBar');

// Function to toggle the visibility of the dropdown
function toggleDropdown() {
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
}

function updateProgressBar() {                                                                                  // Function to update the progress bar
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;                              // Get the current scroll position
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;           // Get the total height of the page
    var scrolled = (scrollTop / scrollHeight) * 100;                                                            // Calculate the percentage scrolled
    progressBar.style.width = scrolled + "%";                                                                   // Update the width of the progress bar
}

// Event listener for the menu icon click
menuIcon.addEventListener('click', function (event) {
    toggleDropdown();
    event.stopPropagation(); // Prevent the event from propagating to the document
});

// Event listener for clicking anywhere on the document to close the dropdown
document.addEventListener('click', function (event) {
    if (!dropdown.contains(event.target) && event.target !== menuIcon) {
        dropdown.style.display = 'none'; // Close the dropdown if clicked outside
    }
});

window.onscroll = function () {
    console.log('Scroll event triggered'); // Check if this logs
    const progressBar = document.getElementById('myProgressBar');
    if (progressBar) {
        updateProgressBar();
    } else {
        console.error('Progress bar not found on this page.');
    }
    updateProgressBar();
};
