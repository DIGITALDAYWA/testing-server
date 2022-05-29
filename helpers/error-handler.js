function errorHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    //jwt authorized error
    return res.status(401).json({ message: 'The user is not authorized!' })
  } else if (err.name === 'ValidationError') {
    //validation error
    return res.status(401).json({ message: err })
  }
  //default to 500 server error
  return res
    .status(500)
    .json({ message: 'Sorry! Developer only can visit this page.' })
}

module.exports = errorHandler
