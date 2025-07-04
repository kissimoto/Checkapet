// JavaScript for CheckAPet Vets Page
document.addEventListener('DOMContentLoaded', function() {
    // Breed selection functionality
    const animalTypeSelect = document.getElementById('animalType');
    const selectionContainer = document.getElementById('breedSelectionContainer');
    const showTestsButton = document.getElementById('showTestsButton');
    const testResultsSection = document.getElementById('testResultsSection');
    
    // Dog breeds data
    const dogBreeds = [
        'English Springer Spaniel', 'French Bull Dog', 'Boxer', 
        'Airedale Terrier', 'Bernese Mountain Dog', 'Chihuahua', 'Toy Poodle',
        'German Shepherd', 'Hungarian Vizsla (Magyar Vizsla/Smooth haired)',
        'Irish Terrier', 'Irish Wolfhound', 'Jack Russell Terrier', 
        'Jagd Terrier', 'Kerry Blue Terrier', 'Labrador Retriever'
    ];
    
    // Cat breeds data
    const catBreeds = [
        'Abyssinian', 'Bengal', 'Birman', 'British Shorthair',
        'Maine Coon', 'Norwegian Forest Cat', 'Ragdoll', 'Russian Blue',
        'Siamese', 'Sphynx'
    ];
    
    // Test recommendations by animal type
    const testRecommendations = {
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
        'Abyssinian': ['Progressive Retinal Atrophy (rdAc-PRA)', 'Progressive Retinal Atrophy (rdy-PRA)-rare', 'PK Deficiency'],
        'Bengal': ['Progressive Retinal Atrophy (rdAc-PRA)', 'Progressive Retinal Atrophy in Bengal (b-PRA/PRA-b)', 'PK Deficiency'],
        'Birman': ['Feline Polycystic Kidney Disease (PKD)', 'pd-Progressive Retinal Atrophy (pd-PRA)', 'Hypotrichosis and Short Life Expectancy', 'Mucopolysaccharidosis Type VI (MPS VI MPS6)'],
        'British Shorthair': ['Feline Polycystic Kidney Disease (PKD)', 'pd-Progressive Retinal Atrophy (pd-PRA)', 'Autoimmune Lymphoproliferative Syndrome (ALPS)'],
        'Main Coon': ['Hypertrophic cardiomyopathy (HCM 1 Mutation Meurs (G-- &gt; C) A31P)', 'PK Deficiency', 'SMA (Spinal Muscular Atrophy )', 'Factor XI deficiency (F11)'],
        'Norwegian Forest Cat': ['PK Deficiency)', 'Glycogen Storage Disease ( GSD ) Type IV'],
        'Ragdoll': ['Hypertrophic cardiomyopathy (HCM3/HCR)', 'Hypertrophic cardiomyopathy (HCM 1 Mutation Meurs (G-- &gt; C) A31P)', 'Feline Polycystic Kidney Disease (PKD)', 'pd-Progressive Retinal Atrophy (pd-PRA)'],
        'Russian Blue': ['Feline Polycystic Kidney Disease (PKD)', 'pd-Progressive Retinal Atrophy (pd-PRA)'],
        'Siamese': ['Progressive Retinal Atrophy (rdAc-PRA)***', 'Gangliosidosis (GM1)', 'Mucopolysaccharidosis Type VI (MPS VI MPS6)', 'Primary Congenital Glaucoma (PCG)'],
        'Sphynx': ['Hypertrophic cardiomyopathy (HCM 4)', 'Hypokalemia / Familial Episodic Hypokalaemic Polymyopathy (BHK)', 'Congenital Myasthenic Syndrome (CMS) / Hereditary Myopathy'],
    
        // Add more breed-specific recommendations as needed


        'general_dog': [
            'Physical examination',
            'Hip dysplasia scoring (for larger breeds)',
            'Elbow dysplasia evaluation (for larger breeds)',
            'Eye examination',
            'Heart examination'
        ],
        'general_cat': [
            'Physical examination',
            'FeLV/FIV testing',
            'Heart examination',
            'Kidney function evaluation'
        ]
    };
    
    // Handle animal type change
    if (animalTypeSelect) {
        animalTypeSelect.addEventListener('change', updateBreedSelections);
    }
    
    // Handle show tests button
    if (showTestsButton) {
        showTestsButton.addEventListener('click', showTestRecommendations);
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
    
    // Display test recommendations
    function showTestRecommendations() {
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
        let testsHTML = `
            <h2 class="mt-3 mb-4">Recommended Tests</h2>
            <div class="card mb-4">
                <div class="card-body">
        `;
        
        // If specific breeds are selected
        if (breed1) {
            if (breed2) {
                testsHTML += `<h3>For ${breed1} × ${breed2} Cross</h3>`;
            } else {
                testsHTML += `<h3>For ${breed1}</h3>`;
            }
            
            // Get breed-specific tests
            const testsForBreed1 = testRecommendations[breed1] || [];
            const testsForBreed2 = breed2 ? testRecommendations[breed2] || [] : [];
            
            // Combine tests (remove duplicates)
            const breedTests = [...new Set([...testsForBreed1, ...testsForBreed2])];
            
            if (breedTests.length > 0) {
                testsHTML += '<h4 class="mt-4">Breed-Specific Tests</h4><ul class="mb-4">';
                breedTests.forEach(test => {
                    testsHTML += `<li>${test}</li>`;
                });
                testsHTML += '</ul>';
            }
            
            // Add general recommendations
            const generalTests = testRecommendations[`general_${animalType.toLowerCase()}`] || [];
            
            if (generalTests.length > 0) {
                testsHTML += '<h4 class="mt-4">General Health Tests</h4><ul class="mb-4">';
                generalTests.forEach(test => {
                    testsHTML += `<li>${test}</li>`;
                });
                testsHTML += '</ul>';
            }
        } else {
            // General recommendations only
            testsHTML += `<h3>General Tests for ${animalType}s</h3>`;
            
            const generalTests = testRecommendations[`general_${animalType.toLowerCase()}`] || [];
            
            if (generalTests.length > 0) {
                testsHTML += '<ul class="mb-4">';
                generalTests.forEach(test => {
                    testsHTML += `<li>${test}</li>`;
                });
                testsHTML += '</ul>';
            } else {
                testsHTML += `<p>Please select a specific breed for detailed test recommendations.</p>`;
            }
        }
        
        testsHTML += `
                    <div class="alert alert-info mt-4">
                        <strong>Note:</strong> These recommendations are general guidelines. Specific tests may vary based on individual animal and breed. Always consult with relevant breed-specific health testing schemes and professional veterinary advice.
                    </div>
                </div>
            </div>
        `;
        
        // Add the content to the page
        testResultsSection.innerHTML = testsHTML;
        
        // Scroll to the results
        testResultsSection.scrollIntoView({ behavior: 'smooth' });
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
});
