searchForm.addEventListener("submit", async (evt) => {
  searchResults.innerHTML = "";
  let results = [];
  evt.preventDefault();
  const searchType = document.querySelector('input[name="searchType"]:checked').value
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

  results.map((book) => {
    searchResults.innerHTML += `
      <div class="book-card">
        <img src="https://covers.openlibrary.org/b/olid/${
          book.cover_edition_key
        }-M.jpg"/>
        <h2>${book.title}</h2>
        <b>${book.author_name.toString()}</b>
      </div>
      `;
  });
});
