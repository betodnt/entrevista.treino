import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import InterviewCard from '@/components/InterviewCard';
import { getCurrentUser } from '@/lib/actions/auth.action';
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from '@/lib/actions/general.action';

const Page = async () => {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({
      userId: user?.id!,
    }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = latestInterviews?.length! > 0;

  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>
            Prepare-se Para Entrevistas Com Práticas & Feedback Baseados em IA
          </h2>
          <p className='text-lg'>
            Pratique com perguntas de entrevista reais e obtenha feedback
            instantâneo
          </p>
          <Button asChild className='btn-primary maz-sm:w-full'>
            <Link href='/interview'>Comece a entrevista</Link>
          </Button>
        </div>
        <Image
          src='/robot.png'
          alt='robot-dude'
          width={400}
          height={400}
          className='max-sm:hidden'
        />
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Suas entrevistas</h2>
        <div className='interviews-section'>
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>Você ainda não fez nenhuma entrevista</p>
          )}
        </div>
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Faça uma entrevista</h2>
        <div className='interviews-section'>
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>Ainda não fizemos nenhuma entrevista!</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
