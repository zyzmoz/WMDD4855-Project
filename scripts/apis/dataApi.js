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
