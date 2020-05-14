const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'c43619b16dc449b493a59ff252b3af4a'
   });

const handleApiCall = (req, res) => {
    app.models
        .predict( Clarifai.FACE_DETECT_MODEL, req.body.id )
        .then(data => {
            res.json(data);
        })
        .catch(err => 
            res.status(400).json('Unable to work with API.'), 
        )
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
      .then(entries => {
          res.json(entries);
      })
      .catch(err => res.status(400).json('Unable to update entries.'))
}

module.exports = {
    handleImage,
    handleApiCall
}