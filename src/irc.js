let irc = require('irc')
let amqp = require('amqplib')
let helpers = require('./helpers')

let client = new irc.Client('webchat.freenode.net','rabbitnode', {
  channels: ['#ytnodebr']
})
amqp
  .connect('amqp://10.0.75.1:5672')
  .then(conn => {
    console.log('RabbitMQ conectado!')
    return conn.createChannel()
  })
  .then(ch => {
    client.addListener('message', (from, to, message) => {
      let buff = helpers.JSONtoBuffer({
        from,
        to,
        message
      })
      ch.sendToQueue('mensagens', buff)
    })
  })
