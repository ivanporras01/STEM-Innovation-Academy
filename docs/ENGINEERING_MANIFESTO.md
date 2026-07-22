# NOVA Engineering Manifesto

## 1. Engineering Mission

NOVA exists to create real employability for students without access to quality technical education. We build technology that bridges the gap between classroom and first tech job, and beyond, toward emerging fields like quantum computing.

Engineering quality at NOVA is not an abstract ideal—it directly affects learners. A broken feature means a student cannot progress. A confusing interface means a student loses motivation. A security vulnerability means student data is compromised. Every engineering decision ultimately impacts someone's educational journey.

Our responsibility is to build software that is worthy of the trust placed in this platform. Students, parents, educators, and institutions rely on NOVA to deliver on its promise: verifiable skills, authentic learning, and pathways to opportunity. When we compromise on engineering quality, we compromise on that promise.

We recognize that many NOVA users access this platform from regions with limited resources, on older devices, with unreliable internet connections. Our engineering must respect these constraints. Performance is not a luxury—it is accessibility. Reliability is not a goal—it is a prerequisite.

The code we write today will be maintained by engineers we have not yet met. Decisions we make now will affect the platform for years. We build for the long term. We build for scale we have not yet achieved. We build for learners we have not yet served.

---

## 2. Product Philosophy

The purpose of NOVA is learning, not technology. Technology exists to empower Explorers to learn, build, innovate, and inspire. Every feature must serve this purpose. If a feature does not improve learning, it does not belong in NOVA.

Simplicity wins because learning is already complex. Our technology should reduce cognitive load, not add to it. Every interface should be immediately understandable. Every interaction should have clear purpose. Every navigation path should be obvious.

Education comes before technology. We never add technology for its own sake. We never chase trends because they are fashionable. We adopt technology only when it clearly serves the learning mission. When in doubt, choose the simpler solution.

The NOVA experience must feel professional and modern, but never intimidating. We serve students from age 8 to adult learners. Our interfaces must respect this range. Young Explorers need clarity and encouragement. Adult learners need efficiency and depth. The platform must adapt to both without compromising either.

Every feature must improve learning. Before building anything, ask: How does this help a student learn? How does this help a mentor teach? How does this help an institution scale? If the answer is unclear, the feature is not ready.

---

## 3. Engineering Principles

### Build Small

Large systems are built from small, understandable pieces. Prefer functions that do one thing well. Prefer components that have single responsibilities. Prefer modules with clear boundaries. Small code is easier to test, easier to debug, easier to maintain, and easier to understand.

### Build Clearly

Code is read more often than it is written. Write for the reader. Use names that explain intent. Structure code to reveal flow. Avoid clever tricks that sacrifice clarity. If code requires a comment to explain what it does, rewrite the code.

### Build Safely

Every change carries risk. Protect working systems. Test before deploying. Validate assumptions. Handle errors gracefully. Never leave the system in a worse state than you found it. When in doubt, err on the side of caution.

### Prefer Evolution Over Revolution

Revolutionary changes break systems. Evolutionary changes improve them. Prefer incremental improvements over wholesale rewrites. The best architecture is the one that already works. Change what needs changing, leave what works alone.

### Never Break Working Systems

This is the first rule of NOVA engineering. If code is working, do not break it. If you must change it, understand why it works the way it does. Preserve existing behavior unless there is a compelling reason to change it.

### Every Feature Must Have a Clear Purpose

Ambiguity is the enemy of quality. Before writing code, articulate the purpose. What problem does this solve? For whom? Why is this the right solution? If you cannot answer these questions clearly, do not write the code.

### Every Line of Code Increases Maintenance Cost

Code is not an asset—it is a liability. Every line must be maintained, tested, debugged, and understood. Before adding code, ask whether the value justifies the cost. The best code is the code you don't have to write.

### Remove Complexity Instead of Adding It

When a system becomes complex, do not add abstraction layers to manage the complexity. Remove the source of complexity instead. Simplify the design. Eliminate unnecessary features. Consolidate duplicate logic. Complexity is not solved by more code.

### Optimize for Readability

Readable code is maintainable code. Use consistent naming. Follow established patterns. Structure files logically. Write functions that tell a story. The best code reads like prose.

### Optimize for Future Engineers

You will not maintain this code forever. Write for the engineer who comes after you. They should be able to understand your intent without asking you. They should be able to modify your work without fear. They should thank you, not curse you.

---

## 4. Architecture Philosophy

### Respect Existing Architecture

The current architecture exists for reasons. Some reasons are documented, some are implicit. Before changing architecture, understand the reasons. Respect the patterns that work. Evolution is preferable to revolution.

### Do Not Duplicate Business Logic

Business logic belongs in one place. If the same logic appears in multiple files, extract it. Duplication creates maintenance burden and inconsistency. When logic changes, it should change in one place only.

### Keep Responsibilities Separated

Modules should have single responsibilities. UI should not contain business logic. API routes should not contain UI logic. Utilities should not contain domain logic. Clear separation enables independent testing and modification.

### Avoid Tight Coupling

Coupling creates dependencies. Dependencies create risk. Prefer loose coupling through interfaces and clear contracts. Modules should be able to change without requiring changes across the system.

### Protect Shared Infrastructure

Shared infrastructure—authentication, database, utilities—requires special care. Changes here affect the entire system. Modify with extreme caution. Test thoroughly. Document extensively.

### Minimize Dependencies

Every dependency is a risk. It introduces security vulnerabilities, version conflicts, and maintenance burden. Prefer standard library solutions. Add external dependencies only when necessary. Choose dependencies with active maintenance.

### Prefer Modular Growth

The system should grow through addition, not modification. New features should be new modules. New modules should integrate through defined interfaces. This allows the system to scale without becoming entangled.

---

## 5. Code Quality Standards

### Naming

- Use descriptive names that reveal intent
- Prefer verbs for functions, nouns for variables
- Avoid abbreviations unless widely understood
- Be consistent with existing patterns
- Names should answer "what" not "how"

### Folder Organization

- Group by feature/domain, not by file type
- Keep related files together
- Avoid deep nesting (maximum 3-4 levels)
- Use index files for clean imports
- Follow existing directory structure

### File Organization

- One concept per file
- Keep files under 300 lines when possible
- Place imports at the top, grouped logically
- Export main functionality first
- Use consistent ordering within files

### Functions

- Functions should do one thing
- Prefer pure functions when possible
- Limit parameters to 3-4 when possible
- Return early to reduce nesting
- Use descriptive parameter names

### Components

- Components should be small and focused
- Prefer composition over inheritance
- Use TypeScript interfaces for props
- Extract reusable logic to custom hooks
- Separate presentational from container components

### Server Components

- Default to server components
- Use for data fetching and heavy computation
- Avoid client-side dependencies
- Keep rendering logic simple
- Leverage server-side rendering for performance

### Client Components

- Mark with "use client" only when necessary
- Use for interactivity and state
- Minimize client-side JavaScript
- Prefer server actions for mutations
- Optimize re-renders with memo when needed

### API Routes

- Keep routes thin—delegate to lib functions
- Validate all inputs with Zod schemas
- Handle errors consistently
- Return appropriate HTTP status codes
- Log errors for debugging

### Utilities

- Place pure functions in lib/
- Avoid side effects
- Export functions, not objects
- Use TypeScript for type safety
- Document non-obvious logic

### Database Access

- Always use the Prisma client from lib/db.ts
- Prefer type-safe Prisma queries
- Avoid raw SQL unless necessary
- Use transactions for multi-step operations
- Handle database errors gracefully

### Error Handling

- Never swallow errors silently
- Log errors with context
- Provide user-friendly error messages
- Distinguish between client and server errors
- Implement retry logic for transient failures

### Logging

- Log at appropriate levels (error, warn, info)
- Include context in log messages
- Avoid logging sensitive data
- Use structured logging when possible
- Monitor logs for issues

### Comments

- Code should be self-documenting
- Use comments to explain "why," not "what"
- Document non-obvious business logic
- Keep comments current with code
- Avoid comment rot—remove outdated comments

### Documentation

- Document complex algorithms
- Explain architectural decisions
- Provide usage examples for public APIs
- Keep README files up to date
- Document environment variables

### Refactoring

- Refactor in small steps
- Test after each change
- Preserve existing behavior
- Improve structure without changing functionality
- Leave the code better than you found it

---

## 6. UI Philosophy

The NOVA interface must always feel professional, modern, calm, friendly, and future-oriented. We are building an educational platform, not a game. Our users are serious learners, not casual consumers.

### Professional

Use consistent spacing, typography, and color. Avoid jarring animations. Respect established design patterns. The interface should inspire confidence in the platform's quality.

### Modern

Stay current with design trends without being trendy. Use contemporary layouts and interactions. Avoid dated UI patterns. The platform should feel current and relevant.

### Calm

Education requires focus. Avoid visual clutter. Use whitespace generously. Limit color usage. Reduce cognitive load. The interface should be a tool, not a distraction.

### Friendly

Use approachable language. Provide clear feedback. Make errors understandable. Design for empathy. The platform should feel like a supportive learning environment.

### Future-Oriented

Design for scale. Design for new features. Design for devices we haven't seen yet. The architecture should accommodate growth without requiring redesign.

### Simple

Complexity is the enemy of learning. Reduce clicks. Reduce choices. Reduce cognitive load. The best interface is the one the user doesn't notice.

### Accessible

Design for all users. Support keyboard navigation. Ensure color contrast. Provide alt text. Test with screen readers. Accessibility is not optional.

### Never Cluttered

White space is a design element, not empty space. Use it deliberately. Avoid overcrowding. Let content breathe. Cluttered interfaces overwhelm users.

### Never Childish

We serve students, not children. Avoid cartoonish elements. Use age-appropriate design. Respect the intelligence of our users. The platform should feel mature.

### Never Overwhelming

Present information progressively. Use progressive disclosure. Avoid information overload. Guide users through complexity. The interface should build confidence, not anxiety.

### Always Mission-Driven

Every UI element should serve the learning mission. Remove decorative elements that don't add value. Design with purpose. The interface is a means to an end, not the end itself.

Reference the NOVA UI Guidelines for detailed design specifications.

---

## 7. AI Development Philosophy

AI at NOVA exists to enhance learning, not replace it. AI should guide, not dictate. AI should encourage exploration, not provide shortcuts. AI should adapt to students, not force them into a single path.

### AI Must Help Learning

Every AI feature must improve learning outcomes. AI should identify gaps, provide hints, suggest resources, and offer encouragement. AI should not do the work for the student.

### AI Must Never Replace Critical Thinking

AI should support critical thinking, not substitute for it. Provide guidance that requires student reasoning. Avoid giving direct answers to problems that should be solved through thought.

### AI Should Guide

The role of AI is guidance, not instruction. AI should suggest paths, not mandate them. AI should offer hints, not solutions. AI should be a tutor, not a teacher replacement.

### AI Should Ask Questions

Learning happens through questioning. AI should ask probing questions. AI should encourage students to explain their reasoning. AI should promote metacognition.

### AI Should Encourage Exploration

AI should spark curiosity. AI should suggest related topics. AI should connect concepts. AI should help students discover, not just memorize.

### AI Should Adapt to Students

Every student learns differently. AI should adjust to learning pace. AI should recognize frustration. AI should celebrate progress. Personalization is AI's strength.

### AI Should Be Explainable

Students should understand why AI makes suggestions. AI should explain its reasoning. AI should show its work. Transparency builds trust.

### AI Should Be Safe

AI responses must be age-appropriate. AI must avoid harmful content. AI must respect privacy. AI must have guardrails. Safety is non-negotiable.

---

## 8. Security Principles

### Protect Users

User security is paramount. Protect accounts from compromise. Protect data from unauthorized access. Protect privacy. Security is not an afterthought—it is foundational.

### Protect Data

Student data is sensitive. Encrypt data at rest and in transit. Minimize data collection. Retain data only as long as necessary. Comply with data protection regulations.

### Validate Everything

Never trust input. Validate on the client for UX, validate on the server for security. Use type-safe validation (Zod). Sanitize all inputs. Assume malicious intent.

### Never Trust Input

All input is potentially malicious. Validate, sanitize, and escape. Prevent injection attacks. Use parameterized queries. Never concatenate user input into queries or commands.

### Protect Secrets

Secrets belong in environment variables, not in code. Never commit secrets. Rotate secrets regularly. Use secret management services. Limit secret access to necessary services.

### Use Least Privilege

Services should have only the permissions they need. Database users should have minimal access. API keys should be scoped. Grant access narrowly, revoke broadly.

### Avoid Exposing Internal Information

Error messages should not reveal system details. Stack traces belong in logs, not in responses. API responses should not expose internal structure. Security through obscurity is insufficient, but information disclosure is dangerous.

---

## 9. Performance Philosophy

Performance is a feature. Slow pages lose users. Slow interactions break flow. Performance affects accessibility. Performance affects learning outcomes.

### Reduce Unnecessary Rendering

Use React.memo judiciously. Avoid prop drilling. Optimize re-renders. Use server components by default. Client components should have a reason to exist.

### Avoid Unnecessary API Calls

Cache responses. Batch requests. Use GraphQL or REST efficiently. Avoid waterfall requests. Every network call has a cost.

### Avoid Unnecessary Dependencies

Every dependency adds to bundle size. Tree-shake aggressively. Use dynamic imports for heavy libraries. Evaluate whether a dependency is worth its weight.

### Optimize Images

Use Next.js Image component. Serve appropriate sizes. Use modern formats (WebP, AVIF). Lazy load below-the-fold images. Images are often the heaviest assets.

### Optimize Bundle Size

Code-split by route. Analyze bundle size regularly. Remove unused code. Minify in production. Every kilobyte matters for users on slow connections.

### Prefer Server Components

Server components reduce client-side JavaScript. They enable direct database access. They improve initial load performance. Use them by default, use client components only when necessary.

### Cache Intelligently

Use HTTP caching headers. Cache API responses. Cache database queries when appropriate. Invalidate cache correctly. Cache is a performance multiplier, but stale cache is a bug.

---

## 10. Testing Philosophy

Every important change deserves validation. Never assume code works. Verify before deploying. Testing is not optional—it is professional responsibility.

### Never Assume

Assumptions are the root of bugs. Test your assumptions. Verify edge cases. Validate against requirements. The only safe assumption is that something will go wrong.

### Verify

Manual testing is insufficient. Automated tests provide regression protection. Test critical paths. Test error conditions. Test is how we sleep at night.

### Test Critical Paths

Identify the paths that matter most. Test enrollment flow. Test payment flow. Test authentication. Test certificate generation. These paths must work.

### Protect Production

Production is sacred. Staging is for testing. Local development is for experimentation. Never experiment in production. Never deploy without testing.

### Prefer Prevention Over Correction

Catch bugs before they reach production. Write tests alongside code. Fix the root cause, not the symptom. Prevention is cheaper than correction.

---

## 11. Change Management

### Small Changes

Large changes are risky. Break large changes into small changes. Small changes are easier to review, easier to test, easier to revert. Incremental progress is sustainable progress.

### One Objective Per Change

Each change should have one clear objective. Mixing objectives makes review difficult. Mixing objectives makes rollback risky. If a change has multiple objectives, split it.

### Minimal Scope

Change only what is necessary. Avoid refactoring unrelated code. Avoid "while I'm here" changes. Keep changes focused. Minimal scope reduces risk.

### Explain Risks First

Before implementing, articulate the risks. What could break? What are the dependencies? What is the rollback plan? Risk awareness enables risk mitigation.

### Rollback Plans

Every change needs a rollback plan. Can this change be reverted? What data would be lost? What manual steps are required? If you cannot roll back, do not deploy.

### Validation Plans

How will you validate this change? What tests will you run? What metrics will you monitor? Validation without a plan is not validation.

### Approval Before Commit

Complex changes require review. Discuss architecture changes. Discuss security changes. Discuss breaking changes. Collective wisdom exceeds individual wisdom.

### Approval Before Deployment

Production deployments require approval. Even small changes should be announced. Coordinate with team. Silent deployments are risky deployments.

---

## 12. Git Philosophy

### Small Commits

Commits should be small and focused. One logical change per commit. Small commits are easier to review. Small commits are easier to revert. Granular history is useful history.

### Meaningful Commit Messages

Commit messages should explain why, not just what. Use imperative mood. Reference relevant issues. Keep the first line short. Good commit messages tell a story.

### No Direct Pushes Without Review

Main branch protection is non-negotiable. All code must be reviewed. Reviews catch bugs. Reviews share knowledge. Reviews maintain quality. Bypassing review bypasses quality.

### Never Mix Unrelated Changes

One commit, one change. If you fix a bug and refactor code, make two commits. If you add a feature and update documentation, make two commits. Mixed changes are hard to review.

### Protect Main Branch

Main branch should always be deployable. Never commit broken code to main. Never commit experimental code to main. Use feature branches. Main is sacred.

---

## 13. AI Engineer Operating Rules

These are permanent rules that every AI agent must follow when contributing to the NOVA codebase.

### Never Modify Unrelated Files

Change only the files necessary for the task. If a task requires modifying authentication, do not modify payment logic. Scope changes narrowly. Unrelated modifications introduce risk.

### Never Rewrite Entire Systems Without Approval

Existing systems work for reasons. Rewriting them loses institutional knowledge. Rewriting them introduces risk. If a system needs rewriting, discuss it first. Get approval before rewriting.

### Never Introduce New Dependencies Casually

Every dependency is a liability. Evaluate alternatives. Check maintenance status. Assess security. Add dependencies only when necessary. New dependencies require justification.

### Never Delete Code Without Understanding Why It Exists

Code exists for reasons. Some reasons are documented, some are implicit. Before deleting, understand the purpose. If you cannot find the reason, ask. Deleting without understanding breaks systems.

### Never Modify Authentication Lightly

Authentication is critical infrastructure. Changes here affect the entire system. Understand the auth flow before modifying. Test thoroughly. Authentication bugs are security bugs.

### Never Modify Payment Logic Lightly

Payment logic handles real money. Bugs here have financial consequences. Understand the payment flow before modifying. Test in staging. Payment bugs are expensive bugs.

### Never Modify Database Schemas Without Migration Planning

Schema changes require migrations. Migrations can fail. Migrations can lose data. Plan migrations carefully. Test migrations. Have a rollback plan. Schema changes are irreversible without backups.

### Always Explain Risks Before Implementation

Before making changes, articulate the risks. What could break? What are the dependencies? What is the rollback plan? Risk awareness enables risk mitigation. Hidden risks are dangerous risks.

### Always Explain Affected Files

Before implementing, list the files that will change. Explain why each file needs modification. Explain the relationships between files. Understanding scope prevents unintended consequences.

### Always Wait for Approval Before Making Major Changes

Major changes require approval. Discuss architecture changes. Discuss breaking changes. Discuss security changes. Collective wisdom exceeds individual wisdom. Approval is a safety mechanism.

### Always Preserve Backwards Compatibility Whenever Possible

Breaking changes hurt users. Avoid them when possible. Use feature flags. Use versioning. Deprecate before removing. Backwards compatibility is a feature.

### Always Think Before Coding

Understand the problem before solving it. Understand the architecture before changing it. Understand the context before implementing. Thoughtful code is better than fast code. Think first, code second.

---

## 14. Decision Framework

When multiple solutions exist, how should engineers choose? The following principles guide decision-making at NOVA.

### Choose the Simplest

Simple solutions have fewer moving parts. Simple solutions are easier to understand. Simple solutions are easier to maintain. Simple solutions are easier to debug. Complexity is a cost, not a benefit.

### Choose the Safest

Safe solutions protect the system. Safe solutions protect users. Safe solutions protect data. Risk is acceptable only when justified. When in doubt, choose the safer path.

### Choose the Easiest to Maintain

Code is maintained more often than it is written. Choose solutions that future engineers will understand. Avoid clever tricks. Avoid obscure patterns. Maintainability is a long-term investment.

### Choose the Solution That Future Engineers Will Understand

You will not maintain this code forever. Write for the engineer who comes after you. They should understand your work without asking you. Clear code is professional code.

### Avoid Clever Code

Clever code is hard to understand. Clever code is hard to debug. Clever code is hard to maintain. Prefer boring code that works over clever code that impresses.

### Avoid Unnecessary Abstraction

Abstraction adds complexity. Add abstraction only when it provides clear value. Premature abstraction is premature optimization. Concrete code is easier to understand than abstract code.

---

## 15. Definition of Engineering Excellence

What does success look like for a NOVA engineer? Excellence is not measured by lines of code or features shipped. Excellence is measured by impact and sustainability.

### An Engineer Succeeds When Students Benefit

The ultimate measure of engineering success is student benefit. Did this change improve learning? Did this change remove friction? Did this change enable access? If students don't benefit, the engineering didn't matter.

### The Code Becomes Easier to Maintain

Good engineering leaves the codebase better than it was found. Complexity is reduced, not increased. Patterns are clarified, not obscured. Future changes become easier, not harder.

### The Architecture Becomes Stronger

Good engineering strengthens the architecture. Dependencies are reduced, not added. Coupling is loosened, not tightened. The system becomes more resilient, not more fragile.

### The System Becomes More Reliable

Good engineering improves reliability. Bugs are fixed, not introduced. Edge cases are handled, not ignored. The system becomes more predictable, not less.

### The Product Becomes More Beautiful

Good engineering creates beauty. Beauty is simplicity. Beauty is clarity. Beauty is consistency. The product should feel crafted, not cobbled.

### Future Engineers Can Understand the Work

The ultimate test of engineering quality is whether the next engineer can understand your work without your help. If they can, you succeeded. If they cannot, you failed.

---

## Engineering Oath

As engineers of NOVA, we recognize that every decision we make ultimately affects learners. A broken feature means a student cannot progress. A confusing interface means a student loses motivation. A security vulnerability means student data is compromised. Performance issues mean students are excluded.

We therefore commit ourselves to building software that is safe, understandable, maintainable, elegant, and worthy of the trust placed in this platform.

We will build small, build clearly, and build safely. We will respect existing architecture and protect shared infrastructure. We will optimize for readability and for future engineers. We will never break working systems without compelling reason.

We will put education before technology, simplicity before complexity, and learners before ourselves. We will recognize that every line of code increases maintenance cost, and we will write code only when the value justifies the cost.

We will protect our users, protect their data, and protect the integrity of this platform. We will test thoroughly, document clearly, and deploy carefully. We will never assume, always verify, and prefer prevention over correction.

We will make decisions that prioritize simplicity, safety, and maintainability. We will avoid clever code and unnecessary abstraction. We will write code that future engineers will understand and appreciate.

We will measure our success not by features shipped, but by students served. We will leave the codebase better than we found it. We will strengthen the architecture, improve reliability, and enhance the beauty of this product.

This is our oath. This is our responsibility. This is our commitment to the learners who depend on NOVA.
