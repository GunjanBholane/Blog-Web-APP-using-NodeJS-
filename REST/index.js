const path = require("path");
const express=require("express");
const app=express();
const port=8080;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});
let posts=[
    {
    id:uuidv4(),
    username: "techie_tanya",
    post: "Built my first robot today—it waved at me like we’ve always been friends! 🤖❤️\nSTEM magic is real, folks."
  },
  {
     id:uuidv4(),
    username: "foodie_friday",
    post: "Dipped samosas in mango chutney and unlocked a new level of happiness. 🥭🔥\nIf you're not experimenting, you're missing out."
  },
  {
     id:uuidv4(),
    username: "solo_soham",
    post: "Rode through foggy hills with music blasting—felt like a scene from my own movie. 🎬🏍️\nSolitude looks pretty cool sometimes."
  },
  {
     id:uuidv4(),
    username: "green_thumb_gia",
    post: "Planted lavender and basil this morning—the balcony smells divine! 🌿🌸\nNature’s perfume beats anything in a bottle."
  }
]


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
    });
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
    });
app.post("/posts",(req,res)=>{
    let {username,post}=req.body;
    let id=uuidv4();
        posts.push({id,username,post});

    if (!post) {
    // Avoid rendering show.ejs with undefined post
    return res.status(404).send("Post not found");
  }
    res.redirect("/posts");
    });


app.get("/posts/:id",(req,res)=>{
  let {id}=req.params;
  let post=posts.find((p)=>id===p.id);
  console.log(post);
  res.render("show.ejs" ,{ post });
});
//write this in last

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => p.id === id);
  if (!post) return res.status(404).send("Post not found");
  post.post = newContent; // ← important: update the correct field
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  if (!post) return res.status(404).send("Post not found");
  res.render("edit.ejs", { post });
});
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => p.id !== id); // Remove the post
  res.redirect("/posts");
});

