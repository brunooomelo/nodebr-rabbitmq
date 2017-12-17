let amqp = require('amqplib')
let level = require('level-party')
let uuid = require('uuid')
let db = level('./db')
amqp
  .connect('amqp://10.0.75.1:5672')
  .then(conn => {
      console.log('Conectado')
      return conn.createChannel()
  })
  .then(ch => { 
      console.log('Canal criado')
      ch.prefetch(1)
      ch.consume('mensagens', msg => {
        db.put(uuid.v4(), msg.content.toString(), err => {
          if (err) {
            console.err(err.stack)
            return ch.nack(msg)
          }
          console.log('Mensagem gravada!')
          ch.ack(msg)
        })
      })
  })
