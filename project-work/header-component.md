# Header Component

Status: BUILDER ACTION REQUIRED
Phase: 3 — Draft Header composition and component boundaries

## Reviewer verdict

**Proceed with safeguards**

Owner has now resolved the core Header geometry and responsive composition. Do
not implement source yet; first turn these decisions into the smallest explicit
component plan and contracts.

## Accepted Header geometry

- Header block size: **64px on all devices**.
- Brand occupies the left corner as a **64px x 64px square**.
- Brand hosts a separate **Logo component**.
- Remaining inline width belongs to Navigation.
- Existing two-level gutter rule remains:
  - Large/Medium: outer 16px + immediate inner 8px = 24px effective inset.
  - Compact <=767px: outer 8px + immediate inner 8px = 16px effective inset.
  - deeper nested elements do not repeat Header gutter padding.

## Accepted composition

Header
- Brand shell
  - Logo component
  - Brand/Home semantic navigation intent
- Navigation shell
  - Left/control edge
    - Location Label component at >=768px
    - Sidebar Trigger action at <=767px, replacing Location Label
  - Navigation controls region, ordered right-to-left:
    1. Main Action slot at far right
    2. Primary Navigation list
    3. Search control at the left side of that navigation group

### Location Label

Location is its own heading/text component, left aligned, representing the
current station location such as Dashboard or Services.

At <=767px it is replaced in this Header position by the Sidebar Trigger
action. The Sidebar Trigger toggles the sidebar; Header owns placement of that
control, not sidebar/domain state.

### Main Action

The far-right position is always reserved for one prominent Main Action
component/slot.

It may later represent account/user access, login/logout, a primary location
action, or an external destination. Header owns only the reserved placement and
single-main-action contract, not the business meaning or execution.

### Primary Navigation

Primary Navigation is a separate component, not raw Header-owned links.

Requirements to preserve in its future component record:

- accepts ordered navigation items;
- order determines visibility priority as space becomes constrained;
- consumes available remaining navigation space;
- supports two component modes:
  - **fixed**
  - **scrollable**
- this mode is a Primary Navigation component capability, not a Header-specific
  responsive workaround;
- do not invent additional responsive rules merely to preserve individual
  items.

### Search

Search is part of the same navigation-control composition but is a separate
component capability.

It has two presentation modes:

- **full** input;
- **icon-only**.

On larger widths it may use full mode; as available space reduces it may switch
to icon-only so it aligns visually with the rest of the compact controls.
Header owns the slot/allocation, not search behaviour, search data, or results.

## Architecture safeguards

Do not collapse Logo, Location Label, Sidebar Trigger, Main Action, Primary
Navigation, or Search into one monolithic Header implementation.

Header is the composition shell. Those are independently reusable component
families/capabilities and must only be implemented when separately authorised.

For this phase the Builder must:

1. draft the exact Header shell contract and slot boundaries;
2. draft the component dependency tree above;
3. record which contracts can reuse existing Button/action/schema authority and
   which require new authority;
4. define the 64px Brand/Header geometry and Navigation remainder using WEX
   presentation authority, without arbitrary local values;
5. define the >=768px Location vs <=767px Sidebar Trigger swap;
6. record Primary Navigation fixed/scrollable mode as a future component-level
   feature;
7. record Search full/icon-only mode as a future component-level feature;
8. keep Main Action as exactly one reserved prominent slot;
9. do not implement Header, child components, schemas, Component Manager mounts,
   or Admin Station integration yet.

## Remaining gates

Two decisions are still not supplied by repository authority or Owner direction:

- Header surface treatment: background/border/separation vs presentation-neutral;
- semantic action ownership for Brand/Home, Main Action, and Sidebar Trigger
  where existing `SemanticAction` record ownership does not fit shell/runtime
  interaction.

Builder must surface the narrowest authority options for those two gates and
return this same file to `AWAITING REVIEWER REVIEW`.
