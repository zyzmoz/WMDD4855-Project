const parseHttpResponse = (data) => {
  return data[Object.keys(data)[0]]
}