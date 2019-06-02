'use strict'

const axios = require('axios')
const sharp = require('sharp')

const apiUrl = 'http://localhost:3000'

module.exports = function(Container) {
  Container.preview = async function(container, file, req, res) {
    const url = `${apiUrl}/api/Containers/${container}/download/${file}`
    try {
      const fileData = await axios.get(url, {
        responseType: 'arraybuffer',
      })
        .then(response => new Buffer(response.data, 'binary'))
      const data = await sharp(fileData)
        .rotate()
        .resize(200)
        .toBuffer()
      return data
    } catch (e) {
      console.error(e)
      return Promise.reject(e)
    }
  }

  Container.cover = async function(container, file, req, res, width = 500, height = 500) {
    const url = `${apiUrl}/api/Containers/${container}/download/${file}`
    try {
      const fileData = await axios.get(url, {
        responseType: 'arraybuffer',
      })
        .then(response => new Buffer.from(response.data, 'binary'))
      const data = await sharp(fileData)
        .resize({
          width,
          height,
          fit: sharp.fit.outside,
        })
        .jpeg()
        .toBuffer()
      res.contentType('image/jpeg')
      return res.send(data)
    } catch (e) {
      console.error(e)
      return Promise.reject(e)
    }
  }
}
