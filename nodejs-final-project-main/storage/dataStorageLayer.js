'use strict';

const {CODES, MESSAGES} = require('./statusCodes');

const { getAllFromStorage, getFromStorageWithNumber, addToStorage, updateEntry, deleteEntry } = require('./storageLayer');

//Datastorage class

module.exports = class Datastorage{
    get CODES(){
        return CODES;
    }

    getAll(){
       return getAllFromStorage();
    }

    getOne(bookID){
        return new Promise(async (resolve, reject) => {
            if (!bookID) {
                reject(MESSAGES.NOT_FOUND('---empty---'));
            }
            else{
                const result = await getFromStorageWithNumber(bookID);
                if (result) {
                    resolve(result);
                }
                else{
                    reject(MESSAGES.NOT_FOUND(bookID));
                }
            }
        });
    }

    insert(entry){
        return new Promise(async (resolve, reject) => {
            if (entry) {
               if (!entry.bookID) {
                    reject(MESSAGES.NOT_INSERTED());
               } 
               else if(await getFromStorageWithNumber(entry.bookID)){
                reject(MESSAGES.ALREADY_IN_USE(entry.bookID));
               }
               else if(await addToStorage(entry)){
                  resolve(MESSAGES.INSERT_OK(entry.bookID));
               }
               else{
                reject(MESSAGES.NOT_INSERTED());
               }
            }
            else{
                reject(MESSAGES.NOT_INSERTED());
            }
        });
    }

    update(entry){
        return new Promise(async (resolve, reject) => {
            if (entry) {
                if (await updateEntry(entry)) {
                    resolve(MESSAGES.UPDATE_OK(entry.bookID));
                }
                else{
                    reject(MESSAGES.NOT_UPDATED());
                }
            }
            else{
                reject(MESSAGES.NOT_UPDATED());
            }
        })
    }

    remove(bookID){
        return new Promise(async (resolve, reject) => {
            if (!bookID) {
                reject(MESSAGES.NOT_FOUND(bookID));
            }
            else if(await deleteEntry(bookID)){
                resolve(MESSAGES.REMOVE_OK(bookID));
            }
            else{
               reject(MESSAGES.NOT_REMOVED(bookID)); 
            }
        })
    }
}