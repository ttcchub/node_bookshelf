//this is a better way to write the adapter
// this make sure the items inputed are numbers.

const adapt = (item) => {
    return Object.assign(item, {
        bookID: +item.bookID,
        year: +item.year
    });
}

module.exports = { adapt }