import { db } from '@/firebase/admin';
import { getRandomInterviewCover } from '@/lib/utils';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function GET() {
  return Response.json({ success: true, data: 'Obrigado!' }, { status: 200 });
}

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    const { text: questions } = await generateText({
      model: google('gemini-2.0-flash-001'),
      prompt: `Fale apenas em português(pt-BR).Prepare perguntas para uma entrevista de emprego.
A função é ${role}.
O nível de experiência profissional é ${level}.
Os tipos de tecnologia usada na vaga é: ${techstack}.
O foco entre perguntas comportamentais e técnicas deve ser: ${type}.
A quantidade de perguntas necessárias é: ${amount}.
Por favor, retorne apenas as perguntas, sem nenhum texto adicional.
As perguntas serão lidas por um assistente de voz, portanto, não use "/", "*" ou quaisquer outros caracteres especiais que possam danificar o assistente de voz.
Retorne as perguntas formatadas assim:
["Pergunta 1", "Pergunta 2", "Pergunta 3"]
Obrigado! <3`,
    });

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(','),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection('interviews').add(interview);
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
