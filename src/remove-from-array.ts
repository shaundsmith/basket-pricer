/**
 * Removes the first instance of the given item from the array
 *
 * @param array
 * @param item
 */
export default function removeFromArray<Type>(array: Type[], item: Type): void {
    const index = array.indexOf(item)
    if (index !== -1) {
        array.splice(index, 1)
    }
}