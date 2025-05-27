/*
// Main JavaScript for CheckAPet website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle enhancement
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Add smooth transition for mobile menu
        navbarCollapse.style.transition = 'height 0.3s ease-in-out';
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navbarToggler.contains(event.target) || 
                                navbarCollapse.contains(event.target);
                                
            if (!isClickInside && navbarCollapse.classList.contains('show')) {
                // Use Bootstrap's collapse API to hide the menu
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    }
    
    // Active link highlighting based on current page
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        // Remove any existing active classes
        link.classList.remove('active');
        
        // Get the path from the href
        const linkPath = new URL(link.href, window.location.origin).pathname;
        
        // Check if the current location includes this link's path
        // Exclude the home link's special case when on another page
        if (currentLocation.includes(linkPath) && 
            !(linkPath === '/Checkapet/' && currentLocation !== '/Checkapet/')) {
            link.classList.add('active');
        }
    });

    // Breeding page functionality
    const animalTypeSelect = document.getElementById('animalType');
    const breedSelect = document.getElementById('breedSelect');
    const secondBreedSelect = document.getElementById('secondBreedSelect');
    const showTestsButton = document.getElementById('showTestsButton');
    const testResultsSection = document.getElementById('testResultsSection');
    
    // Only run breeding code if we're on the breeding page
    if (showTestsButton) {
        // Dog breeds data
        const dogBreeds = [
            'Airedale Terrier', 'Bernese Mountain Dog', 'Boxer', 'Chihuahua', 'Toy Poodle',
            'English Springer Spaniel', 'French Bull Dog', 
            'German Shepherd', 'Hungarian Vizsla (Magyar Vizsla/Smooth haired)',
            'Irish Terrier', 'Irish Wolfhound', 'Jack Russell Terrier', 
            'Jagd Terrier', 'Kerry Blue Terrier', 'Labrador Retriever'
        ];
        
        // Cat breeds data
        const catBreeds = [
            'Abyssinian', 'Bengal', 'Birman', 'British Shorthair',
            'Maine Coon', 'Norwegian Forest Cat', 'Persian', 'Ragdoll', 
            'Siamese', 'Sphynx'
        ];
        
        // Health test data (simplified example)
        const breedTests = {
            'Labrador Retriever': ['Hip Dysplasia', 'Elbow Dysplasia', 'Progressive Retinal Atrophy', 'Exercise Induced Collapse'],
            'German Shepherd': ['Hip Dysplasia', 'Elbow Dysplasia', 'Degenerative Myelopathy'],
            'French Bull Dog': ['BOAS Assessment', 'Patellar Luxation', 'Eye Test'],
            'Boxer': ['Aortic Stenosis', 'Cardiomyopathy', 'Hip Dysplasia'],
            'Irish Wolfhound': ['Heart Testing', 'Hip Dysplasia', 'Elbow Dysplasia', 'Eye Testing'],
            'English Springer Spaniel': ['Hip Dysplasia', 'Progressive Retinal Atrophy', 'Fucosidosis', 'Phosphofructokinase Deficiency'],
            'Airedale Terrier': ['Hip Dysplasia', 'Elbow Dysplasia', 'Eye Testing', 'Heart Testing'],
            'Bernese Mountain Dog': ['Hip Dysplasia', 'Elbow Dysplasia', 'Eye Testing', 'Degenerative Myelopathy', 'Von Willebrand Disease'],
            'Chihuahua': ['Heart Testing', 'Eye Testing', 'Patellar Luxation', 'Episodic Falling'],
            'Toy Poodle': ['Progressive Retinal Atrophy', 'Eye Testing', 'Hip Dysplasia', 'Von Willebrand Disease', 'Degenerative Myelopathy'],
            'Hungarian Vizsla (Magyar Vizsla/Smooth haired)': ['Hip Dysplasia', 'Elbow Dysplasia', 'Eye Testing', 'Epilepsy'],
            'Irish Terrier': ['Hip Dysplasia', 'Eye Testing', 'Hyperuricosuria', 'Cystinuria'],
            'Jack Russell Terrier': ['Eye Testing', 'Patellar Luxation', 'Hereditary Ataxia', 'Congenital Sensorineural Deafness'],
            'Jagd Terrier': ['Hip Dysplasia', 'Eye Testing', 'Heart Testing', 'Patellar Luxation'],
            'Kerry Blue Terrier': ['Hip Dysplasia', 'Eye Testing', 'Von Willebrand Disease', 'Cerebellar Abiotrophy'],
    
            // Add more breeds as needed
        };
        
        // Initialize breeding functionality
        initBreedingPage();
        
        // Initialize breeding page
        function initBreedingPage() {
            // Handle animal type change
            if (animalTypeSelect) {
                animalTypeSelect.addEventListener('change', populateBreedSelect);
            }
            
            // Initial population of breed select
            populateBreedSelect();
            
            // Handle show tests button
            showTestsButton.addEventListener('click', showHealthTests);
        }
        
        // Populate breed select based on animal type
        function populateBreedSelect() {
            if (!breedSelect) return;
            
            // Clear existing options
            breedSelect.innerHTML = '<option value="">Choose Breed</option>';
            
            // Get the selected animal type
            const animalType = animalTypeSelect ? animalTypeSelect.value : 'Dog';
            
            // Get the appropriate breed list
            const breeds = animalType === 'Cat' ? catBreeds : dogBreeds;
            
            // Add options
            breeds.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed;
                option.textContent = breed;
                breedSelect.appendChild(option);
            });
            
            // Also update second breed select if it exists
            if (secondBreedSelect) {
                secondBreedSelect.innerHTML = '<option value="">Choose Second Breed (Optional)</option>';
                breeds.forEach(breed => {
                    const option = document.createElement('option');
                    option.value = breed;
                    option.textContent = breed;
                    secondBreedSelect.appendChild(option);
                });
            }
        }
        
        // Show health tests based on selected breeds
        function showHealthTests() {
            if (!testResultsSection || !breedSelect) return;
            
            const breed1 = breedSelect.value;
            const breed2 = secondBreedSelect ? secondBreedSelect.value : '';
            
            if (!breed1) {
                alert('Please select at least one breed');
                return;
            }
            
            // Make test results section visible
            testResultsSection.style.display = 'block';
            
            // Get tests for first breed
            const testsForBreed1 = breedTests[breed1] || [];
            
            // Get tests for second breed if selected
            const testsForBreed2 = breed2 ? breedTests[breed2] || [] : [];
            
            // Combine tests (remove duplicates)
            const allTests = [...new Set([...testsForBreed1, ...testsForBreed2])];
            
            // Create HTML content
            let testsHTML = `
                <h2 class="mt-5">Recommended Health Tests</h2>
                <div class="card mb-4">
                    <div class="card-body">
            `;
            
            if (breed2) {
                testsHTML += `<h3>For ${breed1} × ${breed2} Cross</h3>`;
            } else {
                testsHTML += `<h3>For ${breed1}</h3>`;
            }
            
            if (allTests.length > 0) {
                testsHTML += '<ul class="mt-3">';
                allTests.forEach(test => {
                    testsHTML += `<li>${test}</li>`;
                });
                testsHTML += '</ul>';
                
                testsHTML += `
                    <div class="alert alert-info mt-3">
                        <strong>Note:</strong> Health testing is crucial for responsible breeding. 
                        These tests help reduce the risk of inherited diseases in puppies.
                    </div>
                `;
            } else {
                testsHTML += `
                    <p>No specific health tests are recorded for this breed in our database. 
                    Please consult with a veterinarian for the most up-to-date health testing recommendations.</p>
                `;
            }
            
            testsHTML += `
                    </div>
                </div>
            `;
            
            // Add the content to the page
            testResultsSection.innerHTML = testsHTML;
            
            // Scroll to the results
            testResultsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Add inline styles directly to each accordion item
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        // Set initial styles
        item.style.marginBottom = '0.75rem';
        item.style.borderRadius = '0.5rem';
        item.style.overflow = 'hidden';
        item.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        
        // Add hover event listeners
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            this.style.position = 'relative';
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.position = '';
            this.style.zIndex = '';
        });
    });
}); */
