'use strict'

module.exports = function(Container) {
  Container.preview = async function(container, file, req, res) {
    try {
      const data = await this.download(container, file, req, res)
      return data
    } catch (e) {
      return e
    }
  }
}
