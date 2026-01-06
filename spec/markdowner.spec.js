import { describe, it, expect } from 'vitest';
import subject from '../src/markdowner';

describe('The markdowner', () => {
    it('exists', () => {
        expect(subject.toMarkdown([])).toBeDefined();
    });

    it('returns an empty string when given an empty array', () => {
        const result = subject.toMarkdown([]);
        expect(result).toBe('');
    });

    it('formats a single group with a single card correctly', () => {
        const groups = [
            {
                prefix: 'TODO',
                cards: [
                    { name: 'TODO: Fix the bug' }
                ]
            }
        ];

        const expected = '### TODO\n\n1. Fix the bug';
        expect(subject.toMarkdown(groups)).toBe(expected);
    });

    it('formats a single group with multiple cards correctly', () => {
        const groups = [
            {
                prefix: 'DONE',
                cards: [
                    { name: 'DONE: Implement feature A' },
                    { name: 'DONE: Refactor component B' }
                ]
            }
        ];

        const expected = '### DONE\n\n1. Implement feature A  \n1. Refactor component B';
        expect(subject.toMarkdown(groups)).toBe(expected);
    });

    it('formats multiple groups correctly', () => {
        const groups = [
            {
                prefix: 'TODO',
                cards: [
                    { name: 'TODO: Fix bug #123' },
                    { name: 'TODO: Update documentation' }
                ]
            },
            {
                prefix: 'IN PROGRESS',
                cards: [
                    { name: 'IN PROGRESS: Implement login feature' }
                ]
            },
            {
                prefix: 'DONE',
                cards: [
                    { name: 'DONE: Deploy to production' },
                    { name: 'DONE: Add unit tests' }
                ]
            }
        ];

        const expected = '### TODO\n\n1. Fix bug #123  \n1. Update documentation\n\n### IN PROGRESS\n\n1. Implement login feature\n\n### DONE\n\n1. Deploy to production  \n1. Add unit tests';
        expect(subject.toMarkdown(groups)).toBe(expected);
    });

    it('handles card names that do not start with the prefix', () => {
        const groups = [
            {
                prefix: 'TODO',
                cards: [
                    { name: 'Fix bug without prefix' }
                ]
            }
        ];

        const expected = '### TODO\n\n1. Fix bug without prefix';
        expect(subject.toMarkdown(groups)).toBe(expected);
    });

    it('correctly removes the prefix from card names', () => {
        const groups = [
            {
                prefix: 'TODO',
                cards: [
                    { name: 'TODO: First task' },
                    { name: 'Something without the prefix' },
                    { name: 'TODO: Another task' }
                ]
            }
        ];

        const expected = '### TODO\n\n1. First task  \n1. Something without the prefix  \n1. Another task';
        expect(subject.toMarkdown(groups)).toBe(expected);
    });

    it('handles special characters in card names and prefixes', () => {
        const groups = [
            {
                prefix: '🔥 URGENT',
                cards: [
                    { name: '🔥 URGENT: Fix security issue!' },
                    { name: '🔥 URGENT: Update dependencies' }
                ]
            }
        ];

        const expected = '### 🔥 URGENT\n\n1. Fix security issue!  \n1. Update dependencies';
        expect(subject.toMarkdown(groups)).toBe(expected);
    });

    it('handles empty card arrays in groups', () => {
        const groups = [
            {
                prefix: 'TODO',
                cards: []
            }
        ];

        const expected = '### TODO\n\n';
        expect(subject.toMarkdown(groups)).toBe(expected);
    });
});