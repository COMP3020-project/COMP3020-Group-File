export const textbooks = {
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
    },
    "2": {
        "ID": "2",
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
    }
  };
  
export const courses = {
    "COMP1010": {
        "ID": "COMP1010",
        "DepartmentID": "COMP",
        "YearID": "COMP1",
        "Name": "Intro to Computer Science",
        "children": [
            "1"
        ]
    },
    "COMP1020": {
        "ID": "COMP1020",
        "DepartmentID": "COMP",
        "YearID": "COMP1",
        "Name": "Intro to Computer Science 2",
        "children": [
            "2"
        ]
    },
    "COMP2140": {
        "ID": "COMP2140",
        "DepartmentID": "COMP",
        "YearID": "COMP2",
        "Name": "Data structures and Algorithms",
        "children": [
            "3"
        ]
    },
    "COMP3190": {
        "ID": "COMP3190",
        "DepartmentID": "COMP",
        "YearID": "COMP3",
        "Name": "Artificial intelligence",
        "children": [
            "4"
        ]
    },
    "COMP4020": {
        "ID": "COMP4020",
        "DepartmentID": "COMP",
        "YearID": "COMP4",
        "Name": "HCI 2",
        "children": [
            "5"
        ]
    }
  };


export const departments = {
    "COMP": {
        "ID": "COMP",
        "Name": "Department Of Computer Science",
        "children": [
            "COMP1",
            "COMP2",
            "COMP3",
            "COMP4"
        ]
    }
};

export const years = {
    "COMP1": {
        "ID": "COMP1",
        "DepartmentID": "COMP",
        "Name": "Year 1",
        "children": [
            "COMP1010",
            "COMP1020"
        ]
    },
    "COMP2": {
        "ID": "COMP2",
        "DepartmentID": "COMP",
        "Name": "Year 2",
        "children": [
            "COMP2140"
        ]
    },
    "COMP3": {
        "ID": "COMP3",
        "DepartmentID": "COMP",
        "Name": "Year 3",
        "children": [
            "COMP3190"
        ]
    },
    "COMP4": {
        "ID": "COMP4",
        "DepartmentID": "COMP",
        "Name": "Year 4",
        "children": [
            "COMP4020"
        ]
    }
};


export function setQuery(book)
{
    localStorage.setItem("queryID", book['ID']);
}

var fakeDatabase = {
    users: [
      { email: 'user@example.com', password: 'password123', bookList: [{ID: 1, Rating: 9}, {ID: 2, Rating: 8}, {ID: 3, Rating: 4}]}
    ]
  };

export function setDatabase(newDatabase)
{
    localStorage.set("database", newDatabase);
}

export function getDatabase()
{
    if(localStorage.get("database") === null)
    {
        localStorage.set("database", JSON.stringify(fakeDatabase))
        
    }
    return localStorage.get("database");
}

export function constructTree()
{
    var bookID = localStorage.getItem("queryID");
    var book = textbooks[bookID];
    if (book === null)
    {
        return {};
    }
    else
    {
        console.log(book);
        var departmentID = book.DepartmentID;

        console.log(departmentID);
        var department = {...departments[departmentID]};
        console.log(department);
        for (let i =0; i < department.children.length; i++)
        {
            var yearID = department.children[i]
            console.log(yearID)
            var yearInfo = {...years[yearID]}
            for (let j = 0; j < yearInfo.children.length; j++)
            {
                var courseID = yearInfo.children[j];
                var courseInfo = {...courses[courseID]};
                console.log(courseID);
                console.log(courseInfo);
                for (let k = 0; k < courseInfo.children.length; k++)
                {
                    var bookID = courseInfo.children[k];
                    var bookInfo = {...textbooks[bookID]};
                    courseInfo.children[k] = bookInfo;
                }
                yearInfo.children[j] = courseID;
            }
            department.children[i] = yearInfo
        }
    }
}
