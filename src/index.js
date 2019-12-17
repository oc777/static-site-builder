/**
 * Required External Modules
 */
const express = require("express")
const path = require("path")
const hbs = require('express-hbs')
const less = require('express-less')


const app = express()
const port = process.env.PORT || "8000"

// Setup less-css convertion
app.use('/less-css', less(__dirname + '/less'))

// Setup view engine.
app.engine('hbs', hbs.express4({
    defaultLayout: path.resolve('src', 'views', 'layouts', 'default'),
    partialsDir: path.resolve('src', 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', path.resolve('src', 'views'))

app.get("/", (req, res) => {
    res.status(200).render(path.resolve('src/views/pages/index'))
})


app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`)
})
