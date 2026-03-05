---
trigger: always_on
---

# Windsurf Development Rules: Mobile Clicker Game

## 🧩 Project Stack & Context

- **Framework:** React and Vite
- **Backend:** Firebase (Firestore, Auth).
- **Project Management:** Linear (MCP).
- **Testing:** Jest + React Relevant

## 🤖 AI Agent Behavior (Cascade)

1. **Linear Triage:** Before starting, check Linear for the next task.
2. **Plan & Test:** For logic changes, propose the test cases _before_ the implementation.
3. **Atomic Commits:** Commit after every passing test suite.

## 🧪 Testing & Quality Process

- **Logic Tests:** Every math utility (e.g., `calculateNextUpgradeCost`) must have a corresponding `.test.ts` file using Jest.
- **Component Tests:** Use RNTL to test button clicks (e.g., "When the button is clicked, the score should increase by X").
- **Firebase Mocking:** Never hit the live Firebase DB during unit tests. Use `jest-mock` for Firebase services.
- **Red-Green-Refactor:** 1. Write/Update test (Red). 2. Write code to pass test (Green). 3. Cleanup and optimize (Refactor).

## 🔐 Security & Firebase

- **Security Rules:** Every collection needs a matching `firestore.rules` update.
- **Env Security:** Use `expo-constants` for API keys; never commit `.env` files.

## 🏗️ Code Architecture

- **State:** Use a central store (Zustand or Context) so it’s easy to test.
- **UI:** Keep components "dumb" (visual only) and logic in "hooks" or "utils."
