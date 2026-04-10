# TEACH-ME

Your personal CLAUDE Code teacher – an interactive CLI application powered by [Claude](https://www.anthropic.com/claude) that teaches you programming concepts step by step.

## Features

- 🎓 **Patient, encouraging teacher** – breaks down complex topics into digestible steps
- 💬 **Multi-turn conversations** – Claude remembers context within a session
- 🔄 **Reset anytime** – start fresh with `/reset` without restarting the app
- 🛠️ **Covers everything** – from beginner fundamentals to advanced architecture, including Claude Code itself

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- An [Anthropic API key](https://console.anthropic.com/)

## Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/endorphin-ai/TEACH-ME.git
   cd TEACH-ME
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure your API key**

   ```bash
   cp .env.example .env
   # Edit .env and replace `your_api_key_here` with your actual key
   ```

## Usage

```bash
npm start
```

You will be greeted with a prompt where you can ask any coding question:

```
╔══════════════════════════════════════════════════════════╗
║              Welcome to TEACH-ME! 🎓                     ║
║         Your Personal CLAUDE Code Teacher                ║
╚══════════════════════════════════════════════════════════╝

Ask me anything about programming and I'll teach you step by step.

Commands:
  /reset   - Start a new conversation
  /quit    - Exit TEACH-ME
  /help    - Show this help message

📚 You: What is a closure in JavaScript?

🤖 TEACH-ME: Great question! A closure is ...
```

### Commands

| Command  | Description                              |
| -------- | ---------------------------------------- |
| `/reset` | Clear conversation history and start fresh |
| `/quit`  | Exit the application                     |
| `/help`  | Show available commands                  |

## Running Tests

```bash
npm test
```

## License

ISC
