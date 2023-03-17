const peopleContainer = document.getElementById('people-container')
const paginationContainer = document.getElementById('pagination')
const loadingSpinner = document.getElementById('loading-spinner')

let currentPage = 1
let totalPeople;
const peoplePerPage = 10

function showLoadingSpinner() {
    loadingSpinner.classList.add('loading-spinner-visible')
}

function hideLoadingSpinner() {
    loadingSpinner.classList.remove('loading-spinner-visible')
}

function renderPeople(people) {
    peopleContainer.innerHTML = ''

    people.forEach((people) => {
        const peopleElement = document.createElement('div')
        peopleElement.classList.add('people')
        peopleElement.innerHTML = `
        <h2>${people.name}</h2>
        <p><strong>Name:</strong> ${people.name}</p>
        <p><strong>Gender:</strong> ${people.gender}</p>
        <p><strong>Heigth:</strong> ${people.height}</p>
        <p><strong>Hair Color:</strong> ${people.hair_color}</p>
        `

        peopleContainer.appendChild(peopleElement)
    })
}

function renderPagination() {
    const totalPages = Math.ceil(totalPeople / peoplePerPage)
    paginationContainer.innerHTML = ''

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button')
        button.innerHTML = i

        if (i === currentPage) {
            button.classList.add('active')
        }

        button.addEventListener('click', () => {
            currentPage = i
            fetchPeople()
        })

        paginationContainer.appendChild(button)
    }
}

function fetchPeople() {
    showLoadingSpinner()

    fetch(`https://swapi.dev/api/people/?page=${currentPage}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        totalPeople = data.count
        renderPeople(data.results)
        renderPagination()
        hideLoadingSpinner()
    })
    .catch((err) => {
        console.log(err)
    })
}

fetchPeople()