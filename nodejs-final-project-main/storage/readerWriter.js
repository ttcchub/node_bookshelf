'use strict'

const fs = require('fs').promises;

const readStorage = async (storageFile) => {
    try {
            const data = await fs.readFile(storageFile, 'utf8');
            return JSON.parse(data);
    } 
    catch (error) {
        return [];
    }
}

const writeStorage = async (storageFile, data) => {
    try {
        await fs.writeFile(storageFile, JSON.stringify(data, null, 4), {
            encoding:'utf8',
            flag:'w'
        });
        return true;
    } 
    catch (error) {
        return false;
    }
}

module.exports={readStorage, writeStorage}