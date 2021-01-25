/* *************************
    *** POST JOURNAL ***
************************** */
function postJournal() {
//  console.log('postJournal Function Called')
    let title = document.getElementById('title').value
    let date = document.getElementById('date').value
    let entry = document.getElementById('entry').value
    const accessToken = localStorage.getItem('SessionToken') //The variable accessToken is set up to store the SessionToken in local storage
    let newEntry = { journal: { title: title, date: date, entry: entry } }

    fetch('http://localhost:3000/journal/create', { //utilizing URL set up on server-side (journal/create route)
        method: 'POST', //route is POST so method needs to match that
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': accessToken //journal/create subroute is a protected route with validateSession
            //token is required in order to access this route
        }),
        body: JSON.stringify(newEntry)
    })
    .then(response => {
        console.log(response.json())
        displayMine()
    })
    .catch((err) => {
        console.log(err);
    })
}


/* *************************
    *** UPDATE JOURNAL ***
************************** */
function editJournal(postId) { // inside the displayMine() function where edit btn is created and the -
    //editJournal() function is called, we are passing this function the current.id argument to utilize this id later -
    //in this function
//  console.log('editJournal Function Called')
    console.log(postId)
    const fetch_url = `http://localhost:3000/journal/update/${postId}` //using postId parameter inside URL -
    //since this endpoint utilizes a variable to append the id of the journal entry we want to update.
    const accessToken = localStorage.getItem('SessionToken')

    let card = document.getElementById(postId) //postId being utilized to get the id assigned to each specific -
    //card for each post.
    let input = document.createElement('input')

    /* 
    Below we are checking to see how many child nodes the card currently contains. If it has less than 2 we want to create an additional one which will be an input field used for editing. If it has 2 or more this means the input field already exists and that we are in "edit mode" so we wouldn't want to create it again.
    */
    if (card.childNodes.length < 2) {
        card.appendChild(input)
        input.setAttribute('type', 'text')
        input.setAttribute('id', 'updatedEntry')
        input.setAttribute('placeholder', 'Edit your journal entry')
    } else {

        let updated = document.getElementById('updatedEntry').value
        let updatedEntry = { journal: { entry: updated } }; //storing the updatedEntry information
        //This is all we need to add since the only thing we are updating is the entry
        const response = fetch(fetch_url, { //starting fetch method for updated endpoint (journal/update endpoint stored -
            //in fetch_url variable
            method: 'PUT', //'PUT' method because it matches the method used on the backend
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken //sending token through since this is a protected route
                //token is needed to verify user is logged in
            },
            body: JSON.stringify(updatedEntry) //passing updatedEntry to access specific post
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log((data))
            displayMine();
        })

        card.removeChild(card.lastChild) //removing input from the card so it's no longer displayed once updated
    }
}


/* *************************
    *** DELETE JOURNAL ***
************************** */
function deleteJournal(postId) {
//  console.log('deleteJournal Function Called')
    console.log('deleteJournal working')
    console.log(postId)

    const fetch_url = `http://localhost:3000/journal/delete/${postId}`
    const accessToken = localStorage.getItem('SessionToken')

    fetch(fetch_url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
    .then(response => {
        console.log(response);
        displayMine() //displayMine() function will fire and display remaining posts for current user
    })
}