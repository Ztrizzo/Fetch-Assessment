const server = require('./server');

const PORT = process.env.PORT || 8080;


const init = async () => {
  server.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

init();