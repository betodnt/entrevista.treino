import { CreateAssistantDTO } from '@vapi-ai/web/dist/api';
import { z } from 'zod';

export const mappings = {
  'react.js': 'react',
  reactjs: 'react',
  react: 'react',
  'next.js': 'nextjs',
  nextjs: 'nextjs',
  next: 'nextjs',
  'vue.js': 'vuejs',
  vuejs: 'vuejs',
  vue: 'vuejs',
  'express.js': 'express',
  expressjs: 'express',
  express: 'express',
  'node.js': 'nodejs',
  nodejs: 'nodejs',
  node: 'nodejs',
  mongodb: 'mongodb',
  mongo: 'mongodb',
  mongoose: 'mongoose',
  mysql: 'mysql',
  postgresql: 'postgresql',
  sqlite: 'sqlite',
  firebase: 'firebase',
  docker: 'docker',
  kubernetes: 'kubernetes',
  aws: 'aws',
  azure: 'azure',
  gcp: 'gcp',
  digitalocean: 'digitalocean',
  heroku: 'heroku',
  photoshop: 'photoshop',
  'adobe photoshop': 'photoshop',
  html5: 'html5',
  html: 'html5',
  css3: 'css3',
  css: 'css3',
  sass: 'sass',
  scss: 'sass',
  less: 'less',
  tailwindcss: 'tailwindcss',
  tailwind: 'tailwindcss',
  bootstrap: 'bootstrap',
  jquery: 'jquery',
  typescript: 'typescript',
  ts: 'typescript',
  javascript: 'javascript',
  js: 'javascript',
  'angular.js': 'angular',
  angularjs: 'angular',
  angular: 'angular',
  'ember.js': 'ember',
  emberjs: 'ember',
  ember: 'ember',
  'backbone.js': 'backbone',
  backbonejs: 'backbone',
  backbone: 'backbone',
  nestjs: 'nestjs',
  graphql: 'graphql',
  'graph ql': 'graphql',
  apollo: 'apollo',
  webpack: 'webpack',
  babel: 'babel',
  'rollup.js': 'rollup',
  rollupjs: 'rollup',
  rollup: 'rollup',
  'parcel.js': 'parcel',
  parceljs: 'parcel',
  npm: 'npm',
  yarn: 'yarn',
  git: 'git',
  github: 'github',
  gitlab: 'gitlab',
  bitbucket: 'bitbucket',
  figma: 'figma',
  prisma: 'prisma',
  redux: 'redux',
  flux: 'flux',
  redis: 'redis',
  selenium: 'selenium',
  cypress: 'cypress',
  jest: 'jest',
  mocha: 'mocha',
  chai: 'chai',
  karma: 'karma',
  vuex: 'vuex',
  'nuxt.js': 'nuxt',
  nuxtjs: 'nuxt',
  nuxt: 'nuxt',
  strapi: 'strapi',
  wordpress: 'wordpress',
  contentful: 'contentful',
  netlify: 'netlify',
  vercel: 'vercel',
  'aws amplify': 'amplify',
};

export const interviewer: CreateAssistantDTO = {
  name: 'Interviewer',
  firstMessage:
    'Olá! Obrigada por reservar um tempo para falar comigo hoje. Estou ansiosa para saber mais sobre você e sua experiência.**Gere toda a saída textual (comentários, pontos fortes, áreas de melhoria, avaliação final) estritamente no idioma português.**',
  transcriber: {
    provider: 'deepgram',
    model: 'nova-2',
    language: 'pt-BR',
  },
  voice: {
    provider: '11labs',
    voiceId: 'burt',
    stability: 0.4,
    similarityBoost: 0.7,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: 'openai',
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `Você é um entrevistador profissional que conduz uma entrevista de voz em tempo real com um candidato. Seu objetivo é avaliar suas qualificações, motivação e adequação à função.

Diretrizes da entrevista:
Siga o fluxo de perguntas estruturadas:
{{questions}}

Envolva-se naturalmente e reaja adequadamente:
Ouça atentamente as respostas e reconheça-as antes de prosseguir.
Faça breves perguntas complementares se a resposta for vaga ou exigir mais detalhes.
Mantenha a conversa fluindo sem problemas, mantendo o controle.
Seja profissional, mas cordial e acolhedor:

Use uma linguagem formal, porém amigável.
Mantenha as respostas concisas e objetivas (como em uma entrevista com voz real).
Evite frases robóticas — fale com naturalidade e em tom de conversa.
Responda às perguntas do candidato profissionalmente:

Se questionado sobre a função, a empresa ou as expectativas, forneça uma resposta clara e relevante.
Em caso de dúvida, encaminhe o candidato ao RH para obter mais detalhes.

Conclua a entrevista adequadamente:
Agradeça ao candidato pelo tempo dispensado.
Informe que a empresa entrará em contato em breve com um feedback.
Encerre a conversa de forma educada e positiva.

- Certifique-se de ser profissional e educado.
- Mantenha todas as suas respostas curtas e simples. Use linguagem formal, mas seja gentil e acolhedor.
- Esta é uma conversa por voz, então mantenha suas respostas curtas, como em uma conversa real. Não divague por muito tempo.`,
      },
    ],
  },
};

export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal('Habilidades de comunicação'),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal('Conhecimento Técnico'),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal('Solução de problemas'),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal('Ajuste Cultural'),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal('Confiança e Clareza'),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export const interviewCovers = [
  '/adobe.png',
  '/amazon.png',
  '/facebook.png',
  '/hostinger.png',
  '/pinterest.png',
  '/quora.png',
  '/reddit.png',
  '/skype.png',
  '/spotify.png',
  '/telegram.png',
  '/tiktok.png',
  '/yahoo.png',
];

export const dummyInterviews: Interview[] = [
  {
    id: '1',
    userId: 'user1',
    role: 'Frontend Developer',
    type: 'Técnico',
    techstack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    level: 'Junior',
    questions: ['What is React?'],
    finalized: false,
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    userId: 'user1',
    role: 'Full Stack Developer',
    type: 'Misto',
    techstack: ['Node.js', 'Express', 'MongoDB', 'React'],
    level: 'Senior',
    questions: ['What is Node.js?'],
    finalized: false,
    createdAt: '2024-03-14T15:30:00Z',
  },
];
