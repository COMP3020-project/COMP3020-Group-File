import * as data from "../data.js";
const textbooks = data.textbooks;
// sign out alert
document.getElementById("Sign-Out").addEventListener('click',() =>{
  localStorage.removeItem("currentUser");
  window.location.href = "../index.html"
});

document.querySelector('.search-left-container').addEventListener('click', function(){
  window.location.href = "search.html";
});

document.querySelector('.tree-left-container').addEventListener('click', function(){
  window.location.href = "../tree-struct/tree.html";
});

document.querySelector('.account-left-container').addEventListener('click', function(){
  window.location.href = "../account/account.html";
});

// Filters and suggests books based on user input

const searchInput = document.querySelector('.search-bar');
const suggestionsList = document.getElementById('suggestions');

var userEmail = localStorage.getItem("currentUser");
console.log(userEmail);
var currentUser = data.getUser(userEmail);
document.getElementById("welcome-text").innerText = "Hello" + ", " + currentUser.username;

searchInput.addEventListener('input', function () {
  const inputValue = searchInput.value.toLowerCase();

  if (inputValue === '') {
    suggestionsList.style.display = 'none';
    return;
  }

  const suggestions = Object.values(textbooks)
    .filter((book) => {
      const titleWords = book.Title.toLowerCase().split(' ');
      const authorNames = book.Author.toLowerCase().split(' ');

      return (
        titleWords.some((word) => word === inputValue) ||
        titleWords.some((word) => word.startsWith(inputValue)) ||
        authorNames.some((name) => name === inputValue)
        
      );
    })
    .sort((a, b) => {
      const aStartsWith = a.Title.toLowerCase().startsWith(inputValue);
      const bStartsWith = b.Title.toLowerCase().startsWith(inputValue);

      if (aStartsWith && !bStartsWith) {
        return -1;
      } else if (!aStartsWith && bStartsWith) {
        return 1;
      } else {
        return 0;
      }
    });

  displaySuggestions(suggestions);
});

var bookToSearch = {};
function displaySuggestions(suggestions) {
  suggestionsList.innerHTML = '';

  if (suggestions.length === 0) {
    suggestionsList.style.display = 'none';
    return;
  }

  suggestions.forEach((book) => {
    const suggestionItem = document.createElement('li');
    suggestionItem.classList.add('suggestion');
    suggestionItem.textContent = `${book.Title} - ${book.Price}`;
    suggestionItem.addEventListener('click', function () {
      searchInput.value = `${book.Title}`;
      bookToSearch = book;
      suggestionsList.style.display = 'none';
    });

    suggestionsList.appendChild(suggestionItem);
  });

  suggestionsList.style.display = 'block';
}

document.addEventListener('click', function (event) {
  if (!event.target.closest('.search-container')) {
    suggestionsList.style.display = 'none';
  }
});

document.getElementById("search-button").addEventListener('click', setQuery);
function setQuery()
{
  data.setQuery(bookToSearch);
  data.constructTree();
  window.location.href = "../tree-struct/tree.html";
}

