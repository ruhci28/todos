require('dotenv').config();
var createError = require('http-errors');
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
var session = require('express-session');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:false
}));
// passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// connection with the database
mongoose.connect(process.env.MONGOATLASURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

mongoose.set("useCreateIndex",true);
//  schema for todo item it has two field title and category
const todoSchema =new mongoose.Schema({
  title:{
    type:String,
    required:[true,"Please Enter a todo "]
  },
  category:{
    type:String,
    required:[true,"Please Select a Category"]
  }

});
const Todo = mongoose.model("Todo", todoSchema);
// schema for users
const userSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:true,
    required:true
  },
  password:{
    type:String
    // required:true
  },
  tasks: [{
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Todo'
 }]
});
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// post request for signing up the new user
app.post("/SignUp",function(req,res){
  let login = false;
  User.register({username:req.body.username},req.body.password,function(err,user){
    if(err){
      console.log(err);
      res.send("OOPS Registration Failed . Try Again Later !!!");
    }else{
      passport.authenticate("local")(req,res,function(){
        login = true;
        res.send(req.user._id);
      })
    }
  })
});
//  post request for login the user passport will authenticate if
// the username and password are correct and then only opens todo page
app.post("/login",function(req,res){
const user = new User({
  username:req.body.username,
  password:req.body.password
});
let login = false;
req.login(user,function(err){
  if(err){
    console.log(err);
  }else{
    passport.authenticate("local")(req,res,function(){
      // console.log(req.user);
      login = true;
      res.send(req.user._id);
    })
  }
})

});
// logout request after that user have to login again to use the web app.
app.get("/logout",function(req,res){
  let login = false;
  req.logout();
  login = true;
  res.send(true);
});
// through this route task to the particular user are send to the frontend . and
app.route("/user/:userId")
  .get(function(req, res) {
    User.findOne({
        _id: req.params.userId
      },
      function(err, foundUser) {
        if (err) {
          res.send(err);
        } else {
          if(foundUser.tasks){
            res.send(foundUser.tasks);
          }else{
            res.send([]);
          }

        }
      });
  })
  .post(function(req, res) {
    User.findOne({
        _id: req.params.userId
      },
      function(err, foundUser) {
        if (err) {
          res.send(err);
        } else {
          User.updateOne({
            _id: foundUser._id
          }, {

            $push: {
              tasks: req.body.task
            }
          }, function(err) {
            if (!err) {
              res.send("Succesfully updated the user");
            } else {
              res.send(err);
            }
          })

        }
      });
  });


// route for getting all tasks and adding new task to the list
app.route("/tasks")
  .get(function(req, res) {
  Todo.find(function(err, foundItem) {
      if (!err) {
        res.send(JSON.stringify(foundItem));
      } else {
        res.send(err);
      }
    })
  })
  .post(function(req, res) {
    const newTask = new Todo({
      title: req.body.title,
      category:req.body.category
    });
    newTask.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send(newTask._id);
      }
    });
  });
  // routes for updating the specific task
  app.route('/tasks/:taskId')
     .patch(function(req,res) {
       console.log(req.body);
       Todo.updateOne({_id:req.params.taskId},{title: req.body.title},function(err) {
         if (!err) {
           res.send("Succesfully updated the article");
         } else {
           res.send(err);
         }
       });
     });
  // route for deleting specific task from the users task list and getting the specific task from the users task arrray.
  app.route("/user/:userId/:taskId")
    .get(function(req, res) {
          const newid = {id:req.params.taskId};
          Todo.find({
              _id : newid.id
            },
            function(err, foundItem) {
              if (err) {
                res.send(err);
              } else {
              const jsonObject = JSON.stringify(foundItem);
                res.send(jsonObject);
              }
            });
    })
    .delete(function(req, res) {
      Todo.deleteOne({
          _id: req.params.taskId
        },
        function(err) {
          if (!err) {

            res.send("Sucesfully deleted the specific Note");
          } else {
            res.send(err)
          }
        });
      User.findOne({
          _id: req.params.userId
        },
        function(err, foundUser) {
          if (err) {
            res.send(err);
          } else {
            User.updateOne({
                _id: req.params.userId
              }, {
                $pull: {
                  tasks: req.params.taskId
                }
              }, function(err) {
                if (err) {
                } else {
                }
              }
            );
          }
        }
      );
    })
    .put(function(req,res) {
      Todo.findOneAndUpdate({ _id:req.params.taskId},req.body,function(err){
        if(!err) {
          res.send('updated Succesfully');
        }else {
          res.send('something went wrong');
        }
      });
    });
    // in production mode use the port assign by the heroku and in development use port 9000
    app.use(morgan('tiny'));
    let port = process.env.PORT;
    if(port == null || port=="" ){
      port = 9000;
    }
    // frontend under production mode
    if(process.env.NODE_ENV === 'production'){
      app.use(express.static('todo/build'));
      app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname,'todo/build/index.html'));
      });
    }
app.listen(port,function(){
  console.log('server has started Sucesfully');
});
