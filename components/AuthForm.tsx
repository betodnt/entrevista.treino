'use client';

import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormField from './FormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-in') {
        toast.success('Login realizado com sucesso!');
        router.push('/');
      } else {
        router.push('/sign-in');
        toast.success('Cadastro realizado com sucesso!');
      }
    } catch (error) {
      console.log(error);
      toast.error(`Esse é um erro: ${error}`);
    }
  }

  const isSignIn = type === 'sign-in';

  return (
    <div className='card-border lg:min-w-[566px]'>
      <div className='flex flex-col gap-6 card py-14 px-10'>
        <div className='flex flex-row gap-2 justify-center'>
          <Image src='/logo.svg' alt='logo' height={32} width={38} />
          <h2 className='text-primary-100'>Entrevista IA</h2>
        </div>
        <h3>Pratique entrevista de emprego com IA</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 w-full mt-4 form'
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name='name'
                label='nome:'
                placeholder='Escreva seu nome'
                type='text'
              />
            )}
            <FormField
              control={form.control}
              name='email'
              label='email:'
              placeholder='Escreva seu email'
              type='email'
            />
            <FormField
              control={form.control}
              name='password'
              label='senha:'
              placeholder='Escreva sua senha'
              type='password'
            />

            <Button className='btn' type='submit'>
              {isSignIn ? 'Entrar' : 'Criar uma conta'}
            </Button>
          </form>
        </Form>
        <p className='text-center'>
          {isSignIn ? 'Nenhuma conta ainda? ' : 'Já tem uma conta?'}
          <Link
            href={!isSignIn ? '/sign-in' : '/sign-up'}
            className='font-bold text-user-primary ml-1'
          >
            {!isSignIn ? 'Entrar' : 'Criar uma conta'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
