const fs = require("fs");
const express = require("express");//exprss if for running a server

const app = express();// just a defindition
const port = 3000; //define the port to run on. 3000 is a standard devlopment/testing port
app.listen (port, function(){
    console.log("server is running on port" + port);
});
app.set("view engine","ejs");

var User = { //object User
    username: "",
    password: ""
};
var Users = [User, User]; //array Users, only 2 users at initalization
Users[0] = {username: "unclaimed", password: ""};//should use undefined instead of this
Users[1] = {username: "user1", password: "123"};
Users[2] = {username: "user2", password: "123"};

var Task = { //object Task
    _id: "",
    name: "",
    owner: User,
    creator: User,
    done: false,
    cleared: false
};
var Tasks = [Task, Task, Task, Task, Task];//array Tasks, 5 tasks at initalization
Tasks[0] = {_id: "0", name: "Unclaimed task", owner: undefined, creator: Users[1], done: false, cleared: false};
Tasks[1] = {_id: "1", name: "claimed by user1 and unfinished", owner: Users[1], creator: Users[1], done: false, cleared: false};
Tasks[2] = {_id: "2", name: "claimed by user2 and unfinished", owner: Users[2], creator: Users[1], done: false, cleared: false};
Tasks[3] = {_id: "3", name: "claimed by user1 and finished", owner: Users[1], creator: Users[1], done: true, cleared: false};
Tasks[4] = {_id: "4", name: "claimed by user2 and finished", owner: Users[2], creator: Users[1], done: true, cleared: false};


//store users
fs.writeFileSync(__dirname + "/users.json", JSON.stringify(Users), "utf8", 
function(err){
    if (err){
        console.log(err);
        return;
    }
});

//store tasks
fs.writeFileSync(__dirname + "/tasks.json", JSON.stringify(Tasks), "utf8", 
function(err){
    if (err){
        console.log(err);
        return;
    }
});

    
var storedUsers = new Object();
var storedTasks = new Object();
var myUsers = new Object();
var tester = "testing";


app.get("/", function(req,res){
    res.render("login");
});
app.get("/index", function(req,res){
    fs.readFile('users.json', 'utf8', function(err, data){ 
        storedUsers = JSON.parse(data); 
    }); 
    fs.readFile('tasks.json', 'utf8', function(err, data){ 
        storedTasks = JSON.parse(data); 
        res.render("index", {storedTasks: storedTasks, storedUsers: storedUsers, tester: tester, myUsers: myUsers});
    }); 
});


app.get("/login", function(req,res){
        res.render("login");
});
    
app.get("/test.ejs", function(req,res){
    fs.readFile('users.json', 'utf8', function(err, data){ 
        myUsers = JSON.parse(data); 
        res.render("test", {storedTasks: storedTasks, storedUsers: storedUsers, tester: tester, myUsers: myUsers});
    }); 
});


/*fs.readFile('users.json', 'utf8', function(err, data){ 
    storedUsers = data; 
    PrintUsers(JSON.parse(data)); //asyncronus function has to be called only after the readFile is done   
}); 
fs.readFile('tasks.json', 'utf8', function(err, data){ 
    storedTasks = data; 
}); 

function PrintUsers(myUsers){
    for (var i=0; i< myUsers.length; i++){
    console.log(myUsers[i].username);
    }
};*/
