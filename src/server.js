const express=require('express');
const app=express();
const path=require('path');
const hbs=require('hbs');
const port=process.env.PORT || 3000;

let initial_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partial_path=path.join(__dirname,"../templates/partials");

app.set('view engine','hbs');
app.set('views',template_path);
hbs.registerPartials(partial_path);

app.use(express.static(initial_path));

app.get('/',(req,res) => {
   // res.sendFile(path.join(initial_path,"index.html"));
   res.render('index');
})
app.get('/home',(req,res) => {
   // res.sendFile(path.join(initial_path,"home.html"));
   res.render('home');
})
app.get('/about',(req,res) => {
   // res.sendFile(path.join(initial_path,"home.html"));
   res.render('about');
})
app.get('/:id',(req,res) => {
   // res.sendFile(path.join(initial_path,"about.html"));
   res.render('about');
})
app.get('*',(req,res)=>{
      res.render('404error',{
          errorMsg:'Oops! page not found'
      });
})


app.listen(port,() =>{
    console.log(`listening on port at ${port}.....`);
})