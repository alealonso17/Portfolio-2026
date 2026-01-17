document.addEventListener("DOMContentLoaded", async () => {
  const projectsContainer = document.getElementById("projects");
  if (!projectsContainer) return;

  try {
    // Fetch project data
    const res = await fetch("/utils/data/data.json");
    const data = await res.json();
    const projects = data.projects;

    projects.forEach(project => {
      // Build tech stack badges
      const techStackHTML = project.techStack.map(tech => `
        <span class="px-2 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-md text-xs text-indigo-400">
          ${tech}
        </span>
      `).join("");

      // Build security features badges
      const securityHTML = project.securityFeatures.map(sec => `
        <span class="px-2 py-1 bg-green-500/10 border border-green-500/30 rounded-md text-xs text-green-400">
          ${sec}
        </span>
      `).join("");

      // Conditionally render Live Web button ONLY if pageLink exists
      const liveWebButton = project.pageLink
        ? `
          <a href="${project.pageLink}" target="_blank"
             class="px-5 py-2.5 bg-[#1a1a2e] border border-cyan-500/50 rounded-lg
                    hover:border-cyan-400 transition-all flex items-center gap-2">
            <i class="fas fa-globe text-cyan-400"></i>
            <span>Live Web</span>
          </a>
        `
        : "";

      // Render project card
      projectsContainer.innerHTML += `
        <div class="group bg-[#1a1a2e]/50 backdrop-blur-sm border border-indigo-500/20
                    rounded-2xl overflow-hidden hover:border-indigo-500/50
                    hover:shadow-2xl hover:shadow-indigo-500/20 transition-all">

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <!-- Project image -->
            <div class="relative h-64 lg:h-auto overflow-hidden">
              <img src="${project.image || '/public/images/placeholder.png'}"
                   class="w-full h-full object-cover group-hover:scale-110
                          transition-transform duration-700">
              <div class="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/90 to-transparent"></div>
            </div>

            <!-- Project content -->
            <div class="p-6 lg:p-8">
              <h3 class="text-2xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">
                ${project.title}
              </h3>

              <p class="text-gray-400 mb-4">${project.description}</p>

              <!-- Tech Stack -->
              <div class="mb-4">
                <div class="flex items-center gap-2 mb-2">
                  <i class="fas fa-code text-indigo-400"></i>
                  <span class="text-sm font-semibold text-gray-300">Tech Stack</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  ${techStackHTML}
                </div>
              </div>

              <!-- Security Features -->
              <div class="mb-4">
                <div class="flex items-center gap-2 mb-2">
                  <i class="fas fa-lock text-green-400"></i>
                  <span class="text-sm font-semibold text-gray-300">Security Features</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  ${securityHTML}
                </div>
              </div>

              <!-- Architecture -->
              <div class="mb-6">
                <div class="flex items-center gap-2 mb-2">
                  <i class="fas fa-database text-purple-400"></i>
                  <span class="text-sm font-semibold text-gray-300">Architecture</span>
                </div>
                <div class="px-3 py-2 bg-purple-500/10 border border-purple-500/30
                            rounded-lg text-sm text-purple-400">
                  ${project.architecture}
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-wrap gap-3">
                <a href="${project.githubLink}" target="_blank"
                   class="px-5 py-2.5 bg-[#1a1a2e] border border-indigo-500/50
                          rounded-lg hover:border-indigo-400 transition-all
                          flex items-center gap-2">
                  <i class="fab fa-github"></i>
                  <span>Source Code</span>
                </a>

                ${liveWebButton}
              </div>
            </div>

          </div>
        </div>
      `;
    });

  } catch (err) {
    console.error("Failed to load projects:", err);
  }
});