// JavaScript for the Glossary Page
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const glossaryAccordion = document.getElementById('glossaryAccordion');
    const alphaIndex = document.getElementById('alpha-index');
    const searchInput = document.getElementById('glossary-search');
    
    // If elements don't exist, exit
    if (!glossaryAccordion || !alphaIndex) return;
    
    // Get all glossary items
    const glossaryItems = glossaryAccordion.querySelectorAll('.glossary-item');
    
    // Create alphabetical index
    createAlphabeticalIndex(glossaryItems);
    
    // Set up search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            filterGlossaryItems(query);
        });
    }
    
    // Handle direct navigation from URL hash
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Open the accordion and scroll to it
            const accordionButton = targetElement.previousElementSibling.querySelector('button');
            if (accordionButton && accordionButton.classList.contains('collapsed')) {
                accordionButton.click();
            }
            
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    }
    
    /**
     * Creates the alphabetical index based on glossary items
     * @param {NodeList} items - The glossary items
     */
    function createAlphabeticalIndex(items) {
        // Get first letters of all items
        const letters = new Set();
        items.forEach(item => {
            const button = item.querySelector('.accordion-button');
            if (button) {
                const firstLetter = button.textContent.trim()[0].toUpperCase();
                if (/[A-Z]/.test(firstLetter)) {
                    letters.add(firstLetter);
                }
            }
        });
        
        // Create the full alphabet
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let indexHtml = '';
        
        for (const letter of alphabet) {
            const hasItems = letters.has(letter);
            const cssClass = hasItems ? '' : 'disabled';
            
            indexHtml += `<a href="#" class="${cssClass}" data-letter="${letter}">${letter}</a>`;
        }
        
        // Add to the DOM
        alphaIndex.innerHTML = indexHtml;
        
        // Add event listeners
        const indexLinks = alphaIndex.querySelectorAll('a:not(.disabled)');
        indexLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                indexLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Filter items by letter
                const letter = this.getAttribute('data-letter');
                filterByLetter(letter);
                
                // Clear search input
                if (searchInput) {
                    searchInput.value = '';
                }
            });
        });
    }
    
    /**
     * Filters glossary items by starting letter
     * @param {string} letter - The letter to filter by
     */
    function filterByLetter(letter) {
        let hasVisibleItems = false;
        
        glossaryItems.forEach(item => {
            const button = item.querySelector('.accordion-button');
            if (button) {
                const firstLetter = button.textContent.trim()[0].toUpperCase();
                
                if (firstLetter === letter) {
                    item.classList.remove('hidden');
                    hasVisibleItems = true;
                } else {
                    item.classList.add('hidden');
                }
            }
        });
        
        // Show/hide "no results" message
        updateNoResultsMessage(hasVisibleItems);
    }
    
    /**
     * Filters glossary items by search query
     * @param {string} query - The search query
     */
    function filterGlossaryItems(query) {
        // Reset index active state
        const indexLinks = alphaIndex.querySelectorAll('a');
        indexLinks.forEach(l => l.classList.remove('active'));
        
        // If empty query, show all items
        if (!query) {
            glossaryItems.forEach(item => {
                item.classList.remove('hidden');
            });
            
            // Hide "no results" message
            updateNoResultsMessage(true);
            return;
        }
        
        let hasVisibleItems = false;
        
        // Filter items
        glossaryItems.forEach(item => {
            const searchData = item.getAttribute('data-term') || '';
            const buttonText = item.querySelector('.accordion-button').textContent.trim().toLowerCase();
            const bodyText = item.querySelector('.accordion-body').textContent.trim().toLowerCase();
            
            const searchContent = `${buttonText} ${bodyText} ${searchData}`.toLowerCase();
            
            if (searchContent.includes(query)) {
                item.classList.remove('hidden');
                hasVisibleItems = true;
            } else {
                item.classList.add('hidden');
            }
        });
        
        // Show/hide "no results" message
        updateNoResultsMessage(hasVisibleItems);
    }
    
    /**
     * Updates the visibility of the "No results" message
     * @param {boolean} hasVisibleItems - Whether there are visible items
     */
    function updateNoResultsMessage(hasVisibleItems) {
        // Remove existing message if it exists
        const existingMessage = document.querySelector('.no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Add message if no visible items
        if (!hasVisibleItems) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'no-results-message';
            messageDiv.innerHTML = `
                <i class="fas fa-search"></i>
                <h4>No matching tests found</h4>
                <p>Try adjusting your search terms or browse by category</p>
                <button class="btn btn-outline-secondary mt-3 reset-search">Show All Tests</button>
            `;
            
            // Add after the alphabet index
            alphaIndex.parentNode.insertAdjacentElement('afterend', messageDiv);
            
            // Add event listener to reset button
            const resetButton = messageDiv.querySelector('.reset-search');
            resetButton.addEventListener('click', function() {
                // Show all items
                glossaryItems.forEach(item => {
                    item.classList.remove('hidden');
                });
                
                // Clear search input
                if (searchInput) {
                    searchInput.value = '';
                }
                
                // Remove message
                messageDiv.remove();
                
                // Reset index active state
                const indexLinks = alphaIndex.querySelectorAll('a');
                indexLinks.forEach(l => l.classList.remove('active'));
            });
        }
    }
    
    // Add hover effect to accordion items
    glossaryItems.forEach(item => {
        // Get the accordion button and body for this item
        const button = item.querySelector('.accordion-button');
        const body = item.querySelector('.accordion-collapse');
        
        if (button && body) {
            // Create a Bootstrap collapse instance to control it programmatically
            const collapse = new bootstrap.Collapse(body, {
                toggle: false
            });
            
            // Store original z-index and position for clean-up
            const originalZIndex = item.style.zIndex;
            const originalPosition = item.style.position;
            
            // Track if hover is active
            let hoverActive = false;
            
            // Add hover event
            item.addEventListener('mouseenter', function() {
                // Set position and z-index to make it appear above other items
                item.style.position = 'relative';
                item.style.zIndex = '100';
                hoverActive = true;
                
                // Add hover class for styling
                item.classList.add('glossary-item-hover');
            });
            
            // Remove hover event
            item.addEventListener('mouseleave', function() {
                // Reset position and z-index
                item.style.position = originalPosition;
                item.style.zIndex = originalZIndex;
                hoverActive = false;
                
                // Remove hover class
                item.classList.remove('glossary-item-hover');
            });
        }
    });
});
