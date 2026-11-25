/**
 * Row model for the Editor's Row property. Pure: no DOM, so it is testable on its own.
 * Items are the form fields in order. A field is on its own row (`own`) or shares a row with the
 * adjacent field (`first` then `second`); a shared row holds exactly two fields at 50% and 50%.
 * `reverse` swaps the two columns without changing the field order.
 * @typedef {{ id: unknown, role: 'own' | 'first' | 'second', reverse: boolean }} RowItem
 * @typedef {'up' | 'down'} RowDirection
 */

/** The items grouped by visual row, in order. @param {RowItem[]} items @returns {RowItem[][]} */
export function rowsOf(items) {
  /** @type {RowItem[][]} */
  const rows = [];
  for (const item of items) {
    const last = rows[rows.length - 1];
    if (item.role === 'second' && last?.length === 1 && last[0]?.role === 'first') last.push(item);
    else rows.push([item]);
  }
  return rows;
}

/** @param {RowItem} item @returns {RowItem} */
const solo = (item) => ({ id: item.id, role: 'own', reverse: false });

/** The field's own row and the row above or below it. @param {RowItem[]} items @param {unknown} id @param {RowDirection} direction */
function locate(items, id, direction) {
  const rows = rowsOf(items);
  const at = rows.findIndex((row) => row.some((item) => item.id === id));
  const row = rows[at] ?? [];
  const nextAt = at + (direction === 'up' ? -1 : 1);
  return { rows, at, row, nextAt, next: at < 0 ? undefined : rows[nextAt] };
}

/** A shared field can always leave its row; a field on its own row needs a row above or below. @param {RowItem[]} items @param {unknown} id @param {RowDirection} direction */
export function canMoveField(items, id, direction) {
  const { row, next } = locate(items, id, direction);
  return row.length === 2 || next !== undefined;
}

/** Only a lone neighbour raises the prompt (share or swap); a shared row is simply passed. @param {RowItem[]} items @param {unknown} id @param {RowDirection} direction */
export function needsShareChoice(items, id, direction) {
  const { row, next } = locate(items, id, direction);
  return row.length === 1 && next?.length === 1;
}

/**
 * Moves one field a step. Shared fields leave their row (above or below the partner); a field on its
 * own row either shares with a lone neighbour (`share`) or passes the neighbour or the shared row
 * (`swap`). Returns the new ordered items, or null when the move does not apply.
 * @param {RowItem[]} items @param {unknown} id @param {RowDirection} direction @param {'share' | 'swap'} [choice]
 * @returns {RowItem[] | null}
 */
export function moveField(items, id, direction, choice) {
  const self = items.find((item) => item.id === id);
  const { rows, at, row, nextAt, next } = locate(items, id, direction);
  if (!self || at < 0) return null;
  if (row.length === 2) {
    const partner = row.find((item) => item.id !== id);
    if (!partner) return null;
    rows.splice(at, 1, ...(direction === 'up' ? [self, partner] : [partner, self]).map((item) => [solo(item)]));
    return rows.flat();
  }
  const neighbour = next?.[0];
  if (!next || !neighbour) return null;
  if (next.length === 1 && choice === 'share') {
    const [first, second] = direction === 'up' ? [neighbour, self] : [self, neighbour];
    if (!first || !second) return null;
    rows.splice(Math.min(at, nextAt), 2, [{ id: first.id, role: 'first', reverse: false }, { id: second.id, role: 'second', reverse: false }]);
    return rows.flat();
  }
  if (next.length === 1 && choice !== 'swap') return null;
  rows.splice(at, 1);
  rows.splice(direction === 'up' ? nextAt : at + 1, 0, [solo(self)]);
  return rows.flat();
}

/** Flips the two columns of the field's shared row; a field on its own row has nothing to flip. @param {RowItem[]} items @param {unknown} id @param {boolean} reverse */
export function setRowReverse(items, id, reverse) {
  const { row } = locate(items, id, 'up');
  if (row.length !== 2) return items;
  return items.map((item) => (row.includes(item) ? { ...item, reverse } : item));
}
