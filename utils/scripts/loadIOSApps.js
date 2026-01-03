
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("ios-apps");
  if (!container) return;

  try {
    const res = await fetch("/utils/data/ios-apps.json");
    const data = await res.json();

    data.apps.forEach(app => {
      const techHTML = app.techStack.map(tech => `
        <span class="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded-md text-xs text-blue-400">
          ${tech}
        </span>
      `).join("");

      const statusBadge =
        app.status === "published"
          ? `<div class="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-xs text-green-400 flex items-center gap-1">
               <i class="fas fa-check-circle"></i> Published
             </div>`
          : `<div class="px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full text-xs text-yellow-400 flex items-center gap-1">
               <i class="fas fa-clock"></i> In Review
             </div>`;

      container.innerHTML += `
        <div class="group bg-[#1a1a2e]/50 backdrop-blur-sm border border-blue-500/20 rounded-xl overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all">

          <div class="relative h-48 overflow-hidden">
            <img src="${app.image}"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent"></div>

            <div class="absolute top-4 right-4">
              ${statusBadge}
            </div>
          </div>

          <div class="p-6">
            <h3 class="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
              ${app.title}
            </h3>

            <p class="text-sm text-gray-400 mb-4">${app.description}</p>

            <div class="flex flex-wrap gap-2 mb-4">
              ${techHTML}
            </div>

            <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
              <div class="flex items-center gap-4">
                <span><i class="fas fa-download"></i> ${app.downloads}</span>
                <span><i class="fas fa-star text-yellow-400"></i> ${app.rating}</span>
              </div>
              <span class="text-blue-400">${app.version}</span>
            </div>

            <div class="flex gap-2">
              <a href="${app.storeLink}"
                class="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-sm flex items-center justify-center gap-2 hover:shadow-lg">
                <i class="fab fa-app-store-ios"></i> App Store
              </a>

              <a href="${app.githubLink}"
                class="px-4 py-2 bg-[#1a1a2e] border border-blue-500/50 rounded-lg hover:border-blue-400 transition">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      `;
    });
  } catch (err) {
    console.error("Failed to load iOS apps:", err);
  }
});