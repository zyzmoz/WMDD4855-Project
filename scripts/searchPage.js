searchForm.addEventListener("submit", async (evt) => {
  let results = [];
  evt.preventDefault();

  if (title.checked) {
    results = await searchBooksByTitle(query.value);
  }
  if (author.checked) {
    results = await searchBooksAuthor(query.value);
  }
  if (subject.checked) {
    results = await searchBooksBySubject(query.value);
  }

  results.map((book) => {
    searchResults.innerHTML += `
      <div class="book-card">
        <img src="https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg"/>
        <h2>${book.title}</h2>
        <b>${book.author_name.toString()}</b>
      </div>
      `;
  });
});
