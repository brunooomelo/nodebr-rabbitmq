let amqp = require('amqplib')
let level = require('level-party')
let db = level('./db')
let helpers = require('./helpers')
amqp
  .connect('amqp://10.0.75.1:5672')
  .then(conn => {
      console.log('Conectado')
      return conn.createChannel()
  })
  .then(ch => { 
      console.log('Canal criado')
      ch.prefetch(1)
      ch.consume('banco', msg => {
        let dados = []
        db.createValueStream()
          .on('data', value => {
            dados.push(JSON.parse(value))
          })
          .on('finish', () => {
            ch.sendToQueue(msg.properties.replyTo, helpers.BuffertoJSON(data))
            ch.ack(msg)
          })
      })
  })
