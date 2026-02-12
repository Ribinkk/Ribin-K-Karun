
/* Fetch GitHub Projects */
const fetchProjects = async () => {
    const username = 'ribinkk';
    const container = document.querySelector('.projects-container');
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        
        const removeHyphens = (str) => str.replace(/-/g, ' ');

        const data = await response.json();
        
        // Clear existing content just in case
        container.innerHTML = '';

        data.forEach((repo, index) => {
            if (!repo.fork && repo.name.toLowerCase() !== 'ribinkk') { // Optional: Filter out forks and portfolio repo
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');
                projectCard.setAttribute('data-aos', 'zoom-in');
                projectCard.setAttribute('data-aos-delay', (index + 1) * 100); // Staggered delay

                let projectImage = '';
                
                // Custom handling for Finesight AI
                if (repo.name.toLowerCase().includes('finesight')) {
                    projectImage = `
                        <div class="project-img">
                             <div style="width:100%; height:100%; background: #222; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; border-bottom: 4px solid #f39c12;">
                                <i class='bx bx-mobile-alt' style="font-size: 60px; color: #f39c12; margin-bottom: 10px;"></i>
                                <span style="color: white; font-weight: 600; font-size: 1.2rem;">Finesight AI</span>
                                <div style="width: 60%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 4px; margin-top: 15px;">
                                    <div style="width: 70%; height: 100%; background: #2c7a7b; border-radius: 4px;"></div>
                                </div>
                                <div style="width: 40%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 4px; margin-top: 8px;"></div>
                            </div>
                        </div>
                    `;
                } else {
                    // Fallback for other projects
                    projectImage = `
                        <div class="project-img">
                            <div style="width:100%; height:100%; background: linear-gradient(45deg, #f39c12, #2c7a7b); opacity: 0.8; display: flex; align-items: center; justify-content: center; color: white; font-size: 40px;">
                                <i class='bx bx-code-alt'></i>
                            </div>
                        </div>
                    `;
                }

                const projectInfo = `
                    <div class="project-info">
                        <h3>${removeHyphens(repo.name)}</h3>
                        <p>${repo.description || 'No description available.'}</p>
                        <a href="${repo.html_url}" target="_blank">View Project</a>
                    </div>
                `;

                projectCard.innerHTML = projectImage + projectInfo;
                container.appendChild(projectCard);
            }
        });

        // Initialize VanillaTilt on new elements
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.05
        });

        // Refresh AOS animations
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

    } catch (error) {
        console.error('Error fetching projects:', error);
        container.innerHTML = '<p style="color: white; text-align: center;">Failed to load projects.</p>';
    }
};

// Call the function
fetchProjects();
