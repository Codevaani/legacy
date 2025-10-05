import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

async function connectDB(): Promise<void> {
  await mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  })
}

export default connectDB
