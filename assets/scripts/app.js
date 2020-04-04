var addMovieModel         = document.getElementById("add-modal");
var startAddMovieButton   = document.querySelector("header button"); //select ADD MOVIE btn like css style
var backdrop              = document.getElementById("backdrop");
var cancelAddMovieButton  = addMovieModel.querySelector(".btn--passive");
var confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
var userInputs            = addMovieModel.querySelectorAll("input");
var entryTextSection      = document.getElementById("entry-text"); 


const movies = [];

const updateUI = () => {
    if (movies.length === 0) {
      entryTextSection.style.display = 'block';
    } else {
      entryTextSection.style.display = 'none';
    }
  };

  const renderNewMovieElement = (title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
      <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
      </div>
      <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
      </div>
    `;
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
  };

// this function make disable background when hit the add movie btn
const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
};

//when you click add movie btn show the inpute fourm.
const toggleMovieModal = () => {
    addMovieModel.classList.toggle("visible");
    toggleBackdrop();
};

// this function cancle the add movie form
// clear user inpute
const clearUserInput = () => {
    for(const usrInput of userInputs) {
        usrInput.value = "";
    };
};

const cancleAddMovieHandler = () => {
    toggleMovieModal();
    clearUserInput();
};


// add function
const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;
    
    // simple, user inpute validation
    if (
        titleValue.trim() === " " ||
        imageUrlValue.trim() === " " ||
        ratingValue.trim() === " " ||
        parseInt(ratingValue) < 1 ||
        parseInt(ratingValue) > 5
    ) {

    alert("Please enter valid values (rating between 1 to 5).");
    return;
    };

    const newMovie = {
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };
    
    movies.push(newMovie);
    console.log(movies);
    toggleMovieModal();
    clearUserInput();
    renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};

// this function dismis movie inpute form if you dont like to 
// fillout just click out side the input form
const backdropClickHandler = () => {
    toggleMovieModal();
};

startAddMovieButton.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancleAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);