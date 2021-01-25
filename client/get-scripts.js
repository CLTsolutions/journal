/* *************************
 *** DISPLAY BY USER ***
************************** */
function displayMine() {
    // console.log('displayMine Function Called')
    const accessToken = localStorage.getItem('SessionToken')
    fetch('http://localhost:3000/journal/mine', {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': accessToken //using accessToken since this is a protected route
        })
    })
    .then((response) => {
        return response.json()
    })
    .catch((error) => {
        console.error('Error:', error)
    })
    .then((response) => {
        console.log(response)

        let display = document.getElementById('journals')
        for (i = 0; i = display.childNodes.length; i++) {
            display.removeChild(display.firstChild) //removes elements before displaying more
        }

        if (response.length === 0) { //checking to see if the response.length is 0. If it is this means there are no posts so we will want to display something else to let the user know this.

            let display = document.getElementById('journals')
            let header = document.createElement('h5')

            display.appendChild(header)
            header.textContent = "You haven't made any posts yet!"
            header.setAttribute('class', 'noPosts')

        } else {
            for (i = 0; i < response.length; i++) {

                let display = document.getElementById('journals')
                let card = document.createElement('div')
                let body = document.createElement('div')
                let header = document.createElement('h5')
                let subtitle = document.createElement('h6')
                let para = document.createElement('p')
                let editBtn = document.createElement('button')
                let deleteBtn = document.createElement('button')

                let current = response[i]
                let title = current.title;
                let date = current.date;
                let entry = current.entry;

                display.appendChild(card)
                card.appendChild(body)
                body.appendChild(header)
                body.appendChild(subtitle)
                body.appendChild(para)
                body.appendChild(editBtn)
                body.appendChild(deleteBtn)

                card.setAttribute('id', current.id)
                card.setAttribute('class', 'card')
                body.setAttribute('class', 'card-body')
                header.setAttribute('class', 'card-title')
                subtitle.setAttribute('class', 'card-subtitle mb-2 text-muted')
                para.setAttribute('class', 'card-text')

                editBtn.setAttribute('class', 'btn btn-dark editBtn')
                editBtn.setAttribute('type', 'button')
                editBtn.setAttribute('onclick', `editJournal(${current.id})`)

                deleteBtn.setAttribute('class', 'btn btn-dark deleteBtn')
                deleteBtn.setAttribute('type', 'button')
                deleteBtn.setAttribute('onclick', `deleteJournal(${current.id})`)

                header.textContent = title
                subtitle.textContent = date
                para.textContent = entry
                editBtn.textContent = 'Edit'
                deleteBtn.textContent = 'Delete'
            }
        }
    })
}


/* *************************
    *** DISPLAY ALL ***
************************** */
function displayAll() {
    // console.log('displayAll Function Called')
    fetch('http://localhost:3000/journal/', {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then((response) => {
        return response.json()
    })
    .catch((error) => {
        console.error('Error:', error)
    })
    .then((response) => {
        console.log(response)

        let display = document.getElementById('journals')
        for (i = 0; i = display.childNodes.length; i++) {
            display.removeChild(display.firstChild) //removes elements before displaying more
        }

        if (response.length === 0) { //checking to see if the response.length is 0. If it is this means there are no posts so we will want to display something else to let the user know this.

            let display = document.getElementById('journals')
            let header = document.createElement('h5')

            display.appendChild(header)
            header.textContent = "There are not posts yet!"
            header.setAttribute('class', 'noPosts')

        } else {
            for (i = 0; i < response.length; i++) {

                let card = document.createElement('div')
                let body = document.createElement('div')
                let header = document.createElement('h5')
                let subtitle = document.createElement('h6')
                let para = document.createElement('p')
                let display = document.getElementById('journals')
                

                let current = response[i]
                let title = current.title;
                let date = current.date;
                let entry = current.entry;

                display.appendChild(card)
                card.appendChild(body)
                body.appendChild(header)
                body.appendChild(subtitle)
                body.appendChild(para)

                card.setAttribute('id', current.id)
                card.setAttribute('class', 'card')
                body.setAttribute('class', 'card-body')
                header.setAttribute('class', 'card-title')
                subtitle.setAttribute('class', 'card-subtitle mb-2 text-muted')
                para.setAttribute('class', 'card-text')

                header.textContent = title
                subtitle.textContent = date
                para.textContent = entry
            }
        }
    })
}


/* *************************
  *** DISPLAY BY TITLE ***
************************** */
function displayByTitle() {
    // console.log('displayByTitle Function Called')
    let journalTitle = document.getElementById('searchBar').value;
    console.log(journalTitle)

    fetch(`http://localhost:3000/journal/${journalTitle}`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then((response) => {
        return response.json()
    })
    .catch((error) => {
        console.error('Error:', error)
    })
    .then((response) => {
        console.log(response)

        let display = document.getElementById('journals')
        for (i = 0; i = display.childNodes.length; i++) {
            display.removeChild(display.firstChild) //removes elements before displaying more
        }

        if (response.length === 0) { //checking to see if the response.length is 0. If it is this means there are no posts so we will want to display something else to let the user know this.

            let display = document.getElementById('journals')
            let header = document.createElement('h5')

            display.appendChild(header)
            header.textContent = "There are not any posts on this topic."
            header.setAttribute('class', 'noPosts')

        } else {
            for (i = 0; i < response.length; i++) {

                let card = document.createElement('div')
                let body = document.createElement('div')
                let header = document.createElement('h5')
                let subtitle = document.createElement('h6')
                let para = document.createElement('p')
                let display = document.getElementById('journals')
                

                let current = response[i]
                let title = current.title;
                let date = current.date;
                let entry = current.entry;

                display.appendChild(card)
                card.appendChild(body)
                body.appendChild(header)
                body.appendChild(subtitle)
                body.appendChild(para)

                card.setAttribute('id', current.id)
                card.setAttribute('class', 'card')
                body.setAttribute('class', 'card-body')
                header.setAttribute('class', 'card-title')
                subtitle.setAttribute('class', 'card-subtitle mb-2 text-muted')
                para.setAttribute('class', 'card-text')

                header.textContent = title
                subtitle.textContent = date
                para.textContent = entry
            }
        }
    })
}