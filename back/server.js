const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const multer = require('multer')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/upload')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => 
{
    if (!req.body)
    {
        console.log(500)
        console.log("error happened during")
        return res.status(500).send({isError: true, msg: "error happened during parsing the request"})
    }
    if (!req.body.username)
    {
        console.log(400)
        console.log("please enter a username")
        return res.status(400).send({isError: true, msg: "please enter a valid username"})
    }
    if (!req.body.password)
    {
        console.log(400)
        console.log("please enter a password")
        return res.status(400).send({isError: true, msg: "please enter a valid password"})
    }

    let username = req.body.username
    if (username.length < 8)
    {
        console.log(400)
        console.log("please enter username long")
        return res.status(400).send({isError: true, msg: "please enter an username longer than 8 caracters"})
    }
    let password = req.body.password
    if (password.length < 8)
    {
        console.log(400)
        console.log("please enter password long")
        return res.status(400).send({isError: true, msg: "please enter an password longer than 8 caracters"})
    }
    console.log(200)
    console.log("logged in successfully")
    res.cookie('token', "123");
    return res.status(200).send({isError: false, msg: "logged in successfully", data: {"token": "123"}})
})

app.post('/file-upload', upload.single('file'),(req, res) =>
{
    console.log(req.file)
    res.status(201).send({isError: false, msg: "file uploaded succesfully"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})