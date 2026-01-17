// utils/scripts/loadComponents.js

function loadHeader(activePage) {
  const header = document.getElementById("header");
  if (!header) return;

  header.innerHTML = `
  <header class="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-indigo-500/20">
    <div class="flex items-center justify-between h-16 px-6 md:px-10">
      <span class="font-mono text-indigo-400 text-lg mt-2">root@alex</span>

      <!-- Desktop nav -->
      <nav class="hidden md:flex gap-[20px]">
        ${navItem({
    key: "home",
    href: "index.html",
    label: "Home",
    icon: ICONS.home,
    activePage
  })}
        ${navItem({
    key: "projects",
    href: "projects.html",
    label: "Web Projects",
    icon: ICONS.web,
    activePage
  })}
                ${navItem({
    key: "mobile",
    href: "mobile.html",
    label: "Mobile",
    icon: ICONS.games,
    activePage
  })}
        ${navItem({
    key: "labs",
    href: "labs.html",
    label: "Cybersecurity Lab",
    icon: ICONS.shield,
    activePage
  })}

        ${navItem({
    key: "about",
    href: "aboutme.html",
    label: "About Me",
    icon: ICONS.user,
    activePage
  })}
        ${navItem({
    key: "contact",
    href: "contact.html",
    label: "Contact",
    icon: ICONS.mail,
    activePage
  })}
      </nav>

      <!-- Mobile button -->
      <button id="mobile-toggle" class="md:hidden text-indigo-400 text-2xl select-none" aria-label="Open menu">
        ☰
      </button>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="hidden md:hidden px-6 pb-4 space-y-2">
      ${mobileItem("Home", "index.html", ICONS.home)}
      ${mobileItem("Web Development", "projects.html", ICONS.web)}
      ${mobileItem("Mobile Development", "mobile.html", ICONS.games)}
      ${mobileItem("Cybersecurity Lab", "labs.html", ICONS.shield)}
      ${mobileItem("About Me", "aboutme.html", ICONS.user)}
      ${mobileItem("Contact", "contact.html", ICONS.mail)}
    </div>
  </header>
  `;

  const btn = document.getElementById("mobile-toggle");
  const menu = document.getElementById("mobile-menu");
  if (btn && menu) btn.addEventListener("click", () => menu.classList.toggle("hidden"));
}

function navItem({ key, href, label, icon, activePage }) {
  const isActive = key === activePage;

  const activeClasses = `
    text-indigo-400 border border-indigo-500/40 bg-indigo-500/10
    shadow-[0_0_20px_rgba(99,102,241,0.25)]
  `;
  const normalClasses = `text-gray-400 hover:text-indigo-400`;

  return `
    <a href="${href}"
       class="flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-[18px]
              ${isActive ? activeClasses : normalClasses}">
      ${icon}
      ${label}
    </a>
  `;
}

function mobileItem(label, href, icon) {
  return `
    <a href="${href}"
       class="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-400 hover:text-indigo-400 transition-all">
      ${icon}
      ${label}
    </a>
  `;
}

function loadFooter() {
  const footer = document.getElementById("footer");
  if (!footer) return;

  footer.innerHTML = `
    <footer class="mt-24 border-t border-indigo-500/20">
      <div class="max-w-7xl mx-auto px-6 py-6 text-center">
        <p class="text-sm text-gray-400">
          © 2025 <span class="text-indigo-400 font-medium">Alejandro Alonso</span>
          <span class="mx-1 text-gray-500">·</span>
          Built with <span class="text-pink-400">passion</span>.
        </p>
      </div>
    </footer>
  `;
}

const ICONS = {
  home: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
      stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>
  `,
  web: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
      stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  `,
  shield: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
      stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
    </svg>
  `,
  games: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
      stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84 2.25 1.875 2.25c.37 0 .713-.128 1.003-.349.283-.215.604-.401.96-.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
    </svg>
  `,
  user: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
      stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  `,
  mail: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
      stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  `
};