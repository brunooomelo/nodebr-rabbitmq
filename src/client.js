let amqp = require('amqplib')

amqp
  .connect('amqp://10.0.75.1:5672')
  .then(conn => {
      console.log('Conectado')
      return conn.createChannel()
  })
  .then(ch => { 
    console.log('Canal criado')
    setInterval(() =>{
      console.log('enviado')
      ch.sendToQueue('mensagens', new Buffer('Hello World'))
      ch.ack(msg)
    }, 2000)
  })
