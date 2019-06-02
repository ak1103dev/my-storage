'use strict'

const filepreview = require('filepreview')
const fs = require('fs')

module.exports = function(Container) {
  Container.preview = async function(container, file, req, res) {
    try {
      // const data = await this.download(container, file, req, res)
      // const baseUrl = 'http://localhost:3000/api/Containers/test/download/'
      // const url = `${baseUrl}${file}`
      const url = 'https://i.ytimg.com/vi/kJ2dr9jAThY/maxresdefault.jpg'
      const fileName = file.replace(/\..+$/, '')
      const path = `/tmp/preview_image_${fileName}.jpg`
      const data = filepreview.generateSync(url, path)
      if (data) {
        const buffer = new Buffer(fs.readFileSync(path))
        res.set('Content-Type', 'application/force-download')
        res.set('Content-Type', 'application/octet-stream')
        res.set('Content-Type', 'application/download')
        // res.set('Content-Type', 'image')
        // res.set('Content-Disposition', `attachment;filename=${fileName}`)
        // res.set('X-Frame-Options', 'allow-from *')
        res.set('Content-Transfer-Encoding', 'binary')

        return res.send(buffer)
        // return fs.createReadStream(path)
      } else {
        throw new Error('Fail')
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
