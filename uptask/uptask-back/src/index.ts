import server from './server';
import chalk from './util/chalk';

const port = process.env.PORT || 4000;

server.listen(port, () => {
    chalk.port(`🚀 Server running on port ${port}`);
})