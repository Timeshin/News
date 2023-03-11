# News

#### App --> https://timeshin.github.io/News/

## Work with project

### Install dependencies

`npm install`

### Start project in dev

`npm run start:dev`

### Start project in prod

```
  npm run build
  npm run start:prod
```

## Docker

### Run app in docker. DEV

`docker-compose -f docker-compose.dev.yaml up`

### Run app in docker. PROD

`docker-compose -f docker-compose.prod.yaml up`

## Commits

### Before commits

`npm run prepare`

### Architecture

#### Directories


    ├── src
       ├── components           # general reusable components which doesn't have much logic
       ├── modules              # pages parts that contain any difficult logic. Own store, have api requests, consists of other components
         ├── Story              # module
           ├── services         # module api requests
           ├── components       # module components
           ├── index.ts         # public api. All what you need to import outside (store, module)
       ├── config               # any configuration (preflight config, request config)
       ├── hooks                # custom hooks
       ├── pages                # app pages which doesn't have any logic, just collect components
       ├── styles               # global styles, styles configs etc.
       ├── types                # general types

### Deploy

```
  npm run predeploy
  npm run deploy
```