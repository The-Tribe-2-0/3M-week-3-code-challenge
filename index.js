const filmList = document.getElementById('films');
const filmTitle = document.getElementById('film-title');
const filmPoster = document.getElementById('film-poster');
const filmRuntime = document.getElementById('film-runtime');
const filmShowtime = document.getElementById('film-showtime');
const filmTicketCount = document.getElementById('film-ticket-count');
const buyTicketButton = document.getElementById('buy-ticket-button');

let selectedFilmId = 1;
let films = [];

// fetch film data from server and update the film list and initial film details
fetch('http://localhost:3000/films')
  .then(response => response.json())
  .then(data => {
    films = data;

    // populate the film list with the titles of all films
    films.forEach(film => {
      const listItem = document.createElement('li');
      listItem.innerText = film.title;
      listItem.addEventListener('click', () => {
        selectedFilmId = film.id;
        updateSelectedFilmDetails();
      });
      filmList.appendChild(listItem);
    });

    // update the initial film details
    updateSelectedFilmDetails();
  });

// update the film details for the selected film
function updateSelectedFilmDetails() {
  const selectedFilm = films.find(film => film.id === selectedFilmId);
  if (selectedFilm) {
    filmTitle.innerText = selectedFilm.title;
    filmRuntime.innerText = `Runtime: ${selectedFilm.runtime} min`;
    filmShowtime.innerText = `Showtime: ${selectedFilm.showtime}`;
    const availableTickets = selectedFilm.capacity - selectedFilm.tickets_sold;
    filmTicketCount.innerText = `Available Tickets: ${availableTickets}`;
    if (availableTickets === 0) {
      buyTicketButton.disabled = true;
      buyTicketButton.innerText = 'Sold Out';
    } else {
      buyTicketButton.disabled = false;
      buyTicketButton.innerText = 'Buy Ticket';
    }
    filmPoster.src = selectedFilm.poster_url;
  }
}

// buy a ticket for the selected film
function buyTicket() {
  const selectedFilm = films.find(film => film.id === selectedFilmId);
  if (selectedFilm) {
    selectedFilm.tickets_sold++;
    updateSelectedFilmDetails();
  }
}



