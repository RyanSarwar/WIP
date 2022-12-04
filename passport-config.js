const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, userEmail, userID) {
  const authenticateUser = async (email, password, done) => {
    const user = userEmail(email)
    if (user == null) {
      return done(null, false, { message: 'Email does not exist.' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Your Password is Incorrect, Please Try Again.' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, userID(id))
  })
}

module.exports = initialize