'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { Teacher, SYSTEM_PROMPT } = require('../src/teacher');

describe('SYSTEM_PROMPT', () => {
  it('contains the teacher identity', () => {
    assert.ok(SYSTEM_PROMPT.includes('TEACH-ME'));
  });

  it('mentions coding and programming topics', () => {
    assert.ok(SYSTEM_PROMPT.toLowerCase().includes('coding'));
    assert.ok(SYSTEM_PROMPT.toLowerCase().includes('programming'));
  });

  it('sets a supportive teaching tone', () => {
    assert.ok(SYSTEM_PROMPT.toLowerCase().includes('patient'));
  });
});

describe('Teacher', () => {
  it('initializes with an empty conversation history', () => {
    const teacher = new Teacher('test-key');
    assert.deepEqual(teacher.conversationHistory, []);
  });

  it('resetConversation clears the history', () => {
    const teacher = new Teacher('test-key');
    teacher.conversationHistory.push({ role: 'user', content: 'hello' });
    teacher.conversationHistory.push({ role: 'assistant', content: 'hi' });

    teacher.resetConversation();

    assert.deepEqual(teacher.conversationHistory, []);
  });

  it('uses the provided API key', () => {
    const teacher = new Teacher('my-secret-key');
    assert.equal(teacher.client.apiKey, 'my-secret-key');
  });
});
