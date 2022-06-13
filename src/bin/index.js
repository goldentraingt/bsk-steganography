process.on('unhandledRejection', (err, p) => {
    console.error('An unhandledRejection occurred');
    console.error('Rejected Promise:', p);
    console.error('Rejection:', err);
});

// require('./database.js')
require('./www.js');
