# ADR 0028 companion: Drawer section editors

Companion to [ADR 0028](0028-admin-body-and-drawer-shell-authority.md). The
product presentation companion
([0028-admin-drawer-product-presentation.md](0028-admin-drawer-product-presentation.md))
is at its line limit; section editor decisions from 27 November 2026 continue
here. The Form configuration contract is [ADR 0039](0039-wex-form-configuration-contract.md).

## Section editors share one behaviour (27 November 2026)

Owner direction: from Edit, activate the field sections one at a time, "same
everything" as Overview, starting with Pricing.

- Every section editor is a `.wex-admin-product-editor` with its own Form
  configuration key (`data-form-id` = section id, `data-form-scope` = record).
  A field is any direct child with `data-field-name` (outlined field, repeater,
  currency). Width, Position, Alignment, Row, On/Off, history, Publish and
  restore work on every such field unchanged.
- The active editor is the selected section's (`data-admin-product-selected`
  on the Drawer body; hover previews do not move it). The Form Editor card
  selects that editor's first field; selecting another section while the Form
  Editor is on moves the Editor to that section's first field. The Editor
  footer works on the active editor's steps.
- **One editor gap (Owner rule):** in the editor view every section heading
  ends with the Drawer heading gap and the editor adds 12px, so heading to
  first field is the same for every section: 28px (16 + 12) on desktop. A new
  section editor never sets its own top spacing (`admin-station-drawer-editor.css`).
- The Drawer footer's content state combines every section editor (edited if
  any is, publishable if all are); Discard resets all of them.
- Off status is kept per record and per form, and mutes the matching
  presentation row in Overview and Pricing ("(inactive)", original value
  nodes restored on On).

## Pricing editor (27 November 2026)

Fields, in order (Owner-directed):

1. **Currency** — editor and form only, never in presentation. An outlined
   field whose value is chosen in the existing Dropdown Menu Default: AUD (A$,
   default), NZD (NZ$), USD (US$), EUR (€), GBP (£), then Custom, which shows
   a text value to type the currency manually. The chosen symbol follows the
   Advertised price and every Price list price, in the editor labels
   ("Advertised price (A$)", "Price (A$)") and in presentation ("A$259").
2. **Advertised price** — single field (amount).
3. **Price list** — repeater; each item is Price, Label and Note (Label is the
   fare type, or the custom label for Other).
4. **Badges** — text repeater; one Badge per item.
5. **Featured** — single field.

Currency and Advertised price share the first row (the existing Row share,
50% / 50%; Owner-directed 27 November 2026).

Repeater: the outlined field's box and label pill around its items (24px
between items for their label pills, items' fields side by side, one column
below 768px), a Remove button per item and Add at the end: existing Action
Button Icon Only Small with the system x and plus icons. Add/Remove and typing
are content changes, not Form configuration. Required: Currency, Advertised
price, each Price and Label, each Badge. Values are preview content (Save only
emits its event; no value persistence).

Presentation output is unchanged: the fixture now holds the currency (AUD)
and amounts, and the presentation writes the symbol before each price.

## Evidence

- Code Map: [Drawer section editors](../code-map/drawer-section-editors.md).
- Browser (fixture): Currency list and Custom update both price labels;
  Add/Remove price and badge; Discard restores currency and items; Form
  Editor on Pricing selects Currency first, selects the Price list, Off shows
  "(inactive)" in Pricing presentation; Publish then refresh restores Off and
  Center; switching Overview/Pricing moves the Editor to each first field.

## Form Editor active field (28 November 2026)

Owner-directed: while the Form Editor is active, the selected field
(`data-form-builder-selected`) is not shown disabled (full opacity; the
selected rule now outranks the dimming rule) and its value is hidden, keeping
the field's height. It takes the outlined field's own Focused (clicked) state,
the border and the outer ring, without the extra value space. The other fields
stay at the disabled opacity. Sources: `admin-station-form-builder.css`,
`admin-station-outlined-field.css`; tests in `admin-station-drawer-editor.test.mjs`.
