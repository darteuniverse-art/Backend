# Contributing to DarteBackend

Kindly follow these guidelines to keep our workflow smooth.

## Project Setup

- Clone the repo and run `npm install`.
- Copy `.env.example` to `.env.local` and fill in required variables.
- Use Node.js v20+

## Branching & Workflow

- Use feature branches: `feature/your-feature`, `bugfix/your-bug`, etc.
- Always branch from `main`.
- Open a pull request (PR) for all changes. At least one team member must review before merging.
- Avoid pushing code directly to main to prevent broken changes.
- For models with text indexes, try and use the $text keyword for lookups to speed up db queries
- For frequently queried fields, create a single or compound index in the model file to speed up queries as well

## Commit Messages

- Use clear, descriptive commit messages.
- Example: `fix(cart): handle empty cart on checkout`, `feat(payment): strengthened validation pipelines in webhook`

## Code Style

- Follow the existing code structure and patterns.
- Use async/await for all async operations.
- Write clear and concise comments to explain your code.
- Keep controllers and services distinct for a clear separation of concerns.

## Testing

- Add or update tests for new features and bug fixes.
- Run all tests before submitting a PR.

## Reporting Bugs

- Open an issue with steps to reproduce, expected and actual behavior, and environment details.

## Questions

- For questions, open a discussion or contact a team member.

