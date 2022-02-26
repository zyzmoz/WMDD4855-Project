const fetchUser = async (userId) => {
  const res = await fetch(`https://elvnforge.herokuapp.com/graphql`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      query: `query user($id: String!){
        user: findOneUsers(_id: $id){
          _id
          name
        }
        user_reviews: findAllReviews(user_id: $id){
          review
          score
        }
        user_books: findAllShelves(user_id: $id){
          book_id
          review
        }
      }
    `,
      variables: {
        id: userId,
      },
    }),
  });
  console.log(await res.json());
};
