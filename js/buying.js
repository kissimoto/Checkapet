// JavaScript for CheckAPet Buying Page
document.addEventListener('DOMContentLoaded', function() {
    // Breed selection functionality
    const animalTypeSelect = document.getElementById('animalType');
    const selectionContainer = document.getElementById('breedSelectionContainer');
    const showTestsButton = document.getElementById('showTestsButton');
    const testResultsSection = document.getElementById('testResultsSection');
    
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
    
    // Health considerations by animal type and breed
    const healthConsiderations = {
        'Labrador Retriever': ['Hip Dysplasia', 'Elbow Dysplasia', 'Progressive Retinal Atrophy', 'Exercise Induced Collapse'],
        'German Shepherd': ['Hip Dysplasia', 'Elbow Dysplasia', 'Degenerative Myelopathy'],
        'French Bull Dog': ['BOAS (Brachycephalic Obstructive Airway Syndrome)', 'Patellar Luxation', 'Eye Issues', 'Spinal Problems'],
        'Boxer': ['Aortic Stenosis', 'Cardiomyopathy', 'Hip Dysplasia'],
        'Irish Wolfhound': ['Heart Disease', 'Hip Dysplasia', 'Elbow Dysplasia', 'Eye Issues'],
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
    
        // Add more breed-specific considerations as needed
        'general_dog': [
            'Research the breed thoroughly before committing',
            'Verify health testing of both parents',
            'Ensure the breeder follows breed-specific health schemes',
            'Consider the breed\'s exercise requirements and if they match your lifestyle',
            'Budget for potential health issues common in the breed'
        ],
        'general_cat': [
            'Verify FeLV/FIV testing status',
            'Check for genetic testing appropriate to the breed',
            'Consider the grooming needs (especially for long-haired breeds)',
            'Ensure the kitten has had appropriate veterinary care',
            'Consider the breed\'s typical personality and if it matches your lifestyle'
        ]
    };
    
    // Handle animal type change
    if (animalTypeSelect) {
        animalTypeSelect.addEventListener('change', updateBreedSelections);
    }
    
    // Handle show tests button
    if (showTestsButton) {
        showTestsButton.addEventListener('click', showHealthConsiderations);
    }
    
    // Update breed selection options based on animal type
    function updateBreedSelections() {
        if (!selectionContainer) return;
        
        const animalType = animalTypeSelect.value;
        
        if (!animalType) {
            selectionContainer.innerHTML = '';
            return;
        }
        
        // Get the appropriate breed list
        const breeds = animalType === 'Cat' ? catBreeds : dogBreeds;
        
        // Create HTML for breed selections
        let html = `
            <div class="row mb-3">
                <div class="col-md-6 mb-3">
                    <label for="breedSelect" class="form-label">Breed</label>
                    <select id="breedSelect" class="form-select">
                        <option value="">Choose Breed</option>
        `;
        
        // Add breed options
        breeds.forEach(breed => {
            html += `<option value="${breed}">${breed}</option>`;
        });
        
        html += `
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="secondBreedSelect" class="form-label">Second Breed (Optional)</label>
                    <select id="secondBreedSelect" class="form-select">
                        <option value="">Choose Second Breed (Optional)</option>
        `;
        
        // Add breed options for second selection
        breeds.forEach(breed => {
            html += `<option value="${breed}">${breed}</option>`;
        });
        
        html += `
                    </select>
                </div>
            </div>
        `;
        
        // Update the container
        selectionContainer.innerHTML = html;
    }
    
    // Display health considerations
    function showHealthConsiderations() {
        if (!testResultsSection) return;
        
        const animalType = animalTypeSelect.value;
        
        if (!animalType) {
            alert('Please select an animal type');
            return;
        }
        
        // Get breed selections if available
        const breedSelect = document.getElementById('breedSelect');
        const secondBreedSelect = document.getElementById('secondBreedSelect');
        
        let breed1 = breedSelect ? breedSelect.value : '';
        let breed2 = secondBreedSelect ? secondBreedSelect.value : '';
        
        // Make test results section visible
        testResultsSection.style.display = 'block';
        
        // Create HTML content
        let healthHTML = `
            <h2 class="mt-3 mb-4">Health Considerations Before Buying</h2>
            <div class="card mb-4">
                <div class="card-body">
        `;
        
        // If specific breeds are selected
        if (breed1) {
            if (breed2) {
                healthHTML += `<h3>For ${breed1} × ${breed2} Cross</h3>`;
            } else {
                healthHTML += `<h3>For ${breed1}</h3>`;
            }
            
            // Get breed-specific considerations
            const considerationsForBreed1 = healthConsiderations[breed1] || [];
            const considerationsForBreed2 = breed2 ? healthConsiderations[breed2] || [] : [];
            
            // Combine considerations (remove duplicates)
            const breedConsiderations = [...new Set([...considerationsForBreed1, ...considerationsForBreed2])];
            
            if (breedConsiderations.length > 0) {
                healthHTML += '<h4 class="mt-4">Breed-Specific Health Considerations</h4><ul class="mb-4">';
                breedConsiderations.forEach(consideration => {
                    healthHTML += `<li>${consideration}</li>`;
                });
                healthHTML += '</ul>';
            }
            
            // Add general recommendations
            const generalConsiderations = healthConsiderations[`general_${animalType.toLowerCase()}`] || [];
            
            if (generalConsiderations.length > 0) {
                healthHTML += '<h4 class="mt-4">General Considerations</h4><ul class="mb-4">';
                generalConsiderations.forEach(consideration => {
                    healthHTML += `<li>${consideration}</li>`;
                });
                healthHTML += '</ul>';
            }
        } else {
            // General recommendations only
            healthHTML += `<h3>General Considerations for ${animalType}s</h3>`;
            
            const generalConsiderations = healthConsiderations[`general_${animalType.toLowerCase()}`] || [];
            
            if (generalConsiderations.length > 0) {
                healthHTML += '<ul class="mb-4">';
                generalConsiderations.forEach(consideration => {
                    healthHTML += `<li>${consideration}</li>`;
                });
                healthHTML += '</ul>';
            } else {
                healthHTML += `<p>Please select a specific breed for detailed health considerations.</p>`;
            }
        }
        
        healthHTML += `
                    <div class="alert alert-info mt-4">
                        <strong>Note:</strong> These considerations are general guidelines. Always consult with a veterinarian and do thorough research about the breed you are interested in. A reputable breeder should be transparent about their breeding practices and the health of their animals.
                    </div>
                </div>
            </div>
        `;
        
        // Add the content to the page
        testResultsSection.innerHTML = healthHTML;
        
        // Scroll to the results
        testResultsSection.scrollIntoView({ behavior: 'smooth' });
    }
});
