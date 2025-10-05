import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    console.log('Verifying admin access')
    const user = await requireRole(request, 'admin')
    console.log('Admin verified:', user.email, user.role)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.log('Admin verification failed:', error instanceof Error ? error.message : error)
    if (error instanceof Error && (error.message === 'Unauthorized' || error.message === 'Forbidden')) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
