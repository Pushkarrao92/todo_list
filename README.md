## Setup and Configuration

```bash
# clone repository into local machine
$ git clone git@bitbucket.org:geitpl-nodejs/lottery-application-2-0-api.git lottery_application_api

# navigate to project directory
$ cd todo_list

# create TypeORM json file using example file
$ cp example.ormconfig.json ormconfig.json

# open 'ormconfig.json' in prefered editor and replace dummy config with your local config
$ subl ormconfig.json

# create environment TypeScript file using example
$ cp src/config/example.environment.ts src/config/environment.ts

# open 'src/config/environment.ts' in prefered editor and replace dummy config with your local config
$ subl src/config/environment.ts

# create TypeORM TypeScript file using example
$ cp src/config/example.orm.config.ts src/config/orm.config.ts

# open 'src/config/orm.config.ts' in prefered editor and replace dummy config with your local config
$ subl src/config/orm.config.ts
```

## Installation

```bash
# install dependencies and packages
$ npm install

# copy all static and media file in execution directory
$ npm run build
```

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```
