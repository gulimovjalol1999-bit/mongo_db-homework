const path = require("path")
const fs = require("fs")
const BookSchema = require("../schema/book.schema");

const stream = async (req, res, next) => {
  try {
    const {bookId} = req.params

    const foundedBook = await BookSchema.findById(bookId)

    if (!foundedBook) {
      throw CustomErrorhandler.NotFound("Not found")
    }

    if (!foundedBook.audioUrl) {
      return res.status(404).json({message: "Url not found"})
    }

    const fileUrl = path.join(__dirname, "..", foundedBook.audioUrl)
    const stat = fs.statSync(fileUrl)
    const fileSize = stat.size
    const range = req.headers.range

    if (range) {
      const parts = range.slice(6).split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
      const result = (end - start) + 1

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`, 
        "Accept-Ranges": "bytes",
        "Content-Length": result, 
        "Content-Type": "audio/mp3" 
      })

      fs.createReadStream(fileUrl, {start, end}).pipe(res)
    } else {
      res.writeHead(200, {
        "Accept-Ranges": "bytes",
        "Content-Length": fileSize, 
        "Content-Type": "audio/mp3"
      })
      fs.createReadStream(fileUrl).pipe(res);
    }
    
  } catch (error) {
    next(error)
  }
};

module.exports = stream