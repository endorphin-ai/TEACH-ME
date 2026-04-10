#!/usr/bin/env node
'use strict';

require('dotenv').config();

const readline = require('readline');
const { Teacher } = require('./src/teacher');

const WELCOME_MESSAGE = `
╔══════════════════════════════════════════════════════════╗
║              Welcome to TEACH-ME! 🎓                     ║
║         Your Personal CLAUDE Code Teacher                ║
╚══════════════════════════════════════════════════════════╝

Ask me anything about programming and I'll teach you step by step.

Commands:
  /reset   - Start a new conversation
  /quit    - Exit TEACH-ME
  /help    - Show this help message
`;

const HELP_MESSAGE = `
Commands:
  /reset   - Start a new conversation (clears history)
  /quit    - Exit TEACH-ME
  /help    - Show this help message

Tips:
  - Ask about any programming topic or concept
  - Share code snippets for review or debugging help
  - Ask follow-up questions to dive deeper
  - Request exercises to practice what you learn
`;

function printHelp() {
  console.log(HELP_MESSAGE);
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error(
      'Error: ANTHROPIC_API_KEY environment variable is not set.\n' +
        'Please copy .env.example to .env and add your Anthropic API key.\n' +
        'Get your API key at https://console.anthropic.com/'
    );
    process.exit(1);
  }

  const teacher = new Teacher(apiKey);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '\n📚 You: ',
  });

  console.log(WELCOME_MESSAGE);
  rl.prompt();

  rl.on('line', async (line) => {
    const input = line.trim();

    if (!input) {
      rl.prompt();
      return;
    }

    if (input === '/quit' || input === '/exit') {
      console.log('\nGoodbye! Keep coding and keep learning! 👋\n');
      rl.close();
      return;
    }

    if (input === '/reset') {
      teacher.resetConversation();
      console.log('\n✅ Conversation reset. Starting fresh!\n');
      rl.prompt();
      return;
    }

    if (input === '/help') {
      printHelp();
      rl.prompt();
      return;
    }

    try {
      rl.pause();
      process.stdout.write('\n🤖 TEACH-ME: ');

      const answer = await teacher.ask(input);
      console.log(answer);
    } catch (err) {
      if (err.status === 401) {
        console.error('\nError: Invalid API key. Please check your ANTHROPIC_API_KEY.\n');
      } else if (err.status === 429) {
        console.error('\nError: Rate limit reached. Please wait a moment and try again.\n');
      } else {
        console.error(`\nError: ${err.message}\n`);
      }
    } finally {
      rl.resume();
      rl.prompt();
    }
  });

  rl.on('close', () => {
    process.exit(0);
  });
}

main();
