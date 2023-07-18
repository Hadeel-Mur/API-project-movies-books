import {
    bookNameRef,
    searchBtn2,
    result2
} from './constants.js'

const key = 'AIzaSyCzK4xsLEdS-bbCshmI_kdo9AFcgnm1-1Y'


let findBook = () => {
    let bookName = bookInput.value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${bookName}&
  &apikey=${key}`;
    if (bookName.trim().length <= 0) {
        const searchResult2 = document.getElementById(result2)
        searchResult2.innerHTML = `<h2 class='msg'> Please Enter A Book Name</h2>`;
    } else {
        fetch(url)
            .then((Response) => Response.json())
            .then((data) => {
                if (data.Response = 'true') {

                    displayData(data);
                    // console.log(data)
                } else {
                    const searchResult2 = document.getElementById(result2)
                    searchResult2.innerHTML = `<h3 class='msg'>No results found!</h3>`;
                }
            })
            .catch(() => {
                const searchResult2 = document.getElementById(result2)
                searchResult2.innerHTML = `<h3 class='msg'>Something went wrong!</h3>`;
            });
    }
};

function displayData(data) {
    const searchResult2 = document.getElementById(result2)
    searchResult2.innerHTML = '';

    data.items.forEach((book) => {
        const cover = book.volumeInfo.imageLinks?.thumbnail || "";
        const { title, authors, publisher, publishedDate, description, language, pageCount } = book.volumeInfo;

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');
        bookInfo.innerHTML = `
            <div>
                <h2>${title ? title : 'Unknown'}</h2>
                <p><strong>Authors:</strong> ${authors ? authors.join(', ') : 'Unknown'}</p>
                <p><strong>Publisher:</strong> ${publisher ? publisher : 'Unknown'}</p>
                <p><strong>Published Date:</strong> ${publishedDate ? publishedDate : 'Unknown'}</p>
                <p><strong>Language:</strong> ${language ? language : 'No language available'}</p>
                <p><strong>Page Count:</strong> ${pageCount ? pageCount : 'No pageCount available'}</p>
                <p><strong>Description:</strong> ${description ? description : 'No description available'}</p>
            </div>
            <img class="book-cover" src="${cover ? cover : 'No image available'}">
        `;

        searchResult2.appendChild(bookInfo);
    });
}

const searchButton = document.getElementById(searchBtn2)
searchButton.addEventListener('click', findBook);
const bookInput = document.getElementById(bookNameRef)
bookInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        findBook();
    }
});
window.addEventListener('load', findBook);
