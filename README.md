## 🛠️ SET UP THE PROJECT

```
git clone https://github.com/webdevadventure/client.git
npm install
npm run dev
```

## 🌵How to push code in one command (in case you have already created the .git directory and pointed to the Github repo)

### create deploy.js or deploy.cjs file

```cjs
// deploy.js
const { execSync } = require("child_process");

const args = process.argv.slice(2);
let message = "";
let branch = "";

// Parse args dạng: --msg "abc" hoặc --msg=abc
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--msg" && args[i + 1]) {
    message = args[i + 1];
    i++;
  } else if (args[i].startsWith("--msg=")) {
    message = args[i].split("=")[1];
  } else if (args[i] === "--br" && args[i + 1]) {
    branch = args[i + 1];
    i++;
  } else if (args[i].startsWith("--br=")) {
    branch = args[i].split("=")[1];
  }
}

if (!message) {
  console.error(
    '❌ lack of commit message, try: node deploy.cjs -- --msg "message" [--br branch]',
  );
  process.exit(1);
}

// Nếu không có branch thì lấy branch hiện tại
if (!branch) {
  branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
}

console.log(`📦 Commit message: "${message}"`);
console.log(`🌿 Branch: ${branch}`);

try {
  execSync("git add .", { stdio: "inherit" });
  execSync(`git commit -m "${message}"`, { stdio: "inherit" });
  execSync(`git push origin ${branch}`, { stdio: "inherit" });
  console.log("✅ successfully push to git");
} catch (error) {
  console.error("❌ error when excuting:", error.message);
  process.exit(1);
}
```

### usage

if you want to push to main branch (default by main):

```
node deploy.cjs -- --msg "<your commit messages>"
```

or with specific branch

```
node deploy.cjs -- --msg "<your commit messages>" --br <your branch>
```

## 🤝 How to Contribute

Your contributions can help enrich this repository! If you have suggestions or resources to add, please follow these steps:

1. Fork this repository.
2. Create a new branch (`git checkout -b improve-feature`).
3. Make your changes.
4. Commit your updates (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin improve-feature`).
6. Create a new Pull Request.
