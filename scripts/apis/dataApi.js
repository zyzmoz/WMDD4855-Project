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
    book_id,
    was_read,
    book_image,
    book_author,
    book_title,
    is_wishlist,
    book_subject
  } = book;

  const bookDetails = await searchBookDetails(book_id)
  console.log(bookDetails)
  const bookObj = new Book(
    null,
    book_id,
    User.getUserInstance().email,
    was_read || false,
    book_image,
    book_author,
    book_title,
    is_wishlist || false,
    book_subject,
    bookDetails.description
  );
};

// remove library
const removeFromLibrary = async (book) => {
  // TODO
}
