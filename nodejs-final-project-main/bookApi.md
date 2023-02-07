# Book data storage

## Book data json

```json
[
    {
        "bookID":,
        "name":"",
        "author":,
        "year",
        "type":""
    },
    {
        "bookID":,
        "name":"",
        "author":,
        "year":"",
        "type":""
    }
]
```

Each bookID is unique!

### Public API (methods of Datastorage class)

#### dataStorageLayer.js
-   getAll()
    -   returns an array of all books / []
-   getOne(bookID)
    -   returns an book object / NOT_FOUND
-   insert(newBook)
    -   returns INSERT_OK / NOT_INSERTED / ALREADY_IN_USE
-   update(updatedBook)
    -   returns UPDATE_OK / NOT_UPDATED
-   remove(bookID)
    -   REMOVE_OK / NOT_FOUND / NOT_REMOVED
-   getters for status codes
    -   returns an array of status codes

### Private API

#### readerWriter.js

-   readStorage(storageFile)
    -   returns an array of books / []

-   writeStorage(storageFile, data)
    -   returns true/false

#### storageLayer.js
-   getAllFromStorage()
    -   returns an array of books / []

-   getFromStorageWithNumber(number)
    -   returns an book object / null

-   addToStorage(newBook)
    -   returns true / false

-   updateEntry(updatedBook)
    -   returns true / false

-   deleteEntry(number)
    -   returns true / false

#### statusCodes.js

```js
const CODES={
    PROGRAM_ERROR:0,
    NOT_FOUND:1,
    INSERT_OK:2,
    ...
}
```

The format of an status/error message is:

```js
const MESSAGES={
    PROGRAM_ERROR: ()=> ({
        message:'There seems to be an error. Sorry!',
        code:CODES.PROGRAM_ERROR,
        type:'error'
    }),
    NOT_FOUND: bookID=>({
        message:`No book found with bookID ${bookID}`,
        code:CODES.NOT_FOUND,
        type:'error'
    }),
    INSERT_OK: bookID=>({
        message:`Book ${bookID} was inserted`,
        code:CODES.INSERT_OK,
        type:'info'
    })
}
```
status types are `error` or `info`
