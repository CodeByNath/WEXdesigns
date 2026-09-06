# DesignMaster UI Composition Architecture

## 1. Goal and authority boundary

Build a dynamic application where adding more record types does **not** require adding another complete set of UI components.

The system should grow primarily through:

- record definitions
- ownership adapters
- schemas
- IDs
- data mappings
- persistence handlers

rather than through duplicated JSX and CSS.

The central model is:

```
Domain / Record Owner
        ↓
ID + Data + Rules
        ↓
Component Definition
        ↓
Shared Component Type
        ↓
Shared Drawer / Surface

```

The key principle is:

> **Ownership belongs to the data and the record handler. Presentation belongs to the shared component type.**


This document is a companion to the WEX design-system source. It does not define visual values. It defines how DesignMaster is allowed to compose WEX components.

```text
Domain / owner
→ what the record is and what operations are legal

Composition definition
→ component type, ID, tier, content, state, permissions, actions

WEX
→ all visual and structural presentation rules
```

Prime rule:

> **DesignMaster composes WEX. It does not invent CSS values.**

A definition may describe semantic intent, but must not contain raw visual values such as colours, pixel font sizes, arbitrary gaps, arbitrary padding, margins, widths, border radii, or global breakpoints.

Every scalable shared component uses exactly one WEX tier:

```text
Small
Default
Large
```


---

# 2. Keep domain ownership

Different records still need explicit owners.

For example:

```
ServiceOverview
CategoryOverview
FamilyOverview
TierOverview
GroupOverview

```

These names are useful because they identify **who owns the record**.

They should own things such as:

```
record ID
loading
data source
field mapping
permissions
validation
save handler
lifecycle rules
domain commands

```

They should not each recreate:

```
header markup
body markup
field markup
editor markup
status pill
Edit button
Save button
footer
CSS

```

So:

```
ServiceOverview
      ↓
moduleOverview

CategoryOverview
      ↓
moduleOverview

FamilyOverview
      ↓
moduleOverview

```

The ownership stays separate.

The renderer stays shared.

---

# 3. Build component types, not entity components

The shared UI system should contain a small number of structural component types.

For example:

```
moduleOverview
moduleList
moduleTable
moduleForm
moduleTabs
moduleNotice
moduleEmpty

```

These represent genuinely different interaction structures.

A new domain should not automatically create a new component.

Instead ask:

> What type of information is this?

If it is labels, values and editable fields:

```
→ moduleOverview

```

If it is a collection of records:

```
→ moduleList

```

If it is columnar data:

```
→ moduleTable

```

If it is a structured editing workflow:

```
→ moduleForm

```

Only create another component type when the interaction pattern itself is genuinely different.

---

# 4. Shared overview module

A generic overview module can have one permanent structure:

```
moduleOverview
│
├── moduleHeader
│   ├── moduleHeaderLabel
│   ├── moduleHeaderIntro
│   └── moduleHeaderPillText
│
├── moduleBody
│   ├── moduleBodyLabels
│   ├── moduleBodyText
│   └── mapped input when editing
│
└── moduleFooter
    └── moduleFooterButtonText

```

Its presentation belongs to the shared component and WEX. The domain must not ship its own copy of the component CSS.

The component does not know whether the record is a:

```
Service
Category
Family
Tier
Group
Supplier
Application
Campaign

```

It only understands its contract.

---

# 5. Identity drives the module

Every module instance carries the ID of the record it represents.

For example:

```
<ModuleOverview
  definition={definition}
/>

```

where:

```
definition.id

```

is the authoritative record identity.

Conceptually the rendered component can also carry it:

```
<section
  class="moduleOverview"
  data-module-id="CZC12345">

```

The ID is not presentation.

It is the link back to ownership.

Runtime flow:

```
record ID
   ↓
owner loads record
   ↓
owner maps record
   ↓
shared module renders it
   ↓
user edits
   ↓
shared module collects changes
   ↓
Save
   ↓
semantic command + ID + changes
   ↓
runtime resolves owning domain handler

```

The same ID remains attached throughout the interaction.

---

# 6. Generic module definition

A shared module needs a small contract.

```
type ModuleOverviewDefinition = {
  type: 'overview';

  id: string;

  tier: 'small' | 'default' | 'large';

  variant?: 'default' | 'two-column';

  header: {
    label: string;
    description?: string;
    status: string;
  };

  fields: ModuleField[];

  permissions?: {
    edit?: boolean;
  };

  actions?: Array<{
    id: string;
    label: string;
    command: string;
    recordId: string;
  }>;
};

```

Fields are also data:

```
type ModuleField = {
  key: string;

  label: string;

  value: unknown;

  editable?: boolean;

  input?:
    | 'text'
    | 'textarea'
    | 'number'
    | 'select'
    | 'checkbox';

  options?: Array<{
    label: string;
    value: string;
  }>;
};

```

That schema is enough to generate both:

```
read mode

```

and:

```
edit mode

```

---

# 7. Read and edit use the same fields

A field does not need separate read JSX and edit JSX.

The schema contains both.

Example:

```
{
  key: 'name',
  label: 'Name',
  value: record.name,
  editable: true,
  input: 'text'
}

```

Read mode renders:

```
NAME
Managed Infrastructure

```

Edit mode renders:

```
NAME
[ Managed Infrastructure             ]

```

Same field.

Same module.

Same ID.

---

# 8. One generic field renderer

```
function ModuleField({
  field,
  editing,
  onChange
}) {
  return (
    <div className="moduleBodyRow">

      <div className="moduleBodyLabels">
        {field.label}
      </div>

      {!editing || !field.editable ? (
        <div className="moduleBodyText">
          {String(field.value ?? '')}
        </div>
      ) : (
        <ModuleInput
          field={field}
          onChange={onChange}
        />
      )}

    </div>
  );
}

```

The generic input renderer handles the primitive input types:

```
function ModuleInput({
  field,
  onChange
}) {
  switch (field.input) {

    case 'textarea':
      return (
        <textarea
          defaultValue={String(field.value ?? '')}
          onChange={event =>
            onChange(event.target.value)
          }
        />
      );

    case 'number':
      return (
        <input
          type="number"
          defaultValue={String(field.value ?? '')}
          onChange={event =>
            onChange(event.target.value)
          }
        />
      );

    case 'select':
      return (
        <select
          defaultValue={String(field.value ?? '')}
          onChange={event =>
            onChange(event.target.value)
          }
        >
          {field.options?.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      );

    default:
      return (
        <input
          type="text"
          defaultValue={String(field.value ?? '')}
          onChange={event =>
            onChange(event.target.value)
          }
        />
      );
  }
}

```

A large number of metadata editors can therefore run through one field system.

---

# 9. One Edit / Save state machine

Editing is also shared behaviour.

The module owns presentation state:

```
READ
  ↓ Edit
EDITING
  ↓ changed
DIRTY
  ↓ Save
SAVING
  ↓ success
READ

```

The owner does not need to recreate this for every record type.

Basic state:

```
const [editing, setEditing] = useState(false);

const [changes, setChanges] =
  useState<Record<string, unknown>>({});

const [saving, setSaving] = useState(false);

```

Changes are collected by field key:

```
function changeField(
  key: string,
  value: unknown
) {
  setChanges(current => ({
    ...current,
    [key]: value
  }));
}

```

Saving always returns to the owner through a semantic command:

```
const saveAction = definition.actions?.find(
  action => action.id === 'save'
);

await runtime.execute(
  saveAction.command,
  saveAction.recordId,
  changes
);
```

The definition stays serializable. The runtime resolves the command back to the authoritative owner, preserving domain ownership without embedding executable functions in an agent-generated definition.

---

# 10. Do not confuse editor state with lifecycle status

There are two separate concepts.

Record state:

```
Active
Disabled
Archived
Draft
Published

```

Editor state:

```
Read
Editing
Unsaved
Saving
Error

```

They should not automatically be the same thing.

For example, typing into an Active record should not necessarily mutate its actual lifecycle status to Draft.

The UI can show:

```
Active
Unsaved changes

```

simultaneously if needed.

The owning domain decides whether a save changes lifecycle state.

The generic component only manages editor state.

---

# 11. CSS belongs to component types

The reusable presentation classes can remain small:

```
.moduleOverview {}

.moduleHeader {}

.moduleHeaderLabel {}

.moduleHeaderIntro {}

.moduleHeaderPillText {}

.moduleBody {}

.moduleBodyRow {}

.moduleBodyLabels {}

.moduleBodyText {}

.moduleFooter {}

.moduleFooterButtonText {}

```

General visual scale must not use free-form modifier classes. Scale is controlled only by the WEX tier:

```
moduleOverview Small
moduleOverview Default
moduleOverview Large

```

Modifier classes are reserved for genuine structural variants:

```
.moduleOverview--twoColumn {}

```

Do not introduce parallel size languages such as:

```
compact
dense
comfortable
wide-as-size

```

Not separate copies of the entire component.

For example:

```
<section
  class="
    moduleOverview
    moduleOverview--twoColumn
  ">

```

The domain does not need its own CSS system merely because it owns different data.

---

# 12. Shared drawer system

The same principle applies to drawers.

A drawer should be a shared frame.

```
Drawer
│
├── DrawerHeader
├── DrawerBody
└── DrawerFooter

```

The drawer receives a definition from the record owner.

For example:

```
type DrawerDefinition = {
  id: string;

  icon: ComponentType;

  title: string;

  status: string;

  tiles?: DrawerTile[];

  modules: ModuleDefinition[];

  actions?: DrawerAction[];
};

```

The drawer owns presentation.

The domain supplies identity and behaviour.

---

# 13. Dynamic drawer header

The record owner can populate the drawer header from the same loaded record.

Example:

```
Drawer Header
├── icon
├── title
├── record ID
├── status
└── metadata tiles

```

Definition:

```
{
  id: record.id,

  icon: RecordIcon,

  title: record.name,

  status: record.status,

  tiles: [
    {
      label: 'Category',
      value: record.category
    },
    {
      label: 'Items',
      value: record.itemCount
    }
  ]
}

```

The DrawerHeader does not need record-specific JSX.

---

# 14. Dynamic drawer body

The owner supplies modules:

```
modules: [
  RecordOverview(record),
  RecordConnections(record),
  RecordSettings(record)
]

```

Each module declares a component type:

```
{
  type: 'overview',
  ...
}

```

or:

```
{
  type: 'list',
  ...
}

```

or:

```
{
  type: 'table',
  ...
}

```

The drawer can therefore render arbitrary combinations through one dispatcher.

---

# 15. Module dispatcher

```
function ModuleRenderer({
  definition
}) {
  switch (definition.type) {

    case 'overview':
      return (
        <ModuleOverview
          definition={definition}
        />
      );

    case 'list':
      return (
        <ModuleList
          definition={definition}
        />
      );

    case 'table':
      return (
        <ModuleTable
          definition={definition}
        />
      );

    case 'form':
      return (
        <ModuleForm
          definition={definition}
        />
      );

    case 'notice':
      return (
        <ModuleNotice
          definition={definition}
        />
      );

    default:
      return null;
  }
}

```

This makes the drawer dynamically composable without making the drawer dynamically complicated.

---

# 16. Drawer rendering

The drawer can then be extremely small:

```
function Drawer({
  definition
}: {
  definition: DrawerDefinition
}) {
  return (
    <aside
      className="drawer"
      data-record-id={definition.id}
    >

      <DrawerHeader
        icon={definition.icon}
        title={definition.title}
        id={definition.id}
        status={definition.status}
        tiles={definition.tiles}
      />

      <div className="drawerBody">

        {definition.modules.map(
          module => (
            <ModuleRenderer
              key={module.id}
              definition={module}
            />
          )
        )}

      </div>

      <DrawerFooter
        actions={definition.actions}
      />

    </aside>
  );
}

```

The drawer remains a frame.

It does not become a domain controller.

---

# 17. Domain adapters

An ownership adapter converts an authoritative domain record into the generic definitions.

Example:

```
function ServiceOverview(
  service
): ModuleOverviewDefinition {

  return {
    type: 'overview',

    id: service.id,

    tier: 'default',

    header: {
      label: 'Service',
      description:
        service.description,

      status:
        service.status
    },

    fields: [
      {
        key: 'name',
        label: 'Name',
        value: service.name,
        input: 'text',
        editable: true
      },

      {
        key: 'description',
        label: 'Description',
        value: service.description,
        input: 'textarea',
        editable: true
      }
    ],

    actions: [{
      id: 'save',
      label: 'Save',
      command: 'service.update',
      recordId: service.id
    }]
  };
}

```

Another domain:

```
function CategoryOverview(
  category
): ModuleOverviewDefinition {

  return {
    type: 'overview',

    id: category.id,

    tier: 'default',

    header: {
      label: 'Category',
      description:
        category.description,

      status:
        category.status
    },

    fields: [
      {
        key: 'name',
        label: 'Name',
        value: category.name,
        input: 'text',
        editable: true
      },

      {
        key: 'description',
        label: 'Description',
        value: category.description,
        input: 'textarea',
        editable: true
      }
    ],

    actions: [{
      id: 'save',
      label: 'Save',
      command: 'category.update',
      recordId: category.id
    }]
  };
}

```

Same component.

Different ownership.

---

# 18. Whole drawer definition

An owner can construct the whole drawer:

```
function buildServiceDrawer(service) {
  return {
    id: service.id,

    icon: ServiceIcon,

    title: service.name,

    status: service.status,

    tiles: [
      {
        label: 'Category',
        value: service.category
      },

      {
        label: 'Family',
        value: service.family
      }
    ],

    modules: [
      ServiceOverview(service),
      ServiceConnections(service),
      ServiceSettings(service)
    ],

    actions: [
      {
        id: 'disable',
        label: 'Disable',
        run: () =>
          serviceOwner.disable(
            service.id
          )
      }
    ]
  };
}

```

The ownership adapter knows what those actions mean.

The drawer only knows how to display an action.

---

# 19. Lists work the same way

A list component can be schema-driven too.

Definition:

```
type ModuleListDefinition = {
  type: 'list';

  id: string;

  rows: Array<{
    id: string;

    icon?: ComponentType;

    title: string;

    description?: string;

    status?: string;

    action?: {
      label: string;
      run: (id: string) => void;
    };
  }>;
};

```

One renderer can then display:

```
categories
services
tiers
users
suppliers
applications
connections

```

without separate list presentation components.

---

# 20. Tables work the same way

```
type ModuleTableDefinition = {
  type: 'table';

  id: string;

  columns: Array<{
    key: string;
    label: string;
  }>;

  rows: Array<{
    id: string;
    values: Record<string, unknown>;
  }>;
};

```

The same table renderer can display many different datasets.

The owner decides what the rows mean.

---

# 21. Tabs work the same way

Tabs should also be generic.

```
type TabsDefinition = {
  tabs: Array<{
    id: string;
    label: string;
    content: ModuleDefinition[];
  }>;
};

```

Renderer:

```
<ModuleTabs
  definition={tabs}
/>

```

A tab system should know:

```
selected tab
keyboard navigation
ARIA relationships
panel visibility

```

It should not know:

```
Service
Package
Settings
Connections
Pricing

```

Those are data supplied by the owner.

---

# 22. Escape hatch for special UI

A schema system should not become a prison.

Sometimes a field or module is genuinely specialised.

For example:

```
visual topology
drag-and-drop tree
canvas editor
complex pricing matrix
graphical rule builder

```

Do not duplicate the whole Overview component just because one field is unusual.

Allow an escape hatch:

```
{
  key: 'pricing',

  label: 'Pricing',

  input: 'custom',

  component:
    PricingFieldEditor
}

```

Then:

```
moduleOverview
├── generic field
├── generic field
├── specialised field
└── generic field

```

The shared module still owns:

```
header
body
footer
edit state
save state
error state
ID

```

Only the genuinely specialised interaction is custom.

---

# 23. WEX presentation and recursive layout contract

Every shared component consumes WEX rather than defining its own visual system.

DesignMaster definitions may contain:

```text
component type
record ID
Small / Default / Large tier
content and data mappings
editor state
permissions
semantic actions
registered structural variant
```

They must not contain:

```text
raw colour values
font sizes
line heights
letter spacing values
arbitrary gaps
arbitrary padding
margins
hard-coded component widths
arbitrary breakpoints
unregistered density names
component-specific copies of WEX styles
```

The recursive WEX layout model applies inside components:

```text
Outer component
→ decides allocation of its direct children
→ owns sibling gap and boundary padding

Inner container
→ receives available space
→ decides allocation of its direct children
→ owns its own gap and padding

Continue inward
→ until final element
```

Prime layout rules:

```css
min-width: 0;
margin: 0;
```

Spacing responsibilities:

```text
gap     → sibling separation
padding → boundary-to-child separation
margin  → not used as WEX layout spacing
```

DesignMaster must not reach through a component and hard-code deep descendant spacing. Each container owns only its direct-child allocation.

---

# 24. Shared responsibilities

The shared component system should own:

```
markup structure
CSS
spacing
typography
responsive behaviour
keyboard interaction
ARIA
read/edit switching
dirty tracking
save state
loading presentation
error presentation
field rendering
buttons
status presentation
module layout
drawer layout
tab mechanics
list mechanics
table mechanics

```

These should not be rebuilt by every domain.

---

# 25. Domain responsibilities

The owning domain should retain:

```
record ID
authoritative data
data fetching
field meaning
permissions
business validation
persistence
lifecycle
relationships
available options
backend APIs
commands
domain-specific errors

```

The separation is:

```
DOMAIN
What is this?
What data belongs to it?
What operations are legal?

COMPONENT
How is this type of information displayed?
How is this type of interaction performed?

```

---

# 26. Runtime architecture

The complete runtime becomes:

```
User selects record
        │
        ▼
Record owner receives ID
        │
        ▼
Owner loads authoritative data
        │
        ▼
Owner maps data into definitions
        │
        ▼
Drawer receives DrawerDefinition
        │
        ├──── Header identity
        │
        ├──── Metadata tiles
        │
        ▼
Module definitions
        │
        ▼
ModuleRenderer
        │
        ├── overview → ModuleOverview
        ├── list     → ModuleList
        ├── table    → ModuleTable
        ├── form     → ModuleForm
        └── notice   → ModuleNotice
        │
        ▼
Shared presentation
        │
        ▼
User interaction
        │
        ▼
ID + changed data
        │
        ▼
Owning domain handler
        │
        ▼
Persistence
        │
        ▼
Authoritative updated record
        │
        ▼
Shared UI rerenders

```

---

# 27. Adding a new record type

With this architecture, adding:

```
Supplier

```

does not require:

```
SupplierDrawerHeader
SupplierOverviewCard
SupplierOverviewEditor
SupplierFooter
SupplierField
SupplierStatusPill
SupplierButton

```

Instead:

```
function SupplierOverview(
  supplier
) {
  return {
    type: 'overview',

    id: supplier.id,

    tier: 'default',

    header: {
      label: 'Supplier',
      description:
        supplier.description,
      status:
        supplier.status
    },

    fields: [...],

    actions: [{
      id: 'save',
      label: 'Save',
      command: 'supplier.update',
      recordId: supplier.id
    }]
  };
}

```

And:

```
function buildSupplierDrawer(
  supplier
) {
  return {
    id: supplier.id,
    icon: SupplierIcon,
    title: supplier.name,
    status: supplier.status,
    modules: [
      SupplierOverview(supplier)
    ]
  };
}

```

No new structural presentation code is required.

---

# 28. Final example

The core architecture can ultimately be this small.

```
type OverviewDefinition = {
  type: 'overview';

  id: string;

  tier: 'small' | 'default' | 'large';

  header: {
    label: string;
    description?: string;
    status: string;
  };

  fields: Array<{
    key: string;
    label: string;
    value: unknown;
    editable?: boolean;
    input?:
      | 'text'
      | 'textarea'
      | 'number';
  }>;

  actions: Array<{
    id: string;
    label: string;
    command: string;
    recordId: string;
  }>;
};

```

Shared component:

```
function ModuleOverview({
  definition
}: {
  definition: OverviewDefinition
}) {
  const [editing, setEditing] =
    useState(false);

  const [changes, setChanges] =
    useState<Record<string, unknown>>(
      {}
    );

  const [saving, setSaving] =
    useState(false);

  async function save() {
    setSaving(true);

    try {
      const saveAction = definition.actions.find(
        action => action.id === 'save'
      );

      if (!saveAction) return;

      await runtime.execute(
        saveAction.command,
        saveAction.recordId,
        changes
      );

      setChanges({});
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section
      className="moduleOverview"
      data-module-id={
        definition.id
      }
    >
      <header className="moduleHeader">

        <div className="moduleHeaderLabel">
          {definition.header.label}
        </div>

        <div className="moduleHeaderIntro">
          {
            definition.header
              .description
          }
        </div>

        <div className="moduleHeaderPillText">
          {
            definition.header
              .status
          }
        </div>

      </header>

      <div className="moduleBody">

        {definition.fields.map(
          field => (
            <div
              className="moduleBodyRow"
              key={field.key}
            >

              <div className="moduleBodyLabels">
                {field.label}
              </div>

              {!editing ||
              !field.editable ? (

                <div className="moduleBodyText">
                  {String(
                    field.value ?? ''
                  )}
                </div>

              ) : field.input ===
                'textarea' ? (

                <textarea
                  defaultValue={String(
                    field.value ?? ''
                  )}
                  onChange={event =>
                    setChanges(
                      current => ({
                        ...current,

                        [field.key]:
                          event.target
                            .value
                      })
                    )
                  }
                />

              ) : (

                <input
                  type={
                    field.input ===
                    'number'
                      ? 'number'
                      : 'text'
                  }
                  defaultValue={String(
                    field.value ?? ''
                  )}
                  onChange={event =>
                    setChanges(
                      current => ({
                        ...current,

                        [field.key]:
                          event.target
                            .value
                      })
                    )
                  }
                />

              )}

            </div>
          )
        )}

      </div>

      <footer className="moduleFooter">

        <button
          className=
            "moduleFooterButtonText"
          disabled={saving}
          onClick={() => {
            if (editing) {
              void save();
            } else {
              setEditing(true);
            }
          }}
        >
          {saving
            ? 'Saving…'
            : editing
              ? 'Save'
              : 'Edit'}
        </button>

      </footer>
    </section>
  );
}

```

Ownership adapter:

```
function ServiceOverview(
  service
): OverviewDefinition {

  return {
    type: 'overview',

    id: service.id,

    tier: 'default',

    header: {
      label: 'Service',
      description:
        service.description,
      status:
        service.status
    },

    fields: [
      {
        key: 'name',
        label: 'Name',
        value: service.name,
        editable: true,
        input: 'text'
      },

      {
        key: 'description',
        label: 'Description',
        value:
          service.description,
        editable: true,
        input: 'textarea'
      }
    ],

    actions: [{
      id: 'save',
      label: 'Save',
      command: 'service.update',
      recordId: service.id
    }]
  };
}

```

Drawer definition:

```
function buildDrawer(record) {
  return {
    id: record.id,

    icon: record.icon,

    title: record.name,

    status: record.status,

    tiles:
      record.headerTiles,

    modules: [
      ServiceOverview(record)
    ]
  };
}

```

Shared drawer:

```
function Drawer({
  definition
}) {
  return (
    <aside
      className="drawer"
      data-record-id={
        definition.id
      }
    >

      <DrawerHeader
        icon={definition.icon}
        title={definition.title}
        id={definition.id}
        status={definition.status}
        tiles={definition.tiles}
      />

      <div className="drawerBody">

        {definition.modules.map(
          module => (
            <ModuleRenderer
              key={module.id}
              definition={module}
            />
          )
        )}

      </div>

      <DrawerFooter />

    </aside>
  );
}

```

The result is a dynamic UI architecture where:

```
New record types
→ definitions and adapters

New data
→ schemas

New visual variations
→ modifier classes

New backend behaviour
→ ownership handlers

New structural interaction
→ only then add a new component type

```

DesignMaster enforcement:

```text
DO NOT hard-code visual values into definitions.
DO NOT create domain-specific copies of shared UI.
DO NOT introduce a fourth size/density tier.
DO NOT use margins for component separation.
DO NOT omit min-width: 0 from layout participants.
DO NOT create arbitrary global breakpoints.
DO NOT let definitions control deep descendant spacing.

DO select registered shared component types.
DO use Small / Default / Large.
DO use semantic actions and command IDs.
DO let WEX resolve typography, colour, spacing, sizing and interaction.
DO let each parent own direct-child allocation, gap and padding.
```

The guiding rule is:

> **Keep the number of shared structural components small. Keep ownership explicit. Move variation into IDs, schemas, data, handlers, semantic commands, and controlled component definitions. Let WEX own presentation.**