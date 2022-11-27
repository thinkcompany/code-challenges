import fs from 'fs/promises';

export async function getStoredFares() {
    const rawFileContent = await fs.readFile('fares.json', { encoding: 'utf-8'});
    const faresData = JSON.parse(rawFileContent);
    return faresData;
}