// JavaScript for CheckAPet Breeding Page
document.addEventListener('DOMContentLoaded', function() {
    // Breeding selection functionality
    const animalTypeSelect = document.getElementById('animalType');
    const breedSelect = document.getElementById('breedSelect');
    const secondBreedSelect = document.getElementById('secondBreedSelect');
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
        'Maine Coon', 'Norwegian Forest Cat', 'Ragdoll', 'Russian Blue',
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
        'Abyssinian': ['Progressive Retinal Atrophy (rdAc-PRA)', 'Progressive Retinal Atrophy (rdy-PRA)-rare', 'PK Deficiency'],
        'Bengal': ['Progressive Retinal Atrophy (rdAc-PRA)', 'Progressive Retinal Atrophy in Bengal (b-PRA/PRA-b)', 'PK Deficiency'],
        'Birman': ['Feline Polycystic Kidney Disease (PKD)', 'pd-Progressive Retinal Atrophy (pd-PRA)', 'Hypotrichosis and Short Life Expectancy', 'Mucopolysaccharidosis Type VI (MPS VI MPS6)'],
        'British Shorthair': ['Feline Polycystic Kidney Disease (PKD)', 'pd-Progressive Retinal Atrophy (pd-PRA)', 'Autoimmune Lymphoproliferative Syndrome (ALPS)'],
        'Maine Coon': ['Hypertrophic cardiomyopathy (HCM 1 Mutation Meurs (G-- &gt; C) A31P)', 'PK Deficiency', 'SMA (Spinal Muscular Atrophy )', 'Factor XI deficiency (F11)'],
        'Norwegian Forest Cat': ['PK Deficiency)', 'Glycogen Storage Disease ( GSD ) Type IV'],
        'Ragdoll': ['Hypertrophic cardiomyopathy (HCM3/HCR)', 'Hypertrophic cardiomyopathy (HCM 1 Mutation Meurs (G-- &gt; C) A31P)', 'Feline Polycystic Kidney Disease (PKD)', 'pd-Progressive Retinal Atrophy (pd-PRA)'],
        'Russian Blue': ['Feline Polycystic Kidney Disease (PKD)', 'pd-Progressive Retinal Atrophy (pd-PRA)'],
        'Siamese': ['Progressive Retinal Atrophy (rdAc-PRA)***', 'Gangliosidosis (GM1)', 'Mucopolysaccharidosis Type VI (MPS VI MPS6)', 'Primary Congenital Glaucoma (PCG)'],
        'Sphynx': ['Hypertrophic cardiomyopathy (HCM 4)', 'Hypokalemia / Familial Episodic Hypokalaemic Polymyopathy (BHK)', 'Congenital Myasthenic Syndrome (CMS) / Hereditary Myopathy'],
    
        
        // Add more breeds as needed
    };
    
    // Initialize the page
    function init() {
        // Handle animal type change
        if (animalTypeSelect) {
            animalTypeSelect.addEventListener('change', populateBreedSelect);
        }
        
        // Initial population of breed select
        populateBreedSelect();
        
        // Handle show tests button
        if (showTestsButton) {
            showTestsButton.addEventListener('click', showHealthTests);
        }
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
    
    // Initialize the page
    init();
});

// Add this to your main.js or to any page-specific JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Select all accordion items on the page
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    // Add hover effects to each item
    accordionItems.forEach(item => {
        // Add CSS transition properties for smooth animation
        item.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            this.style.position = 'relative';
            this.style.zIndex = '10';
        });
        
        // Remove hover effect
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.position = '';
            this.style.zIndex = '';
        });
    });
});
