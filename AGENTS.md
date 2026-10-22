# namelesstherebel/namelesstherebel.github.io

Provenance: https://github.com/namelesstherebel/saddle/blob/45fe8c4aa2b3deb644c5baa18980c80c67848b85/templates/AGENTS.md

Adoption snapshot base_sha40: `80a19ae2129bfe2f2a25a3f9f08f2fa04b71f635`. Reverify source, test and invariant paths on the current PR base; this static distribution snapshot is not current PR evidence.

## Code Review Rules
Adopter guidance only; it needs no YAML. Do not override organization policy with blanket YAML, and keep existing CodeRabbit UI settings, defaults and the paid usage cap unchanged. This does not promise automatic enforcement, merges, billing or installation.

Reviewer roles:

- CodeRabbit: localized runtime review of the diff.
- Native Codex: cross-module review. Model is unknown; no guaranteed Sol.
- Semgrep: known static patterns.
- Upstream pass claims are conditional on evidence for the exact head SHA. Dedupe root causes, retain the new impact. Reasoning is not execution.

Context to cite, never invent: base SHA the current PR base SHA, obtained from GitHub for this review and cited explicitly (not the inventory snapshot SHA); invariant docs `README.md`. Source paths: `index.html`, `portfolio.html`, `script.js`. Test paths: unavailable (no test paths found; no tests executed or claimed).

### Reviewer prompts

```text
Code path instructions:
You are our front-line runtime-simulation gate. Focus intensely on what happens when this code is EXECUTED in production.
- RUNTIME BOUNDARIES: For any async/await loops, worker threads, promises, or streams, explicitly check for missing timeouts, unhandled rejections, or deadlocks.
- MUTABLE STATE: Scan for mutable shared state across asynchronous operations. Flag if a race condition is possible under concurrent load.
- SILENT FAILURES: Flag any empty catch blocks, or try-except blocks that swallow errors without logging or rethrowing.

Test path instructions:
Audit the accompanying test logic inside this pull request.
- STRATEGY VALIDATION: Verify tests cover applicable edge cases, such as null/empty payloads, network failures, and integer boundaries.
- MISSING TESTS BLIND SPOT: If a core application file was modified but no test file was added or updated, flag this to the author as an unhandled risk.

Sol core prompt:
You are the final reasoning gatekeeper in our CI pipeline. Report CodeRabbit and Semgrep statuses for the exact head SHA only from verified evidence; if evidence is missing, state the gap and do not assume a pass. Your sole job is to execute a deep mental dry-run of the system architecture to find hidden runtime traps.

CRITICAL REASONING GATES:
1. MEMORY & RESOURCE LEAKS: Scan for database connections left open, unclosed file descriptors, un-cleared intervals, or caching structures that lack an eviction policy.
2. IDEMPOTENCY & FAULT TOLERANCE: In distributed contexts, what happens if this logic executes twice due to a network retry? If a database write succeeds but the network fails right after, does it corrupt state?
3. CODELINE BLAST RADIUS: If an exported function or database model schema changes, explicitly reason through the repository and list the names of any downstream modules or files likely impacted by this blast radius.
4. BUSINESS RULES: Ensure logic strictly adheres to internal core invariants. If the code looks clean but is fragile under heavy concurrent load, do not approve. Detail the exact runtime execution break path.
```

Core changed without a test change is flagged globally, even if no test file changed.

Required evidence: actually executed unit, integration, build, type, lint, security and platform checks, plus relevant fault, concurrency, retry and resource tests. Missing, skipped, errored or zero-test results are not a pass. A reviewed-base check may be marked N/A only with an explicit reason.

Labels (apply those whose criteria match):

- `frontend`: user-facing UI or client behavior changes.
- `backend`: server, service or API behavior changes.
- `database-migration`: schema or migration changes that alter persisted semantics.
- `security-sensitive`: changes touching a trust boundary (auth, permissions, secrets, untrusted input).
- `high-risk-architecture`: cross-module contracts or concurrency changes.
- `no-tests`: core change or applicable test gap with no test change.


## Staged Pullfrog migration


This repository is participating in the approved staged Pullfrog migration. Automatic Pullfrog supplies current-head expert review, including security. Until the owner verifies staged-cutover readiness, preserve existing review assignments and automatic-review settings. After readiness is verified, Pullfrog is the normal automatic reviewer and GitHub Reviewer is a manual fallback when needed, not a mandatory second review. Assess valid existing legacy findings; a provider name or skipped review is not evidence of coverage.

Once Mac Ops verifies successful current-head `pullfrog-approval` emission from Pullfrog app `1768019` and reads back the required rule, normal merge requires a fresh successful verdict from that app on the current head. The `pullfrog` workflow/job name alone is not that verdict; never assume or require an unverified, never-emitted check. Preserve all other applicable checks and safety, visual, release and owner-acceptance gates. Do not bypass protections or change settings under these instructions.

The current branch writer handles material findings, inspects corrections, verifies applicable source/secret checks and actual resulting-head CI, then performs a normal merge pinned to the reviewed head. Report missing, skipped, errored and non-applicable checks accurately. Source scanning is not dependency-advisory coverage; saved configuration is not proof of live review or successful provider operation.

Preserve Cubic integration, reviews and checks entirely. Retain independent Codex security review as complementary coverage; do not narrow Pullfrog's security lenses or remove security checks as duplicates. Shared expert prompts and provider settings are maintained separately, not copied or changed here.

Pullfrog fixes are opt-in, bounded handoffs only. The sole writer must explicitly hand off a contained correction and pause their own branch edits, inspect the returned diff, then obtain resulting-head CI and fresh review before normal merge. No blanket or unattended autofix is authorized; product and larger changes retain their assigned implementation owner.


### Deployment boundary

GitHub Pages currently publishes the main branch. This review-policy migration does not authorize deployment. Keep the migration PR unmerged until the owner resolves the deployment impact and any reserved deployment approval; do not change Pages settings or publishing behavior.
