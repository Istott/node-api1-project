const express = require('express');

const server = express();

server.use(express.json());

let users = [
    {
        id: "1",
        name: "Bobby Joe",
        bio: "The man on the run",
    },
    {
        id: "2",
        name: "Jane Foster",
        bio: "Im foster than you",
    }
    
]

server.post('/api/users', (req, res) => {
    const user = req.body;

    users.push(user);

    if(users !== user) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
    } else {
        res.status(201).json(users);
    }    

    // res.statusMessage(500).json({errorMessage: "There was an error while saving the user to the database."});

})

server.get('/api/users', (req, res) => {
    if(!users) {
        res.statusMessage(500).json({errorMessage: "The users information could not be retrieved."})
    } else {
        res.status(200).json(users)
    }
});

server.get('/api/users/:id', (req, res) => {
    res.status(200).json(users.id); 

    if(!user) {
        res.status(404).json({errorMessage: "the user with the specified Id does not exist."});
    } else {
        res.status(500).json({errorMessage: "the user information could not be retrieved."});
    }
    

});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    users = users.filter(u => u.id !== Number(id));

    res.status(200).json(users);

    if(!user) {
        res.status(404).json({errorMessage: "the user with the specified Id does not exist."});
    } else {
        res.status(500).json({errorMessage: "the user could not be removed."});
    }
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;

    users = users.map(user => {
        if(user.id === id){
            return id
        } else {
            return user
        }
    })



})

const port = 5000;

server.listen(port, () => console.log(`\n == API on port ${port} == \n`));