const app = require('./app')
const db = require('./models')

db.sequelize.sync().then((req) =>{
  app.listen(5003, () => {
    console.log('Server started on port 5003');
  });
})
