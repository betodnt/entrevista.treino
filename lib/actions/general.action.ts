'use server';

import { feedbackSchema } from '@/constants';
import { db } from '@/firebase/admin';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';

export async function getInterviewsByUserId(
  userId: string,
): Promise<Interview[] | null> {
  const interviews = await db
    .collection('interviews')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams,
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection('interviews')
    .where('finalized', '==', true)
    .where('userId', '!=', userId)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interviews = await db.collection('interviews').doc(id).get();

  return interviews.data() as Interview | null;
}

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript } = params;
  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `-${sentence.role}: ${sentence.content}\n`,
      )
      .join('');
    const {
      object: {
        totalScore,
        categoryScores,
        strengths,
        areasForImprovement,
        finalAssessment,
      },
    } = await generateObject({
      model: google('gemini-2.0-flash-001', {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `Você é um entrevistador de IA analisando uma entrevista simulada. Sua tarefa é avaliar o candidato com base em categorias estruturadas. Seja minucioso e detalhado em sua análise. Não seja condescendente com o candidato. Se houver erros ou pontos a serem melhorados, aponte-os.
Transcrição: ${formattedTranscript}
Avalie o candidato de 0 a 100 nas seguintes áreas. Não adicione outras categorias além das fornecidas:
- **Habilidades de Comunicação**: Clareza, articulação e respostas estruturadas.
- **Conhecimento Técnico**: Compreensão dos conceitos-chave da função.
- **Resolução de Problemas**: Capacidade de analisar problemas e propor soluções.
- **Adequação Cultural e à Função**: Alinhamento com os valores da empresa e a função.
- **Confiança e Clareza**: Confiança nas respostas, engajamento e clareza.
**Gere toda a saída textual (comentários, pontos fortes, áreas de melhoria, avaliação final) estritamente no idioma português.**`,
      system:
        'Você é um entrevistador profissional que analisa uma entrevista simulada. Sua tarefa é avaliar o candidato com base em categorias estruturadas.',
    });

    const feedback = await db.collection('feedback').add({
      interviewId,
      userId,
      totalScore,
      categoryScores,
      strengths,
      areasForImprovement,
      finalAssessment,
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      feedbackId: feedback.id,
    };
  } catch (e) {
    console.error('Erro ao salvar feedback:', e);
    return { success: false };
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams,
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const feedback = await db
    .collection('feedback')
    .where('interviewId', '==', interviewId)
    .where('userId', '==', userId)
    .limit(1)
    .get();

  if (feedback.empty) return null;
  const feedbackDoc = feedback.docs[0];
  return {
    id: feedbackDoc.id,
    ...feedbackDoc.data(),
  } as Feedback;
}
