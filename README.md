# Home Work 4

- npm install
- npm run start-watch
- npm run lint

## Data Base
Link [https://api.elephantsql.com/console/9b04069b-1108-4ebf-9659-7acce0d35e36/browser]

Please let me know in case you have access issue.

## Sequelize-cli commands

Check connection status:  
`npx sequelize-cli db:migrate:status --url <url-string>`  

Generate migration files:  
`npx sequelize-cli migration:generate --name create_user`  
`npx sequelize-cli migration:generate --name create_group`  
`npx sequelize-cli migration:generate --name create_usergroup`  

Do/Undo migrations:  
`npx sequelize-cli db:migrate --url <url-string>`  
`npx sequelize-cli db:migrate:undo --url <url-string>`  

Generate seed files:  
`npx sequelize-cli seed:generate --name add-users`  
`npx sequelize-cli seed:generate --name add-groups`  

Do/Undo seeders:  
`npx sequelize-cli db:seed --url <url-string> --seed 20210515085325-add-users.js`  
`npx sequelize-cli db:seed:undo --url <url-string> --seed 20210515085325-add-users.js`  

`npx sequelize-cli db:seed --url <url-string> --seed 20210515092946-add-groups.js`  
`npx sequelize-cli db:seed:undo --url <url-string> --seed 20210515092946-add-groups.js`  
