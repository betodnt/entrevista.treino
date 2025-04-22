import Agent from '@/components/Agent';
import { getCurrentUser } from '';

const page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Faça Uma entrevista</h3>
      <Agent userName={user?.name} userId={user?.id} type='generate' />
    </>
  );
};

export default page;
