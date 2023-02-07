'use strict'

const adapt = (entry) => {
    return {
        bookID: +entry.bookID,
        name: entry.name,
        author: +entry.author,
        year: entry.year,
        type: entry.type
    }
}

module.exports = {adapt}