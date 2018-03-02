# Elm Feature Switch API

A simple Express.js app that serves simplified versions of Kinja feature switches for the elm presentation.

## Serve locally:

```
npm start
```

## Routes

### GET `/features`:

    returns an array of feature switches formatted for the app.

### POST `/features`:

    Adds whatever you send as a payload to a local cache of feature switches.  Is used to "add" a fs in the demonstration.
