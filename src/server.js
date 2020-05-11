const express = require('express')
const hbs = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000

app.engine('hbs',hbs({
    defaultLayout:'home'
}))
app.set('view engine','hbs')

app.use(express.urlencoded({
    extended:false
}))




app.listen(port,()=>console.log(`APP funcionado en http://localhost:${port}`))