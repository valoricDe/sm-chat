# SM-Chat

This project runs with a dockerised postgres database, PostGraphQL and node.

Please run the following commands in Terminal 1:
```
npm install -g postgraphile
npm install

```

After that copy the provided db-data.zip into the project root folder and unzip it.
Then you can start the docker postgres database in a terminal with:
```
docker-compose up
```
Info: It could be needed that you stop and restart the 

In another terminal you can then start the PostGraqlQL-Server with:
```
./postgraphileStart
```

To generate the graphql queries and start the app you enter:
```
npm run relay
npm run start
```

You should be then able to access the chat when opening <http://localhost:3000> in your browser.


############################################################

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
Please look at the [Create React App Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) for general help.
