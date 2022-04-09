class Book {
  constructor(
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
  ) {
    if (_id) {
      this._id = _id;
    }

    this.book_id = book_id;
    this.user_id = user_id;
    this.was_read = was_read;
    this.book_image = book_image;
    this.book_author = book_author;
    this.book_title = book_title;
    this.is_wishlist = is_wishlist;
    this.book_subject = book_subject;
    this.book_synopsis = book_synopsis;
  }

  static toString() {
    return JSON.stringify(this.book);
  }
}

let user;
class User {
  constructor(name, email) {
    user = {
      name,
      email,
    };
  }

  static getUserInstance() {
      user = JSON.parse(localStorage.getItem("currentUser"));

    return user;
  }
}

let map;
class Map {
  static getMapInstance() {
    map = map = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
      {
        maxZoom: 18,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(map);
    return map;
  }
}
