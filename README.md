# Tateyoko Sample

This repository is for web awards for horizontal and vertical writings.

http://tategaki.github.io/awards/

# Install

```
$ docker run --name tateyoko-mongo -d mongo
$ docker run -it --link tateyoko:tateyoko-mongo --rm tateyoko-mongo sh -c 'exec mongo "$MONGO_PORT_27017_TCP_ADDR:$MONGO_PORT_27017_TCP_PORT/tateyoko"'
$ npm i
$ npm start
```

# License

MIT