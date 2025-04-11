'use client';
import { Button } from './ui/button';
import Link from 'next/link';

const ClientButtonLink = ({
  interviewId,
  hasFeedback,
}: {
  interviewId: string;
  hasFeedback: boolean;
}) => {
  return (
    <Button className='btn-primary'>
      <Link
        href={
          hasFeedback
            ? `/interview/${interviewId}/feedback`
            : `/interview/${interviewId}`
        }
      >
        {hasFeedback ? 'Ver feedback' : 'Fazer entrevista'}
      </Link>
    </Button>
  );
};

export default ClientButtonLink;
