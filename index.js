const express=require("express");
const app=express();
let port=8080;
const path=require("path");
const {v4 : uuidv4 } = require("uuid");
uuidv4();
const methodOverride = require('method-override')
app.use(methodOverride('X-HTTP-Method-Override'))

app.use(express.urlencoded ({extended: true}))
app.use(methodOverride('_method'))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {   
        id: uuidv4(),
        username:"Shraddha",
        content:"I love coding"
    },
    {
        id: uuidv4(),
        username:"Arpit",
        content:"I am learning webD" 
    },
    {
        id: uuidv4(),
        username:"Grivann",
        content:"I am Grivann"
    },
];

app.get("/post", (req,res) =>{
    res.render("index.ejs", {posts})
} )

app.get("/post/new", (req,res) =>{
    res.render("new.ejs")
} )

app.post("/post", (req,res) =>{
    let {username,content}= req.body;
    const id= uuidv4();
    posts.push({id, username, content});
    res.redirect("/post");
} )

app.get("/post/:id", (req,res) =>{
    let {id}= req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs", {post})
})

app.patch("/post/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/post");
});


app.get("/post/:id/edit", (req,res) =>{
    let {id}= req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post})
})

app.delete("/post/:id", (req,res) =>{
    let {id}= req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/post");
})

app.listen(port, () =>{
    console.log("Port is listening")
})