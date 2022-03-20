const url = "https://api.foursquare.com/v3/places/nearby?";

const getNearByLibraries = async (lat, lng) => {
  const slug = `ll=${lat}%2C${lng}&query=library`;
  const res = await (await fetch(`${url}${slug}`, {
    headers: {
      Accept: "application/json",
      Authorization: "fsq3+Yj+aejUo+8i9IGevFfJY1Gqw0+VKkCOX/ZyL9SrD20=",
    },
  })).json();

  return res.results;
};
