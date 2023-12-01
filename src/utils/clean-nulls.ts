/**
 * Filters out null values from an array.
 * Returns the filtered array without nulls, or null if the resulting array is empty.
 *
 * @param {Array<T | null>} array - The array to be filtered.
 * @returns {T[] | null} An array of non-null items, or null if no non-null items are present.
 * @template T - The type of the items in the array.
 */
const cleanNulls = <T>(array: Array<T | null>): T[] | null => {
  const filteredArray = array.filter((item): item is T => item !== null);

  return filteredArray.length === 0 ? null : filteredArray;
};

export default cleanNulls;
