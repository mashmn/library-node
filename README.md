# library-node
Library app using Node.js

# Pull this git from this url
https://github.com/mashmn/library-node.git

# Create a 
## Create a "config.js" file and add the database configuration.
In this case, I have used Azure SQL server.

```
const config = {
     user: 'user',
     password: 'password123',
     server: 'library.database.windows.net',
     database: 'Library',
     options: {
         encrypt: true
     }
 }
module.exports = config;
```

