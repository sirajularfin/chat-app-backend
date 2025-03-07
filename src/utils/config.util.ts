import { config } from 'dotenv';

const ENVIRONMENT_PATH = './.env.dev';
interface AppConfig {
  port: string;
  databaseUrl: string;
}

export const loadConfig = async (): Promise<AppConfig> => {
  config({ path: ENVIRONMENT_PATH });
  const port = process.env.PORT;
  const databaseUrl = process.env.DATABASE_URL;

  if (!port || !databaseUrl) {
    throw new Error('Missing essential environment variables.');
  }

  return {
    port,
    databaseUrl,
  };
};
