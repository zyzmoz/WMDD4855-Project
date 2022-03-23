const apiURI = "http://openlibrary.org/search.json?language=eng";

const searchBooksByTitle = async (query) => {
  const res = await fetch(`${apiURI}&title=${query}`, {
    method: "GET",
  });

  return (await res.json()).docs;
};

const searchBooksByAuthor = async (author) => {
  const res = await fetch(`${apiURI}&author=${author}`, {
    method: "GET",
  });

  return (await res.json()).docs;
};

const searchBooksBySubject = async (subject) => {
  const res = await fetch(`${apiURI}&subject=${subject}`, {
    method: "GET",
  });

  return (await res.json()).docs;
};

const searchBookDetails = async (key) => {
  const res = await fetch(`https://openlibrary.org${key}.json`, {
    method: "GET",
  });

  return await res.json();
};

const getTrendingBooks = async () => {
  const res = await fetch(
    `${apiURI}&q=first_publish_year%3A[2022%20TO%202022]&sort=new&limit=10`,
    {
      method: "GET",
    }
  );

  return (await res.json()).docs;
};

const getBookSuggestions = async (subjects = "action fantasy") => {
  const res = await fetch(
    `${apiURI}&q=subject:${subjects}&limit=10`,
    {
      method: "GET",
    }
  );

  return (await res.json()).docs;
};
