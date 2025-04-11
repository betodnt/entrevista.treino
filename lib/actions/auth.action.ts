'use server';

import { auth, db } from '@/firebase/admin';
import { cookies } from 'next/headers';

const ONE_WEEK = 60 * 60 * 24 * 7; // 7 days

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;
  try {
    const userRecord = await db.collection('users').doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: 'Usuário já existe. Tente fazer login.',
      };
    }
    await db.collection('users').doc(uid).set({
      name,
      email,
    });
    return {
      success: true,
      message: 'Usuário criado com sucesso. Por favor faça login.',
    };
  } catch (e: any) {
    console.error('Erro ao criar usuário:', e);
    if (e.code === 'auth/email-already-exists') {
      return {
        success: false,
        message: 'Email já está em uso.',
      };
    }
    return {
      success: false,
      message: 'Erro ao criar usuário.',
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const UserRecord = await auth.getUserByEmail(email);
    if (!UserRecord) {
      return {
        success: false,
        message: 'Usuário não encontrado. Crie um novo usuário.',
      };
    }

    await setSessionCookie(idToken);
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: 'Falha os efetuar login em sua conta.',
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000, // 7 days
  });
  cookieStore.set('session', sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) {
    return null;
  }
  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db
      .collection('users')
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) return null;
    return {
      ...userRecord.data(),
      uid: userRecord.id,
    } as unknown as User;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
