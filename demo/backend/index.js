const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });
const path = require('path');
const server = require('fastify')({
  logger: process.env.ENV === 'live' ? false : (process.env.ENV === 'test' ? true : true)
})

server
  .register(require('fastify-static'), { root: path.join(__dirname, '..', 'frontend\/public') })
  .register(require('fastify-cors'), {})
  .register(require('./src/config/database'))

server.get('/', async (request, reply) => {
  try {
    reply.sendFile('index.html');
  }
  catch (e) {
    reply.code(500).send({ error: 'error' });
  }
});

server.get('/getBpm', async (request, reply) => {
  try {
    reply.send({ bpm: 120 });
  }
  catch (e) {
    reply.code(500).send({ error: 'error' });
  }
});

server.get('/getKey', async (request, reply) => {
  try {
    reply.send({
      key: 'C5 Ionian',
      mode: 'C5 Ionian'
    });
  }
  catch (e) {
    reply.code(500).send({ error: 'error' });
  }
});

server.get('/getKit', async (request, reply) => {
  try {
    reply.send([{
      soundLinks: [
        {
          link: '/sounds?type=snare',
          drumType: 'snare'
        },
        {
          link: '/sounds?type=kick',
          drumType: 'kick'
        },
        {
          link: '/sounds?type=hihat',
          drumType: 'hihat'
        },
        {
          link: '/sounds?type=hihat1',
          drumType: 'hihat1'
        },
        {
          link: '/sounds?type=hihat2',
          drumType: 'hihat2'
        },
        {
          link: '/sounds?type=ride',
          drumType: 'ride'
        },
        {
          link: '/sounds?type=ride1',
          drumType: 'ride1'
        },
      ]
    }]);
  }
  catch (e) {
    reply.code(500).send({ error: 'error' });
  }
});

server.get('/getKitNames', async (request, reply) => {
  try {
    reply.send([{
      name: 'tight',
      type: 'acoustic'
    }])
  }
  catch (e) {
    reply.code(500).send({ error: 'error' });
  }
})

server.get('/sounds', async (request, reply) => {
  try {
    reply.sendFile(`${request.query.type}.mp3`, path.join(__dirname, '..', 'frontend\/public\/sounds'))
  }
  catch (e) {
    reply.code(500).send({ error: 'error' });
  }
});

const start = async () => {
  try {
    //await encoder();
    await server.listen(9001);
  } catch (err) {
    server.log.error(err)
    process.exit(1);
  }
}

start();