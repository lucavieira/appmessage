const express = require('express') // Criação do servidor
const mongoose = require('mongoose') // Banco de dados para armazenamento
const handlebars = require('express-handlebars') // Template para o front
// const database = require('./config/database') // Configurações do banco de dados
const body_parser = require('body-parser') // Pegar os valores do formulario
const path = require('path')
const session = require('express-session') // Armazena os dados da sessão no servidor, salva apenas o ID no cookie.
const flash = require('connect-flash') // Cria as mensagens e mostra na tela apenas por um breve momento 
require('./models/User')
const Message = mongoose.model('users')
const app = express()

const messages = require('./routes/user') // Rotas

app.use('/favicon.ico', express.static(__dirname + 'public/images/favicon.ico'));

// Session
app.use(session({
  secret: 'message_app',
  resave: true,
  saveUninitialized: true
}))

app.use(flash())
//Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

// Body parser
app.use(body_parser.urlencoded({extended: true}))
app.use(body_parser.json())

// Handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Conexão com o banco de dados
mongoose.connect(process.env.mongoURI).then(() => {
  console.log('Success')
}).catch(error => {
  console.log('Failed' + error)
})

// Public
app.use(express.static(path.join(__dirname, 'public')))

// Rotas
app.get('/', (req, res) => {
  Message.find().lean().then(messages => {
      res.render('index', {messages: messages})
  }).catch(error => {
    res.redirect('/')
  })
})

app.use('/messages', messages)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log('Server is running...')
})