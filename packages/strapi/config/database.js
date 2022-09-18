const path = require('path');



module.exports = ({ env }) => {

  const dbPath=env('DATABASE_FILENAME', '.tmp/data.db');

  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: dbPath[0]==='/'?dbPath: path.join(__dirname, '..', dbPath),
      },
      useNullAsDefault: true,
    },
  };
}
