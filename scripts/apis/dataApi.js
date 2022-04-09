const fetchUser = async (email) => {
  const res = await fetch(`https://elvnforge.herokuapp.com/graphql`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      query: `query user($email: String!){
        user: findOneUsers(email: $email){
          _id
          name
          email
        }
      }
    `,
      variables: {
        email: email,
      },
    }),
  });
  return parseHttpResponse(await res.json());
};

const verifyBook = async (email, book_id) => {
  const res = await fetch(`https://elvnforge.herokuapp.com/graphql`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      query: `query library($email: String!, $book_id: String!){
        userLibrary: findAllUser_books(user_id: $email, book_id: $book_id){
          _id,
        }
      }
    `,
      variables: {
        email: email,
        book_id: book_id,
      },
    }),
  });
  return parseHttpResponse(await res.json()).userLibrary.length;
};

const fetchUserLibrary = async () => {
  const res = await fetch(`https://elvnforge.herokuapp.com/graphql`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      query: `query library($email: String!){
        userLibrary: findAllUser_books(user_id: $email){
          _id,
          book_id,
          user_id,
          was_read,
          book_image,
          book_author,
          book_title,
          is_wishlist,
          book_subject,
          book_synopsis
        }
      }
    `,
      variables: {
        email: User.getUserInstance().email,
      },
    }),
  });
  return parseHttpResponse(await res.json()).userLibrary;
};

const createUser = async (username, email) => {
  const res = await fetch(`https://elvnforge.herokuapp.com/graphql`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      query: `mutation createUser($name: String!, $email: String!) {
        createUsers(name: $name, email: $email){
          email
        }
      }
      
    `,
      variables: {
        name: username,
        email: email,
      },
    }),
  });
  return parseHttpResponse(await res.json());
};

// Add to library
const addToLibrary = async (book) => {
  const {
    _id,
    book_id,
    was_read,
    book_image,
    book_author,
    book_title,
    is_wishlist,
    book_subject,
  } = book;

  const alreadyExists = await verifyBook(User.getUserInstance().email, book_id);

  if (alreadyExists > 0) return;

  const bookDetails = await searchBookDetails(book_id);

  const bookObj = new Book(
    _id || null,
    book_id,
    User.getUserInstance().email,
    was_read || false,
    book_image,
    book_author,
    book_title,
    is_wishlist || false,
    book_subject || "",
    bookDetails?.description?.value || ""
  );

  const res = await fetch(`https://elvnforge.herokuapp.com/graphql`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      query: `mutation createBook(
        $book_id: String!,
        $user_id: String!,
        $was_read: Boolean!,
        $book_image: String!,
        $book_title: String!,
        $book_author: String!,
        $is_wishlist: Boolean!,
        $book_subject: String!,
        $book_synopsis: String!
      ) {
        createUser_books(
          book_id: $book_id,
          user_id: $user_id,
          was_read: $was_read,
          book_image: $book_image,
          book_title: $book_title,
          book_author: $book_author,
          is_wishlist: $is_wishlist,
          book_subject: $book_subject,
          book_synopsis: $book_synopsis
        ){
          _id
        }
      }
      
    `,
      variables: {
        ...bookObj,
      },
    }),
  });
  return parseHttpResponse(await res.json());
};

// remove library
const removeFromLibrary = async (bookId) => {
  const res = await fetch(`https://elvnforge.herokuapp.com/graphql`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      query: `mutation removeBook(
        $_id: String!
      ) {
        removeUser_books(
          _id: $_id
        ){
          _id
        }
      }
      
    `,
      variables: {
        _id: bookId,
      },
    }),
  });
  window.location.reload(true);
};
