import mongoose from 'mongoose'

const mongoDB = async () => {
    const mongoUri = process.env.MONGO_URI

    if (!mongoUri) {
        throw new Error('MONGO_URI is not defined in environment variables');
    }

    try {
        await mongoose.connect(mongoUri)
        console.log('Mongoose connected successfully');
    } catch (error) {
        console.error('Mongoose connection error:', error);
        throw new Error('Failed to connect to MongoDB');
    }
}

export default mongoDB