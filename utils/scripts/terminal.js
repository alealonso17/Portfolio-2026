document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("terminal-input");
  const output = document.getElementById("terminal-output");
  const terminal = document.getElementById("terminal");

  if (!input || !output || !terminal) {
    console.warn("Terminal elements not found");
    return;
  }

  // --- STATE ---
  let commandHistory = [];
  let historyIndex = -1;

  // --- HELPERS ---
  const print = (text, color = "text-indigo-400") => {
    output.innerHTML += `
      <div class="${color} whitespace-pre-line">${text}</div>
    `;
  };

  const printCommand = (cmd) => {
    output.innerHTML += `
      <div class="text-gray-500">
        <span class="text-green-400">$</span> ${cmd}
      </div>
    `;
  };

  const resetTerminal = () => {
    output.innerHTML = "";
  };

  // --- INITIAL OUTPUT ---
  const printInitialProfile = () => {
    printCommand("cat profile.txt");
    print("→ Full-Stack IOS/Web Developer", "text-indigo-400");
    print(
      "→ Security-focused mindset with hands-on offensive testing",
      "text-purple-400"
    );
    print(
      "→ Machine learning fundamentals & data handling",
      "text-pink-400"
    );
  };

  // --- FAKE FILESYSTEM ---
  const files = {
    "profile.txt": `
Name: Alejandro Alonso
Role: Full-Stack Developer
Focus: IOS  & Web apps development
`,
    "web.txt": `
Projects are available in the Projects section.
Use the navigation bar above.
`,
    "labs.txt": `
Hands-on cybersecurity labs and writeups.
Visit the Cybersecurity Lab section.
`,
    "ios.txt": `
IOS Built apps with swift
Check the IOS section.
`
  };

  // --- COMMANDS ---
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

    whoami: () =>
      "Full-Stack Developer · Passionate about Offensive Security",

    pwd: () =>
      "/home/alejandro/portfolio",

    date: () =>
      new Date().toString(),

    uname: () =>
      "Linux portfolio 6.6.0 x86_64",

    echo: (args) =>
      args.join(" ") || "",

    history: () =>
      commandHistory.map((c, i) => `${i + 1}  ${c}`).join("\n"),

    ls: () =>
      Object.keys(files).join("  "),

    "ls -l": () =>
      Object.keys(files)
        .map(f => `-rw-r--r-- 1 alex alex  ${f}`)
        .join("\n"),

    cat: (args) => {
      const file = args[0];
      if (!file) return "cat: missing file operand";
      if (!files[file]) return `cat: ${file}: No such file`;
      return files[file];
    },

    skills: () => `
• Full-stack Web and IOS development (Swift, SwiftUI, JavaScript, Node.js, SQL... )
• Offensive security & penetration testing
• Python scripting & automation
• Machine learning fundamentals & data handling
`,

    clear: () => {
      resetTerminal();
      return "";
    },

    // 🚫 FORBIDDEN COMMANDS
    cd: () => "Operation not allowed in this environment.",
    rm: () => "Operation not allowed in this environment.",
    mkdir: () => "Operation not allowed in this environment.",
    touch: () => "Operation not allowed in this environment.",
    nano: () => "Operation not allowed in this environment.",
    vim: () => "Operation not allowed in this environment.",

    // 🧠 HINT (no aparece en help)
    hint: () =>
      "Are you sure these are all the commands available?",

    // 🕵️‍♂️ SECRET COMMAND
    _s3cret_: () => `
🧠 You found it.

Congratulations.
You didn’t just use the interface —
you inspected the system.

That’s exactly how offensive security starts.

Thinking outside the box is the real skill.
`
  };

  // --- INPUT HANDLING ---
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const raw = input.value.trim();
      if (!raw) return;

      commandHistory.push(raw);
      historyIndex = commandHistory.length;

      printCommand(raw);

      const parts = raw.split(" ");
      const base = parts[0];
      const args = parts.slice(1);

      let result = "";

      if (commands[raw]) {
        result = commands[raw]();
      } else if (commands[base]) {
        result = commands[base](args);
      } else {
        print(`command not found: ${raw}`, "text-red-400");
      }

      if (result) print(result);

      input.value = "";
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

  // --- BOOT TERMINAL ---
  printInitialProfile();
  input.focus();
});