import { Server } from './server';
import 'dotenv/config'
import { FRONTEND_URL } from './util/config';



const server = new Server();

server.listen(port => {
    console.log(`Server is listening on http://localhost:${port}`);
    console.log(`Running in ${process.env.NODE_ENV} mode`);
    console.log(`Connected to ${FRONTEND_URL}`)
})