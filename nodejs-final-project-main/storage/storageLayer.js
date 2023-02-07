'use strict'

const path = require('path');

const { storageFile, adapterfile, key } = require('./storageConfig.json');

const { readStorage, writeStorage } = require('./readerWriter');
const { dirname } = require('path');

const storageFilePath = path.join(__dirname, storageFile);

const  { adapt } = require(path.join(__dirname, adapterfile));

const getAllFromStorage = async () => {
    return readStorage(storageFilePath);
}

const getFromStorageWithNumber = async (bookID) =>{
    return (await readStorage(storageFilePath)).find(item =>item[key] == bookID) || null;
}

const addToStorage = async (newEntry) => {
    const storageData = await readStorage(storageFilePath);
    
    storageData.push(adapt(newEntry));
    
    return await writeStorage(storageFilePath, storageData);
}

const updateEntry = async (updateEntry) => {
    const storageData = await readStorage(storageFilePath);
    const currentEntry = storageData.find(item => item[key] == updateEntry[key]); // this is a reference to the entry in the array. 
    
    if (currentEntry) {
        Object.assign(currentEntry, adapt(updateEntry)); // this updates the item in the array directly.
        return await writeStorage(storageFilePath, storageData);
    }
    
    return false; // we don't update if it's not found
}

const deleteEntry = async (bookID) => {
    const storageData = await readStorage(storageFilePath);
    const i = storageData.findIndex(item => item[key] == bookID);
    
    if (i < 0) {
        return false;
    }
    storageData.splice(i,1);

    return await writeStorage(storageFilePath, storageData);
}


//Tests

//getAllFromStorage().then(console.log).catch(console.log);

//getFromStorageWithNumber(2).then(console.log).catch(console.log);

// addToStorage(
//     {
//         "number":"8",
//         "name":"Gold Rush",
//         "quantity":20,
//         "rating":"*****",
//         "genre":"Simulator"
//     }
// ).then(console.log).catch(console.log);

// updateEntry(
//     {
//         "number":"120",
//         "name":"World of Warcraft",
//         "quantity":21,
//         "rating":"********",
//         "genre":"MMORP"
//     }
// ).then(console.log).catch(console.log);

//deleteEntry(12).then(console.log).catch(console.log);

module.exports = { getAllFromStorage, getFromStorageWithNumber, addToStorage, updateEntry, deleteEntry }
