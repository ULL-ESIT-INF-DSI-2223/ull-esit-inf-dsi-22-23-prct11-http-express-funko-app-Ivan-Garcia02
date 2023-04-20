import express from 'express';
import { exec } from 'node:child_process';

const app = express();

app.get('/execmd', (req, res) => {
  if (!req.query.cmd) {
    res.status(400).send();
  }
  else {
    let comando: string = req.query.cmd as string;
    if (req.query.args) {
      comando += ' ' + req.query.args as string;
    }

    exec(comando, (error, stdout, stderr) => {
      if (error) {
        res.status(500);
        res.send({
          error: error,
          errorText: stderr
        })
      }
      else {
        res.send({
          output: stdout
        })
      }
    }); 
  }
});


app.get('*', (_, res) => {
  res.status(404).send();
});


app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
