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

    if(!user.name || !user.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
    } else {
        try {
            users.push(user);
            res.status(201).json(use);
        }
         catch (err) {
            res.status(500).json({errorMessage: "There was an error while saving the user to the database."});
        } 
    }

})

server.get('/api/users', (req, res) => {
    if(!users) {
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    } else {
        res.status(200).json(users)
    }
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    const find = users.find(user => user.id === id)

    if(!id) {
        res.status(404).json({errorMessage: "the user with the specified Id does not exist."});
    } else {
        try {
            res.status(200).json(find); 
        }
         catch (err) {
            res.statusMessage(500).json({errorMessage: "There was an error while saving the user to the database."});
        } 
    }
});

server.delete('/api/users/:id', function(req, res) {
    const id = req.params.id;

    users = users.filter(u => u.id !== id);

    if(!id) {
        res.status(404).json({errorMessage: "the user with the specified Id does not exist."});
    } else {
        try {
            res.status(200).json(users); 
        }
         catch (err) {
            res.status(500).json({errorMessage: "the user could not be removed."});
        } 
    }
})

server.patch('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const edits = req.body;
    const editedUser = {
        ...users.find((user) => user.id === id),
        ...edits,
    }

    users = users.map(user => {
        return user.id === id ? editedUser : user;
    })

    if(!id) {
        res.status(404).json({errorMessage: "the user with the specified Id does not exist."});
    } else if(!editedUser.name || !editedUser.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
    } else {
        try {
            res.status(200).json(users); 
        }
         catch (err) {
            res.status(500).json({errorMessage: "the user information could not be modified."});
        } 
    }
})

const port = 5000;

server.listen(port, () => console.log(`\n == API on port ${port} == \n`));