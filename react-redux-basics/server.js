let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
var createHash = require('create-hash');
const PORT = 3001;

let app = express();

let config = {
    user:'postgres',
    database:'reactRedux',
    password:'admin',
    host:'localhost',
    max:10,
    port: 5432
}

let pool = new pg.Pool(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(morgan('dev'));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/signup', function(req, res) {

    var hash = createHash('sha224');
    hash.update(req.body.password);
    var encPass = hash.digest('hex');
    console.log(encPass);

    let values = [req.body.name, req.body.email, encPass];

    res.writeHead(200,{"Content-type":"text/plain"});
    pool.query('select * from public."user" where name = $1', [req.body.name])
    .then(table => {
        if(table.rowCount > 0)
        {
            res.write(JSON.stringify({type : 'EXISTING_USER'}));
            res.end();
            return console.log("Existing User Error");
        }
        pool.query('Insert into public."user" (name, email, password) values ($1, $2, $3)',[...values], (err, table) => {
            if (err) {
                return console.log(err)
            }
            else {
                console.log('User Registered');
                res.write(JSON.stringify({type : 'USER_REGISTERED'}));
                res.end();
            }
        })
    })
})

app.post('/login', function(req, res) {

    res.writeHead(200,{"Content-type":"text/plain"});

    var hash = createHash('sha224');
    hash.update(req.body.password);
    var encPass = hash.digest('hex');
    let values = [req.body.name, encPass];
    console.log(values);

    pool.query('select * from public."user" where name = $1 and  password =$2', [...values])
    .then(table => {
        if(table.rowCount > 0)
        {
            res.write(JSON.stringify({type : 'VALID_USER'}));
            res.end();
            return console.log("logged user valid");
        }
        res.write(JSON.stringify({type : 'INVALID_USER'}));
        res.end();
        return console.log("logged user invalid");
    })
})

app.listen(PORT,() => console.log('Listening on port' + PORT));