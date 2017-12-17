let amqp = require('amqplib')
let http = require('http')

amqp
  .connect('amqp://10.0.75.1:5672')
  .then( conn => {
    http.Server((req, res) => {
      let channel = null
      conn.createChannel()
        .then( ch => {
          channel = ch
          return ch.assertQueue('', {
            exclusive: true
          })
        })
        .then( q => {
          console.log('Fila criada para requisição: %s', q.queue)
          channel.consume(q.queue, ( msg ) => {
            res.writeHead('200', {
              'Content-Type': 'application/json'
            })
            res.end(msg.content)
          }, {
            noAck: true
          })
          channel.sendToQueue('banco', new Buffer(''), {
            replyTo: q.queue
          })
        })
    })
    .listen(3000)
  })
