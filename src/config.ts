import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    pg: {
      dbName: process.env.PG_DATABASE,
      port: parseInt(process.env.PG_PORT, 10),
      password: '0510002n',
      user: process.env.PG_USERNAME,
      host: process.env.PG_HOST,
      dropSchema: false,
      synchronize: process.env.SYNCHRONIZE === 'false' ? false : true,
      autoLoadEntities: true,
      extra: { trustServerCertificate: true },
    },
  };
});
