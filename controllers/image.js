const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_APIKEY
 });

 const handleAPICall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => 
    {res.json(data)
  })
  .catch(err => status(400).json('unable to wok with API'))
 }

const handleImageEntry = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImageEntry: handleImageEntry,
  handleAPICall: handleAPICall
}