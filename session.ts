import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function getSession() {
  return getServerSession(authOptions);
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session?.user || session.user.role !== 'ADMIN') {
    return null;
  }
  return session;
}

export async function requireCustomer() {
  const session = await getSession();
  if (!session?.user || session.user.role !== 'CUSTOMER') {
    return null;
  }
  return session;
}
