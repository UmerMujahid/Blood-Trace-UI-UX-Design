const dotenv = require('dotenv');
const connectDB = require('./src/config/database')
const app = require('./src/app')

dotenv.config();

const startServer = async () => {
    try {

        await connectDB();
        
        app.on('error', (error) => {
            console.log(`[ERROR]: ${error}`);
            throw error;
        });

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server is running at ${PORT}.\nCheck out http://localhost:${PORT}/api/v1`)
        });

    } catch (error) {
        console.log(`[ERROR]: MongoDB connection failed. ${error}`);
    }
}

startServer();