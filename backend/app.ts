import express, { Application } from 'express';
import { readFile, writeFile } from 'fs/promises';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/page/:fileName', async (req, res) => {
  const fileName = req.params.fileName;
  const json = await readFile(`./pages/page${fileName}.json`);

  res.setHeader('Content-Type','application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods','POST,PATCH,OPTIONS')
  res.send(json.toString());
});

app.post('/page/:fileName', async (req, res) => {
  try {
    const fileName = req.params.fileName;
    const file = req.body.file;

    if (!file) {
      res.send('EMPTY - NOT WRITE\n');
    }

    await writeFile(
      `./pages/page${fileName}.json`,
      JSON.stringify(file, null, 1)
    );

    const json = await readFile(`./pages/page${fileName}.json`);
    res.send('DONE\n' + json.toString());
  } catch (e) {
    console.error(e);
    res.send('ERROR\n');
  }
});

app.use((req, res, next) => {
  res.status(404).send(`Not Found\n`);
});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
