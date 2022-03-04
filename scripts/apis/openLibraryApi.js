const apiURI = "http://openlibrary.org/search.json?language=eng";

const searchBooksByTitle = async (query) => {
  const res = await fetch(`${apiURI}&title=${query}`, {
    method: 'GET'
  })

  return (await res.json()).docs
};

const searchBooksByAuthor = async (author) => {
  const res = await fetch(`${apiURI}&author=${author}`, {
    method: 'GET'
  })

  return (await res.json()).docs
};

const searchBooksBySubject = async (subject) => {
  const res = await fetch(`${apiURI}&subject=${subject}`, {
    method: 'GET'
  })

  return (await res.json()).docs
};

const searchBookByKey = async (key) => {
  const res = await fetch(`https://openlibrary.org${key}.json`, {
    method: 'GET'
  })

  return (await res.json())
};
