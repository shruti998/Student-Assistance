/**
 * Title : Server.js
 * Description : Define port and listen to port connections.
 */

 import app from './app.js';
 const port = 3000;
 
 app.listen(port, () => {
   console.log(`Server is active at http://localhost:${port}`)
 })