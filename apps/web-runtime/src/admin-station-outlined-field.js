/**
 * Outlined text field with its label on the border (Owner design, "Outlined"). One box holds the
 * label and the value; the label is a pill on the border (`admin-station-outlined-field.css`), which
 * also carries the Focused and Pressed states of the Search Input. The value is a textarea that grows
 * to show its full content: a hidden copy of the text (`data-value`) gives the control its height.
 * Built only from existing tokens; it is not a registered Global Component.
 * @param {Document} document
 * @param {{ name: string, label: string, value?: string, readOnly?: boolean, required?: boolean }} field
 */
export function createOutlinedField(document, { name, label, value = '', readOnly = false, required = false }) {
  const box = document.createElement('div');
  box.className = 'wex-admin-outlined-field';
  /* The field's name: Form Editor, history and the Form configuration identify a field by it. */
  box.dataset.fieldName = name;
  const text = document.createElement('label');
  text.className = 'wex-admin-outlined-field__label wex-type-body-small-regular';
  text.htmlFor = `wex-admin-field-${name}`;
  text.textContent = label;
  const control = document.createElement('div');
  control.className = 'wex-admin-outlined-field__control wex-type-navigation-small-semibold';
  control.dataset.value = value;
  const input = document.createElement('textarea');
  input.id = `wex-admin-field-${name}`;
  input.name = name;
  input.rows = 1;
  input.className = 'wex-admin-outlined-field__input';
  input.value = value;
  // The starting value: the editor tells whether anything changed by comparing with it.
  input.defaultValue = value;
  input.required = required;
  input.readOnly = readOnly;
  input.addEventListener('input', () => { control.dataset.value = input.value; });
  control.append(input);
  box.append(text, control);
  return box;
}
