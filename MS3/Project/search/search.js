var textbooks = {
  "1": {
      "ID": "1",
      "DepartmentID": "COMP",
      "YearID": "COMP1",
      "CourseID": "COMP1010",
      "Title": "Introduction to CS",
      "Author": "John Doe",
      "Price": "$30.00",
      "Version": "1.0",
      "CoverImage": "link1",
      "PreviewPage": [
          "page1",
          "page2"
      ],
      "ShareLink": "",
      "Rating": "-1"
  },
  "2": {
      "ID": "asdsda2",
      "DepartmentID": "COMP",
      "YearID": "COMP1",
      "CourseID": "COMP1020",
      "Title": "Introduction to CS 2",
      "Author": "Jane Smith",
      "Price": "$25.00",
      "Version": "2",
      "CoverImage": "link",
      "PreviewPage": [
          "page3",
          "page4"
      ],
      "ShareLink": "",
      "Rating": "-1"
  },
  "3": {
      "ID": "3",
      "DepartmentID": "COMP",
      "YearID": "COMP2",
      "CourseID": "COMP2140",
      "Title": "Data structures and Algorithms",
      "Author": "Deez Balls",
      "Price": "$32.00",
      "Version": "5",
      "CoverImage": "link",
      "PreviewPage": [
          "",
          ""
      ],
      "ShareLink": "",
      "Rating": "-1"
  },
  "4": {
      "ID": "4",
      "DepartmentID": "COMP",
      "YearID": "COMP3",
      "CourseID": "COMP3190",
      "Title": "Artificial intelligence",
      "Author": "Deez Balls",
      "Price": "$40.00",
      "Version": "10",
      "CoverImage": "link",
      "PreviewPage": [
          "",
          ""
      ],
      "ShareLink": "",
      "Rating": "-1"
  },
  "5": {
      "ID": "5",
      "DepartmentID": "COMP",
      "YearID": "COMP4",
      "CourseID": "COMP4020",
      "Title": "HCI 2",
      "Author": "Gay Sun",
      "Price": "$35.00",
      "Version": "10",
      "CoverImage": "link",
      "PreviewPage": [
          "",
          ""
      ],
      "ShareLink": "",
      "Rating": "-1"
  }
};

var courses = {
  "COMP1010": {
      "ID": "COMP1010",
      "DepartmentID": "COMP",
      "YearID": "COMP1",
      "Name": "Intro to Computer Science",
      "BookList": [
          "1"
      ]
  },
  "COMP1020": {
      "ID": "COMP1020",
      "DepartmentID": "COMP",
      "YearID": "COMP1",
      "Name": "Intro to Computer Science 2",
      "BookList": [
          "2"
      ]
  },
  "COMP2140": {
      "ID": "COMP2140",
      "DepartmentID": "COMP",
      "YearID": "COMP2",
      "Name": "Data structures and Algorithms",
      "BookList": [
          "3"
      ]
  },
  "COMP3190": {
      "ID": "COMP3190",
      "DepartmentID": "COMP",
      "YearID": "COMP3",
      "Name": "Artificial intelligence",
      "BookList": [
          "4"
      ]
  },
  "COMP4020": {
      "ID": "COMP4020",
      "DepartmentID": "COMP",
      "YearID": "COMP4",
      "Name": "HCI 2",
      "BookList": [
          "5"
      ]
  }
};


var departments = {
  "COMP": {
      "ID": "COMP",
      "Name": "Department Of Computer Science",
      "YearList": [
          "COMP1",
          "COMP2",
          "COMP3",
          "COMP4"
      ]
  }
};

var years = {
  "COMP1": {
      "ID": "COMP1",
      "DepartmentID": "COMP",
      "Name": "Year 1",
      "CourseList": [
          "COMP1010",
          "COMP1020"
      ]
  },
  "COMP2": {
      "ID": "COMP2",
      "DepartmentID": "COMP",
      "Name": "Year 2",
      "CourseList": [
          "COMP2140"
      ]
  },
  "COMP3": {
      "ID": "COMP3",
      "DepartmentID": "COMP",
      "Name": "Year 3",
      "CourseList": [
          "COMP3190"
      ]
  },
  "COMP4": {
      "ID": "COMP4",
      "DepartmentID": "COMP",
      "Name": "Year 4",
      "CourseList": [
          "COMP4020"
      ]
  }
};


// sign out alert
const signout = document.getElementById("Sign-Out");
signout.addEventListener('click', function(){
alert("Successfully signed out.")
});

// Filters and suggests books based on user input

const searchInput = document.querySelector('.search-bar');
const suggestionsList = document.getElementById('suggestions');

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

//Display suggestion
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

