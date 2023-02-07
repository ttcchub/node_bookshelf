'use strict';

const Datastorage = require('./storage/dataStorageLayer');

const storage = new Datastorage();

//storage.getAll().then(console.log).catch(console.log);
//storage.getOne(90).then(console.log).catch(console.log);
storage.remove(15).then(console.log).catch(console.log);

// (async () => {
//     try {
//         const status = await storage.update({
//             "number":130,
//             "name":"Starsand",
//             "quantity":100,
//             "rMMORPating":"****",
//             "genre":"Survival"
//         });     
//         console.log(status);   
//     } catch (error) {
//        console.log(error); 
//     }


// })();