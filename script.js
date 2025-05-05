const menuIcon = document.querySelector('.menu-icon');
const dropdown = document.querySelector('.dropdown');
const progressBar = document.getElementById('myProgressBar');
const toggleBtns = document.querySelectorAll('.toggle-btn');
const collapsibles = document.querySelectorAll('.collapsible');
const collapseAllBtn = document.getElementById('collapse-btn');
var counter = 0;

function goHome() {
    window.location.href = "home.html";                                                                         // Redirect to home page
}

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

function updateContainerSizes() {
    const contentContainer = document.querySelector(".content-container");
    const contentRect = contentContainer.getBoundingClientRect();                                               // Get current dimensions
    const contentSizeText = `${Math.round(contentRect.width)}px x ${Math.round(contentRect.height)}px`;         // Format as "width x height"

    document.getElementById("size-display-content").textContent = contentSizeText;                              // Display values inside the containers (or in a separate element)
}

// Event listener for the menu icon click
menuIcon.addEventListener('click', function (event) {
    toggleDropdown();
    event.stopPropagation();                                                                                    // Prevent the event from propagating to the document
});

// Event listener for clicking anywhere on the document to close the dropdown
document.addEventListener('click', function (event) {
    if (!dropdown.contains(event.target) && event.target !== menuIcon) {
        dropdown.style.display = 'none';                                                                        // Close the dropdown if clicked outside
    }
});

toggleBtns.forEach((button, index) => {
    button.addEventListener('click', () => {
        const collapsible = collapsibles[index];

        if (collapsible.style.maxHeight && collapsible.style.maxHeight !== "0px") {
            collapsible.style.maxHeight = "0px";                                                                // Collapse
        } else {
            collapsible.style.maxHeight = collapsible.scrollHeight + "px";                                      // Expand
        }
    });
});

if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
        const isCollapsing = collapseAllBtn.textContent === 'Collapse All';
        collapseAllBtn.textContent = isCollapsing ? 'Expand All' : 'Collapse All';

        collapsibles.forEach((collapsible) => {
            if (counter % 2 == 0) {                                                                             //even
                collapsible.style.maxHeight = "0px";
            }
            else if (counter % 2 != 0) {                                                                        //odd
                collapsible.style.maxHeight = collapsible.scrollHeight + "px";
            }
            else if (counter == 0) {                                                                            //1st iteration
                collapsible.style.maxHeight = "0px";
            }
        });
        counter += 1;       /* I should probably clear this counter every so often */
    });
}

window.onscroll = function () {
    if (progressBar) {
        updateProgressBar();
    } else {
        console.error("Progress bar with ID 'myProgressBar' not found on this page.");
    }
};

// Run on page load and when the window resizes
window.addEventListener("load", updateContainerSizes);
window.addEventListener("resize", updateContainerSizes);
