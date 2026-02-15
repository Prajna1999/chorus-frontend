import type { VoicePrompt, TextPrompt } from '@/types';

export const VOICE_PROMPTS: Record<string, VoicePrompt[]> = {
  odia: [
    { id: "od1", text: "ଆଜି ପାଗ ବହୁତ ଭଲ ଅଛି।",              translation: "The weather is very nice today." },
    { id: "od2", text: "ମୋର ନାମ ___ ଏବଂ ମୁଁ ଓଡ଼ିଶାରୁ।",       translation: "My name is ___ and I am from Odisha." },
    { id: "od3", text: "ଏହି ଫସଲ ଏଥର ବହୁତ ଭଲ ହୋଇଛି।",         translation: "The crop has been very good this time." },
    { id: "od4", text: "ହେଲ୍ଥ ସେଣ୍ଟରରେ ଡାକ୍ତର ନାହାଁନ୍ତି।",  translation: "There is no doctor at the health center." },
    { id: "od5", text: "ମୁଁ ସକାଳୁ ବଜାର ଯିବି।",                translation: "I will go to the market in the morning." },
  ],
  hindi: [
    { id: "hi1", text: "आज मौसम बहुत अच्छा है।",              translation: "The weather is very nice today." },
    { id: "hi2", text: "मेरा नाम ___ है और मैं भारत से हूँ।", translation: "My name is ___ and I am from India." },
    { id: "hi3", text: "इस बार फसल बहुत अच्छी हुई है।",       translation: "The crop has been very good this time." },
    { id: "hi4", text: "अस्पताल में डॉक्टर नहीं हैं।",        translation: "There is no doctor at the hospital." },
    { id: "hi5", text: "मुझे सुबह बाज़ार जाना है।",            translation: "I have to go to the market in the morning." },
  ],
  assamese: [
    { id: "as1", text: "আজি বতৰ বৰ ভাল।",              translation: "The weather is very nice today." },
    { id: "as2", text: "মোৰ নাম ___ আৰু মই অসমৰ পৰা।", translation: "My name is ___ and I am from Assam." },
    { id: "as3", text: "এইবাৰ খেতি বৰ ভাল হৈছে।",      translation: "The crop has been very good this time." },
  ],
};

export const TEXT_PROMPTS: TextPrompt[] = [
  { id: "t1", cat: "RLHF · Maths",        inst: "Solve step-by-step:",                                q: "A train travels 360 km in 4 hours. Find its speed in m/s. (NCERT Class 10)" },
  { id: "t2", cat: "RLHF · Science",      inst: "Explain simply for a student:",                      q: "What is the difference between a physical and a chemical change? Give two examples each." },
  { id: "t3", cat: "RLHF · Civics",       inst: "Answer as a knowledgeable teacher:",                 q: "What are the Fundamental Rights in the Indian Constitution? Explain any two." },
  { id: "t4", cat: "Instruction-follow",  inst: "Rewrite in passive voice:",                          q: "The farmer harvested the wheat in October." },
  { id: "t5", cat: "Sentiment annotation",inst: "Label as Positive/Negative/Neutral and explain why:", q: "\"Delivery was fast but the packaging was damaged and the item was slightly dented.\"" },
];
