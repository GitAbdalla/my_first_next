import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  await connectDB();
  const users = await User.find();
  return Response.json(users);
}

export async function POST(request) {
  await connectDB();
  const body = await request.json(); 

  const newUser = await User.create(body); 
  return Response.json(newUser);
}

