import { Configuration, OpenAIApi } from 'openai';
import 'dotenv/config';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

export const openai = new OpenAIApi(configuration);
