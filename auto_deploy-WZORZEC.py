import os
import shutil
import subprocess
import json

def run_cmd(cmd):
    print(f"  > Wykonuję: {cmd}")
    result = subprocess.run(cmd, shell=True, text=True, capture_output=True)
    return result

def clean_and_fix_files():
    print("\n🛠️ KROK 1: Naprawa plików pod kątem Vercel...")
    
    os.makedirs("src", exist_ok=True)
    
    folders = ["components", "services", "hooks", "utils", "assets", "styles"]
    for folder in folders:
        if os.path.exists(folder):
            dest = os.path.join("src", folder)
            if os.path.exists(dest): 
                shutil.rmtree(dest)
            shutil.copytree(folder, dest)
            print(f"    ✅ Folder '{folder}' zsynchronizowany")

    if not os.path.exists("public"):
        os.makedirs("public", exist_ok=True)

    files = ["App.tsx", "index.tsx", "types.ts", "main.tsx"]
    for f in files:
        if os.path.exists(f):
            shutil.copy2(f, os.path.join("src", f))
            print(f"    ✅ Plik '{f}' zsynchronizowany")

    if os.path.exists("index.css"):
        shutil.copy2("index.css", os.path.join("src", "index.css"))

    # --- PACKAGE.JSON Z @google/genai ---
    print("\n    🔧 Tworzę package.json z WSZYSTKIMI bibliotekami")
    package_data = {
        "name": "biznexus-ai",
        "version": "0.0.0",
        "private": True,
        "type": "module",
        "scripts": {
            "dev": "vite",
            "build": "vite build",
            "preview": "vite preview"
        },
        "dependencies": {
            "react": "^18.3.1",
            "react-dom": "^18.3.1",
            "lucide-react": "^0.460.0",
            "recharts": "^2.12.7",
            "@google/generative-ai": "^0.21.0"
        },
        "devDependencies": {
            "@types/react": "^18.3.3",
            "@types/react-dom": "^18.3.0",
            "@vitejs/plugin-react": "^4.3.4",
            "typescript": "^5.6.3",
            "vite": "^6.4.1",
            "tailwindcss": "^3.4.1",
            "autoprefixer": "^10.4.17",
            "postcss": "^8.4.35"
        }
    }
    
    with open("package.json", "w", encoding="utf-8") as f:
        json.dump(package_data, f, indent=2)
    print("    ✅ package.json (+ @google/generative-ai)")

    # vite.config.ts
    with open("vite.config.ts", "w", encoding="utf-8") as f:
        f.write('''import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: { 
    outDir: "dist",
    emptyOutDir: true
  }
});
''')
    print("    ✅ vite.config.ts")

    # index.html
    entry_file = "main.tsx" if os.path.exists("src/main.tsx") else "index.tsx"
    
    html_content = f'''<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BizNexus AI - The Ultimate Business Copilot</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/{entry_file}"></script>
  </body>
</html>
'''
    
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"    ✅ index.html (entry: /src/{entry_file})")

    # main.tsx / index.tsx
    if not os.path.exists(f"src/{entry_file}"):
        with open(f"src/{entry_file}", "w", encoding="utf-8") as f:
            f.write('''import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
''')
        print(f"    ✅ src/{entry_file}")

    # index.css (Tailwind)
    if not os.path.exists("src/index.css"):
        with open("src/index.css", "w", encoding="utf-8") as f:
            f.write('''@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
}
''')
        print("    ✅ src/index.css")

    # tailwind.config.js
    with open("tailwind.config.js", "w", encoding="utf-8") as f:
        f.write('''/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
''')
    print("    ✅ tailwind.config.js")

    # postcss.config.js
    with open("postcss.config.js", "w", encoding="utf-8") as f:
        f.write('''export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
''')
    print("    ✅ postcss.config.js")

    # tsconfig.json
    with open("tsconfig.json", "w", encoding="utf-8") as f:
        f.write('''{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": false
  },
  "include": ["src"]
}
''')
    print("    ✅ tsconfig.json")

    print("\n✅ Wszystkie pliki gotowe!")

def setup_git_and_deploy():
    print("\n🚀 KROK 2: Wysyłka do GitHub...")
    repo_name = input("Podaj NOWĄ nazwę repozytorium: ").strip()
    if not repo_name: 
        print("❌ Brak nazwy!")
        return

    if os.path.exists(".git"):
        run_cmd("attrib -h -r -s .git /s /d")
        run_cmd("rd /s /q .git")
    
    run_cmd("git init")
    run_cmd("git add .")
    run_cmd('git commit -m "BizNexus AI - Full Stack + Gemini AI"')
    run_cmd("git branch -M main")

    print(f"📦 Tworzę '{repo_name}'...")
    create_result = run_cmd(f"gh repo create {repo_name} --public")
    
    if create_result.returncode != 0:
        print(f"❌ Błąd: {create_result.stderr}")
        return
    
    whoami_result = run_cmd("gh api user -q .login")
    whoami = whoami_result.stdout.strip()
    
    if not whoami:
        print("❌ Nie można pobrać użytkownika")
        return
    
    run_cmd(f"git remote add origin https://github.com/{whoami}/{repo_name}.git")
    
    print("📤 Wysyłam...")
    result = run_cmd("git push -u origin main --force")

    if result.returncode == 0:
        print(f"\n✅ GOTOWE! https://github.com/{whoami}/{repo_name}")
        print("\n🚀 Vercel będzie budował automatycznie!")
    else:
        print(f"\n❌ Błąd: {result.stderr}")

if __name__ == "__main__":
    clean_and_fix_files()
    setup_git_and_deploy()
    input("\nEnter...")
