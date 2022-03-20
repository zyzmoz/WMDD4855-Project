searchForm.addEventListener("submit", async (evt) => {
  searchResults.innerHTML = "";
  let results = [];
  evt.preventDefault();
  const searchType = document.querySelector(
    'input[name="searchType"]:checked'
  ).value;
  switch (searchType) {
    case "title":
      results = await searchBooksByTitle(query.value);
      break;
    case "author":
      results = await searchBooksByAuthor(query.value);
      break;
    case "subject":
      results = await searchBooksBySubject(query.value);
      break;
  }

  console.table({ results });

  results.map((book) => {
    const book_image = `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`;
    const book_title = book.title.replace(/'/g, "`");
    const book_author = book.author_name.toString();
    const book_id = book.key;
    const book_subject = (book.subject_facet || book.subject)?.slice(0,3).toString();
    searchResults.innerHTML += `
      <div class="book-card">
        <img src="${book_image}"/>
        <h2>${book_title}</h2>
        <b>${book_author}</b>
        <button onclick='addToLibrary(${JSON.stringify({book_id, book_title, book_subject, book_image, book_author, is_wishlist: true})})'>Add To Wishlist</button>
        <button onclick='addToLibrary(${JSON.stringify({book_id, book_title, book_subject, book_image, book_author, was_read: true})})'>Add To Library</button>
      </div>
      `;
  });
});
