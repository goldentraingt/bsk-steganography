const isDev = require('../utils/isDev')

if (process.argv[2] === undefined) {
    const server = require('../server/index')

    const port = isDev ? 8000 : 80

    server.listen(port, () => console.log('Server of worker '+process.pid+' is listening on port '+port+''))

    console.log('Worker '+process.pid+' started')
} else {

    try {
        require('../scripts/' + process.argv[2])()
    } catch(err) {
        console.log('Script error')
        console.log(err)
    }

}