const express = require('express')
const db = require('./utils/db')

const CategoryRoute = require('./routes/category')
const CategoryUserRoute = require('./routes/categoryUser')
const CommentRoute = require('./routes/comment')
const LikeRoute = require('./routes/like')
const PostRoute = require('./routes/post')
const UserRoute = require('./routes/user')

const app = express()

db.authenticate().then(() => console.log("Auth berhasil"))

app.use("/semeru/townwatch/images", express.static('images'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(multer().array())

app.use('/semeru/townwatch/post', CategoryRoute)
app.use('/semeru/townwatch/post', CommentRoute)
app.use('/semeru/townwatch/post', LikeRoute)
app.use('/semeru/townwatch/post', PostRoute)
app.use('/semeru/townwatch/user', CategoryUserRoute, UserRoute)
app.use('/semeru/townwatch/user', UserRoute)

app.get('/semeru', (req, res) => {
    res.send("<h1> API SemeruTown Watch </h1>")
})

app.listen(3000, () => {
    console.log("Listening to 3000")
})
