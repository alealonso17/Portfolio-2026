const labsHtml = document.getElementById("writeups");

const res = await fetch("/utils/data/writeups.json");
const data = await res.json();
const writeupsInfo = data.labs;

writeupsInfo.forEach(writeup => {

  // ----- difficulty color -----
  let color = "";
  const difficulty = writeup.difficulty.toLowerCase();

  if (difficulty === "easy") {
    color = "text-green-400 border-green-500/50 bg-green-500/10";
  } else if (difficulty === "medium") {
    color = "text-yellow-400 border-yellow-500/50 bg-yellow-500/10";
  } else if (difficulty === "hard") {
    color = "text-red-400 border-red-500/50 bg-red-500/10";
  }

  // ----- keywords HTML -----
  const keywordsHTML = writeup.keyWords
    .map(word => `
      <span class="px-2 py-1 bg-purple-500/10 border border-purple-500/30 
                   rounded-md text-xs text-purple-400">
        ${word}
      </span>
    `)
    .join("");

  // ----- card -----
  labsHtml.innerHTML += `
    <div class="group bg-[#1a1a2e]/50 backdrop-blur-sm 
                border border-indigo-500/20 rounded-xl p-6 
                hover:border-indigo-500/50 hover:shadow-lg 
                hover:shadow-indigo-500/20 transition-all cursor-pointer">

      <div class="flex items-start justify-between mb-4">
        <h3 class="text-lg font-semibold group-hover:text-indigo-400 transition-colors">
          ${writeup.title}
        </h3>
        <span class="px-2 py-1 rounded-md text-xs border ${color}">
          ${writeup.difficulty}
        </span>
      </div>

      <p class="text-sm text-gray-400 mb-4">
        ${writeup.description}
      </p>

      <div class="flex flex-wrap gap-2 mb-4">
        ${keywordsHTML}
      </div>

      <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
        <div class="flex items-center gap-1">
          <i class="fas fa-star"></i>
          <span>${writeup.platform}</span>
        </div>
        <div class="flex items-center gap-1">
          <i class="fas fa-clock"></i>
          <span>${writeup.time}</span>
        </div>
      </div>

      <div class="pt-4 border-t border-gray-800">
        <button class="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
          Read Writeup
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

    </div>
  `;
});