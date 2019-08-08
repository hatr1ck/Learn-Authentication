let bcrypt = require('bcryptjs'); 
let express = require('express'); 
let app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let password2  = req.body.password2;

  if (!username || !password || !password2) {
    return res.send('Please fill in all fields.');
  }

  if (password !== password2) {
    return res.send('Passwords do not match.');
  }

    bcrypt.hash(password, 10, (error, hash) => {
      if (error) return console.log(error);

      res.send("You're signed in. <br /> username: " + username + "<br /> password: " + password + "<br /> hashed password: "+hash);
    });
});

app.listen(8080, ()=> {
  console.log('Your app is listening on port 8080');
});