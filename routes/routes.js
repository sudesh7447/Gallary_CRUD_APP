const express = require("express");
const router = express.Router();
const User = require("../models/users");
router.post("/add", (req, res) => {
  const user = new User({
    name: req.body.Title,
    url: req.body.URL,
    details: req.body.Details,
  });
  user.save();
  res.redirect("/");
  

});
router.get("/", (req, res) => {
 User.find().exec((err,users)=>{
   if(err){
     res.json({message:err.message});
   }
   else{
     res.render("index", {
       title: "Home Page" , 
       users : users
     })
   }
 })
});
router.get("/add", (req, res) => {
  res.render("add_users", { title: "ADD PHOTO" });
});

//  edit an photo

router.get("/edit/:id" , (req,res)=>{
  let id =  req.params.id;
  User.findById(id , (err, user)=>{
    if(err){
      res.redirect("/");
    }
    else{
      if(user==null){
        res.redirect("/");
      }
      else{
        res.render("edit_users" , {
          title: "edit user" , user:user
        })
      }
    }
  })

})


//  update post 
router.post("/update/:id" , (req,res)=>{
  let id = req.params.id;
  User.findByIdAndUpdate(id , {
    name: req.body.Title,
    url: req.body.URL,
    details: req.body.Details,
  } , (err, result)=>{
    if(err){
      res.send({message: err.message, type:'danger' })
    }
    else{
      req.session.message = {
        type: 'success' , message: "User updated successfully"
      };
      res.redirect("/");
    }
  }    
  )
})

//  Delete user route

router.get("/delete/:id" , (req,res)=>{
  let id =  req.params.id ;
  User.findByIdAndRemove(id , (err,result)=>{
    // if(err){
    //   res.json({message:err.message});
    // }
    // else{
    //   res.session.message = {
    //     type:'info' , message: "user deleted successfully"
    //   }
    // }
    res.redirect("/");
  })
})

module.exports = router;
