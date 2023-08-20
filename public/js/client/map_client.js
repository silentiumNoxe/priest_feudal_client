/**
 * @typedef {Object} PosData
 * @property {number} x
 * @property {number} y
 * @property {string} type
 * */

/** @return Promise<Array<PosData>> */
export async function getLand() {
    const response = await fetch("/assets/map/map_1.land.json");
    if (!response.ok) {
        throw new Error(`Error response received - ${response.statusText}`);
    }

    return response.json();
}