(async () => {
  document.getElementById("roller").style.visibility = "visible";
  trendingBooks.innerHTML = "<h3>Trending Books</h3>";
  bookSuggestions.innerHTML = "<h3>You Might Also Like</h3>";
  searchResults.innerHTML = "";
  const trendingBooksArr = await getTrendingBooks();
  let newOutput = "";

  trendingBooksArr.map((book) => {
    const book_image = `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`;
    const book_title = book.title.replace(/'/g, "`");
    const book_author = book.author_name.toString();
    const book_id = book.key;
    const book_subject = (book.subject_facet || book.subject)
      ?.slice(0, 3)
      .toString();
    newOutput += `
      <div class="book-card">
      <img src="${book_image}"/>
        <div class="title">
          <h4>${book_title}</h4>
          <b>${book_author}</b>
        </div>
        <div class="actions">
          <button class="button primary" onclick='addToLibrary(${JSON.stringify(
            {
              book_id,
              book_title,
              book_subject,
              book_image,
              book_author,
              is_wishlist: true,
            }
          )})'>Add To Wishlist</button>
          <button class="button " onclick='addToLibrary(${JSON.stringify({
            book_id,
            book_title,
            book_subject,
            book_image,
            book_author,
            was_read: true,
          })})'>Add To Library</button>
        </div>
      </div>
      `;
  });
  trendingBooks.innerHTML += `<div class="slider-container">${newOutput}</div>`;

  const subjectsArr = (await fetchUserLibrary())
    ?.map((book) => book.book_subject)
    .flat()
    .join(",")
    .split(",");

  const subjects = topThreeSubjects(subjectsArr);
  const bookSuggestionsArr = await getBookSuggestions(subjects);

  newOutput = "";
  bookSuggestionsArr
    .filter((book) => book)
    .map((book) => {
      const book_image = `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`;
      const book_title = book.title.replace(/'/g, "`");
      const book_author = book.author_name.toString();
      const book_id = book.key;
      const book_subject = (book.subject_facet || book.subject)
        ?.slice(0, 3)
        .toString();
      newOutput += `
      <div class="book-card">
        <img src="${book_image}"/>
        <div class="title">
          <h4>${book_title}</h4>
          <b>${book_author}</b>
        </div>
        <div class="actions">
          <button class="button primary" onclick='addToLibrary(${JSON.stringify(
            {
              book_id,
              book_title,
              book_subject,
              book_image,
              book_author,
              is_wishlist: true,
            }
          )})'>Add To Wishlist</button>
          <button class="button " onclick='addToLibrary(${JSON.stringify({
            book_id,
            book_title,
            book_subject,
            book_image,
            book_author,
            was_read: true,
          })})'>Add To Library</button>
        </div>
      </div>
      `;
    });

  bookSuggestions.innerHTML += `<div class="slider-container">${newOutput}</div>`;

  document.getElementById("roller").style.visibility = "hidden";
})();

searchForm.addEventListener("submit", async (evt) => {
  document.getElementById("roller").style.visibility = "visible";
  trendingBooks.innerHTML = "";
  searchResults.innerHTML = "<h3>Search Results</h3>";
  let results = [];
  let newOutput = "";
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
    const book_author = book.author_name?.toString() || "";
    const book_id = book.key;
    const book_subject = (book.subject_facet || book.subject)
      ?.slice(0, 3)
      .toString();
    newOutput += `
      <div class="book-card">
        <img src="${book_image}"/>
        <div class="title">
        <h4>${book_title}</h4>
        <b>${book_author}</b>
        </div>
        <div class="actions">
          <button class="button primary" onclick='addToLibrary(${JSON.stringify(
            {
              book_id,
              book_title,
              book_subject,
              book_image,
              book_author,
              is_wishlist: true,
            }
          )})'>Add To Wishlist</button>
          <button class="button " onclick='addToLibrary(${JSON.stringify({
            book_id,
            book_title,
            book_subject,
            book_image,
            book_author,
            was_read: true,
          })})'>Add To Library</button>
        </div>
      </div>
      `;
  });

  searchResults.innerHTML += `<div class="slider-container">${newOutput}</div>`;
  document.getElementById("roller").style.visibility = "hidden";
});
