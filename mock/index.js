var city = require('./data/index.json')
var obj = {
    "/api/list": city
}
module.exports = function(url) {
    return obj[url]
}