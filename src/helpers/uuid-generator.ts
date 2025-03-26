/**
 * Generates a UUID (Universally Unique Identifier) string.
 * The format of the UUID is "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".
 * @returns A UUID string.
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
