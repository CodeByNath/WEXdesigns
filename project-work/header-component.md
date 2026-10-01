# Header Component

Status: BUILDER ACTION REQUIRED
Phase: 8 — Establish first-allocation identity bootstrap authority

## Reviewer verdict

**Proceed with safeguards**

Platform Identity schema authority is accepted, so Header work may resume. The
Header roadmap is now bounded and must stop before real child-component
composition.

## Owner-approved Header roadmap

### Phase 8 — Identity bootstrap authority — ACTIVE
Resolve the one remaining architecture gate: ADR 0013 requires the WEX UI
Identity Authority / Station to reserve and issue every concrete allocation, but
no issuer exists yet.

Builder must:
- start from ADR 0013, `docs/architecture/platform-identity.md`, atomic
  composition, dependency rules, and current identity schemas;
- define the smallest repository authority needed to bootstrap the first durable
  allocations without permitting applications, Shared UI, schemas, or Header
  source to mint local IDs;
- cover the Admin Manager root `WEXAMxxxxx` and its direct Header child
  `WEXAMHxxxxx`, including reservation-before-assignment, collision/reuse
  prevention, explicit parent ID + parent-owned slot, and where durable
  allocation evidence lives;
- use a new/follow-up ADR if a new architectural decision is required;
- do **not** mint an ID, implement Header, build a registry/runtime, or compose
  any child component in this phase.

Commit/push one bounded authority candidate, update this same work file to
`AWAITING REVIEWER REVIEW`, and stop.

### Phase 9 — Identity Authority + concrete Header allocation
After Phase 8 acceptance only: implement the minimum accepted issuance/reservation
mechanism, allocate the Admin Manager root and Admin Header child, and prove the
Header allocation uses the `WEXAMH` family with an explicit parent/slot. No
Header presentation or child components.

### Phase 10 — Empty Header shell compartments
Create/refresh the Header Code Map and implement only reusable Header structure:
- Header root;
- Brand shell;
- Navigation shell;
- Navigation left/location inner shell;
- Navigation utility/quick-navigation inner shell.

The shell may expose named empty mount boundaries and direct-child count/type
constraints required by accepted composition authority. Do not load Brand,
LocationLabel, SidebarTrigger, Search, PrimaryNavigation, MainAction, or any
other real component.

### Phase 11 — Responsive shell behaviour proof
In Component Manager, prove the empty Header shell against WEX viewport modes:
- 64px Header height on all devices;
- Brand shell 64px square;
- Navigation consumes remaining width;
- two-level Header gutter only: 16px + 8px at Large/Medium, 8px + 8px at
  <=767px;
- no inherited/deep gutter accumulation;
- shell allocation remains valid at 1440px, 1024px, 767px and Fluid;
- the location-side mount boundary is the responsive replacement point at
  <=767px, but no real LocationLabel/SidebarTrigger is composed yet;
- utility region remains shell-ready without inventing child behaviour.

Use neutral fixture/placeholders only to prove slot geometry and responsive
allocation. Validate keyboard/accessibility semantics relevant to the shell,
light/dark presentation, and actual isolated preview widths.

### Phase 12 — Promote and close pre-composition Header
Promote the exact accepted shell candidate, verify hosted Component Manager
behaviour, remove the topic branch, and close the Header as ready for separately
authorised child-component composition.

## Hard stop

After Phase 12, stop. Do not begin Brand, LocationLabel, SidebarTrigger, Search,
PrimaryNavigation, MainAction, NavigationItem, icon, profile/action controls, or
Admin Station fitting without a new Reviewer-authorised phase.
