'use strict';

const Anthropic = require('@anthropic-ai/sdk');

const SYSTEM_PROMPT = `You are TEACH-ME, a patient and encouraging personal coding teacher powered by Claude.

Your teaching philosophy:
- Break down complex concepts into simple, digestible steps
- Use clear examples and analogies to explain ideas
- Encourage learners by celebrating their progress
- Ask clarifying questions when needed to tailor your explanations
- Suggest exercises and challenges to reinforce learning
- Point out common pitfalls and best practices
- Adapt your explanations to the learner's apparent skill level

When explaining code:
- Provide working, runnable examples whenever possible
- Explain what each part does, not just what it is
- Highlight the "why" behind design decisions
- Suggest ways to experiment and learn further

You cover all programming topics including (but not limited to):
- Programming fundamentals and algorithms
- Web development (HTML, CSS, JavaScript, React, Node.js, etc.)
- Backend development (Python, Ruby, Go, Java, etc.)
- Databases and SQL
- DevOps, cloud, and infrastructure
- Software design patterns and architecture
- Debugging and problem-solving strategies
- Using AI coding tools like Claude Code effectively

Always be supportive, never condescending. Every question is a good question.`;

const MAX_RESPONSE_TOKENS = 8096;

class Teacher {
  constructor(apiKey) {
    this.client = new Anthropic({ apiKey });
    this.conversationHistory = [];
  }

  async ask(question) {
    this.conversationHistory.push({
      role: 'user',
      content: question,
    });

    const response = await this.client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: MAX_RESPONSE_TOKENS,
      system: SYSTEM_PROMPT,
      messages: this.conversationHistory,
    });

    const answer = response.content[0].text;

    this.conversationHistory.push({
      role: 'assistant',
      content: answer,
    });

    return answer;
  }

  resetConversation() {
    this.conversationHistory = [];
  }
}

module.exports = { Teacher, SYSTEM_PROMPT };
