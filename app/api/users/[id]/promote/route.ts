import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

// POST /api/users/[id]/promote - Promote user to admin
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    // In production, you would check if the requester is an admin
    // For now, we'll allow promotion for development purposes

    const user = await User.findByIdAndUpdate(
      params.id,
      {
        role: 'admin',
        status: 'active',
        updatedAt: new Date()
      },
      { new: true }
    )

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'User promoted to admin successfully',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        status: user.status
      }
    })

  } catch (error) {
    console.error('Error promoting user:', error)
    return NextResponse.json(
      { error: 'Failed to promote user' },
      { status: 500 }
    )
  }
}