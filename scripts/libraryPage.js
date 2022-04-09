greeting.innerHTML = `${User.getUserInstance().name}'s Library`;

(async () => {
  document.getElementById("roller").style.visibility = "visible";
  library.innerHTML = "<h3>Your Favorites</h3>";
  wishlist.innerHTML = "<h3>Your Wishlist</h3>";

  const libraryBooks = await fetchUserLibrary();
  let libOutput = "";
  let wishOutput = "";

  libraryBooks?.map((book) => {
    if (book.was_read) {
      libOutput += `
      <div class="book-card">
      <img src="${book.book_image}"/>
        <div class="title">
          <h4>${book.book_title}</h4>
          <b>${book.book_author}</b>
        </div>
        <div class="actions">
          <button class="button danger" onclick="removeFromLibrary(
            '${book._id}')">Remove</button>
        </div>
      </div>
      `;
    } else {
      wishOutput += `
      <div class="book-card">
      <img src="${book.book_image}"/>
        <div class="title">
          <h4>${book.book_title}</h4>
          <b>${book.book_author}</b>
        </div>
        <div class="actions">
          <button class="button danger" onclick="removeFromLibrary(
            '${book._id}')">Remove</button>
        </div>
      </div>
      `;
    }
  });
  
  if (libOutput === "") {
    libOutput = "<b>No books here</b>";
  }

  if (wishOutput === "") {
    wishOutput = "<b>No books here</b>";
  }

  library.innerHTML += `<div class="slider-container">${libOutput}</div>`;
  wishlist.innerHTML += `<div class="slider-container">${wishOutput}</div>`;
  document.getElementById("roller").style.visibility = "hidden";
})();
