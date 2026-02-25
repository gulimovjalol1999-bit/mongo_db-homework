module.exports = class CustomErrorhandler extends Error {
  constructor(status, message, errors = []) {
    super(message) 
    this.status = status
    this.errors = errors
  }

  static UnAuthorized (message, errors = []) {
    return new CustomErrorhandler(401, message, errors)
  }
  
  static NotFound (message, errors = []) {
    return new CustomErrorhandler(404, message, errors)
  } 
  
  static BadRequest (message, errors = []) {
    return new CustomErrorhandler(400, message, errors)
  }

  static Forbidden (message, errors = []) {
    return new CustomErrorhandler(403, message, errors)
  }

  static NoContent (message, errors = []) {
    return new CustomErrorhandler(204, message, errors)
  }
}