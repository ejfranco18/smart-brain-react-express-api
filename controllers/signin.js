const handleSignin = (req, res, db, bcrypt) => {
  const { email, hash} = req.body;
  if (!email || !hash) {
    return res.status(400).json('incorrect form submission');
  }
  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(hash, data[0].hash)
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(500).json('unable to get user'))
      } else {
        res.status(300).json('wrong credentials')
      }

    })
    .catch(err => res.status(404).json('wrong credentials'))
}

module.exports = {
  handleSignin: handleSignin
}