document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("terminal-input");
  const output = document.getElementById("terminal-output");
  const terminal = document.getElementById("terminal");

  if (!input || !output || !terminal) {
    console.warn("Terminal elements not found");
    return;
  }

  // =====================
  // STATE
  // =====================
  let commandHistory = [];
  let historyIndex = -1;
  let isRoot = false; // 🔥 ROOT MODE FLAG

  // =====================
  // UPDATE PROMPT
  // =====================
  const updatePrompt = () => {
    const symbol = document.getElementById("prompt-symbol");
    if (isRoot) {
      symbol.innerHTML = "$";
      symbol.className = "text-red-500";
    } else {
      symbol.innerHTML = "$";
      symbol.className = "text-green-400";
    }
  };

  // =====================
  // HELPERS
  // =====================
  const promptSymbol = () =>
    isRoot
      ? `<span class="text-red-500">#</span>`
      : `<span class="text-green-400">$</span>`;

  const print = (text, color = "text-indigo-400") => {
    output.innerHTML += `
      <div class="${color} whitespace-pre-line">${text}</div>
    `;
  };

  const printCommand = (cmd) => {
    output.innerHTML += `
      <div class="text-gray-500">
        ${promptSymbol()} ${cmd}
      </div>
    `;
  };

  const resetTerminal = () => {
    output.innerHTML = "";
  };

  // Typewriter effect
  const printSlow = async (lines, color = "text-indigo-400", delay = 35) => {
    for (const line of lines) {
      let current = "";
      for (const char of line) {
        current += char;
        output.innerHTML += `
          <div class="${color} whitespace-pre-line">${current}</div>
        `;
        await new Promise((r) => setTimeout(r, delay));
        output.lastElementChild.remove();
      }
      print(line, color);
    }
  };

  // =====================
  // INITIAL OUTPUT
  // =====================
  const printInitialProfile = () => {
    printCommand("cat profile.txt");
    print("→ Full-Stack Web / Mobile Developer", "text-indigo-400");
    print(
      "→ Security-focused mindset with hands-on offensive testing",
      "text-purple-400"
    );
    print("→ Machine learning fundamentals & data handling", "text-pink-400");
  };

  // =====================
  // FAKE FILESYSTEM
  // =====================
  const files = {
    "profile.txt": `
Name: Alejandro Alonso
Role: Full-Stack Developer
Focus: Mobile & Web applications
`,
    "web.txt": `
Projects are available in the Projects section.
Use the navigation bar above.
`,
    "labs.txt": `
Hands-on cybersecurity labs and writeups.
Visit the Cybersecurity Lab section.
`,
    "mobile.txt": `
Mobile apps .
Check the Mobile section.
`,
  };

  // =====================
  // COMMANDS
  // =====================
  const commands = {
    help: () => `
Available commands:
- help
- whoami
- ls
- ls -l
- cat <file>
- skills
- pwd
- date
- uname
- echo <text>
- history
- clear
- hint
`,

    whoami: () => (isRoot ? "root@alex" : "alex"),

    pwd: () => "/home/alejandro/portfolio",

    date: () => new Date().toString(),

    uname: () => "Linux portfolio 6.6.0 x86_64",

    echo: (args) => args.join(" ") || "",

    history: () => commandHistory.map((c, i) => `${i + 1}  ${c}`).join("\n"),

    ls: () => Object.keys(files).join("  "),

    "ls -l": () =>
      Object.keys(files)
        .map((f) => `-rw-r--r-- 1 alex alex  ${f}`)
        .join("\n"),

    cat: (args) => {
      const file = args[0];
      if (!file) return "cat: missing file operand";
      if (!files[file]) return `cat: ${file}: No such file`;
      return files[file];
    },

    skills: () => `
• Full-stack Web & Mobile development
• Offensive security & penetration testing
`,

    clear: () => {
      resetTerminal();
      return "";
    },

    // 🚫 BLOCKED COMMANDS
    cd: () => "Operation not allowed in this environment.",
    rm: () => "Operation not allowed in this environment.",
    mkdir: () => "Operation not allowed in this environment.",
    touch: () => "Operation not allowed in this environment.",
    nano: () => "Operation not allowed in this environment.",
    vim: () => "Operation not allowed in this environment.",

    hint: () => "Are you sure these are all the commands available?",

    // 🕵️‍♂️ SECRET COMMAND
    _s3cret_: async () => {
      isRoot = true;
      updatePrompt();

      print("TOP SECRET", "text-white font-bold text-4xl text-center");

      await printSlow(
        [
          "",
          "You found something most users never will.",
          "",
          "You didn’t just use the interface —",
          "you questioned it.",
          "",
          "That mindset is the foundation of",
          "offensive security, reverse engineering",
          "and real problem solving.",
          "",
          "Curiosity > Instructions.",
          "Understanding > Tools.",
          "",
          "Welcome to the other side.",
        ],
        "text-indigo-400",
        35
      );
    },
  };

  // =====================
  // INPUT HANDLING
  // =====================
  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const raw = input.value.trim();
      if (!raw) return;

      // 🔥 CLEAR INPUT IMMEDIATELY (FIX)
      input.value = "";

      commandHistory.push(raw);
      historyIndex = commandHistory.length;

      printCommand(raw);

      const parts = raw.split(" ");
      const base = parts[0];
      const args = parts.slice(1);

      const commandFn = commands[raw] || commands[base];

      if (commandFn) {
        const result = commandFn(args);
        if (result instanceof Promise) {
          await result;
        } else if (result) {
          print(result);
        }
      } else {
        print(`command not found: ${raw}`, "text-red-400");
      }

      terminal.scrollTop = terminal.scrollHeight;
    }

    // ↑ history
    if (e.key === "ArrowUp") {
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = commandHistory[historyIndex] || "";
    }

    // ↓ history
    if (e.key === "ArrowDown") {
      historyIndex = Math.min(commandHistory.length, historyIndex + 1);
      input.value = commandHistory[historyIndex] || "";
    }
  });

  // =====================
  // BOOT
  // =====================
  printInitialProfile();
  updatePrompt();
  input.focus();
});
