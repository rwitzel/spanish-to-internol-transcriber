# Spanish-to-Interñol Transcriber

Transcribes Spanish texts to Interñol in the browser (offline use possible).

## How to run the frontend?

As the project is in a branch with name `gh-pages`, its contents are automatically
served via [Github Pages](https://rwitzel.github.io/spanish-to-internol-transcriber/frontend/),
i.e. a local web server is needed only for testing local changes.

A local webserver can be started via [docker-compose](https://docs.docker.com/compose/install/):

    docker-compose up
    open http://127.0.0.1:8081

# Operations

## Running tests

```commandline
npm i jest --save-dev
npm i jest-cli -g
jest
```   
   
