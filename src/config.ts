import 'dotenv/config';
import fs from 'node:fs';
import type z from 'zod';
import type { BotConfigSchema, EnvSchema } from '#schemas/config/ConfigSchema';
import validateConfig from '#util/validateConfig';

const botConfigFile = fs.readFileSync(`./bot.config.json`, 'utf8');
const botConfig = JSON.parse(botConfigFile) as z.infer<typeof BotConfigSchema>;

const envVars: z.infer<typeof EnvSchema> = {
  botToken: process.env.BOT_TOKEN,
  mongoUri: process.env.MONGO_URI,
  redisUri: process.env.REDIS_URI,
  botAdmins: process.env.BOT_ADMINS.split(/,\s*/g),
  loggerLevel: process.env.LOGGER_LEVEL,
};

const config = { ...botConfig, ...envVars };
validateConfig(config);

export default config;
