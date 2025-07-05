
/* 
Task to do with api calls
// do what is does 
// in docker run instance of redis , index js , ollama 
// some api key are give in config file 
// auth check the config and authenticate
// 
  sending body
  structure of receving body for api

  apiCall: what you want to do generate chat etc
  api token 
    type 1: admin full control no checks on anythings no rate limit
    type 2: normal api token rate limit , limited model to run 
  // so the only model we will work with will me deep seek r1
  // what use can do then 
     some thing which has normal use case
     -> code generation [i need this]
     -> basic chat completion [i guess this will be enough]
*/



import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
import authratelimit from './middlewares/authratelimit.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(authratelimit);


app.post('/generate', async (req, res) => {
  try {
    const { prompt, apiToken } = req.body;

    

    const response = await axios.post(process.env.ollama_url+'/generate', {
      prompt: prompt,
      model: process.env.llmModel,
        stream: false
    });

    res.json({ response: response.data.response });
  } catch (error) {
    console.error('Error calling Ollama (generate):', error.message);
    res.status(500).json({ error: 'Failed to fetch response from Ollama' });
  }
});


app.post('/chat', async (req, res) => {
  try {
    const { messages, apiToken } = req.body;


    const response = await axios.post(process.env.ollama_url+'/chat', {
      messages: messages,
      model: process.env.llmModel,
        stream: false
    });

    res.json({ response: response.data.response });
  } catch (error) {
    console.error('Error calling Ollama (chat):', error.message);
    res.status(500).json({ error: 'Failed to fetch response from Ollama' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
