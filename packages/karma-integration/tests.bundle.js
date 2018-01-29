var context = require.context('./src', true, /_spec\./)
context.keys().forEach(context)
module.exports = context
