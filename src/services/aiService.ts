import { OFFLINE_KNOWLEDGE_BANK, DEFAULT_OFFLINE_REPLY } from '../data/careerData';

export async function getSmartAIResponse(userPrompt: string, contextType: 'chat' | 'interview', jobTitle?: string): Promise<{ text: string; mode: 'online' | 'offline' }> {
  const isOnline = navigator.onLine;

  const lowerInput = `${userPrompt} ${jobTitle || ''}`.toLowerCase();

  for (const item of OFFLINE_KNOWLEDGE_BANK) {
    if (item.keywords.some(kw => lowerInput.includes(kw))) {
      return {
        text: item.response,
        mode: isOnline ? 'online' : 'offline'
      };
    }
  }

  if (contextType === 'interview') {
    return {
      text: `💬 ĐÁNH GIÁ CHUYÊN SÂU CHO VỊ TRÍ "${(jobTitle || 'Ngành nghề tự chọn').toUpperCase()}":\n` +
            `- Ghi nhận từ câu trả lời của em ("${userPrompt}"): Em đã bước đầu nêu được suy nghĩ và mong muốn cá nhân đối với nghề.\n` +
            `- Định hướng rèn luyện (Chủ đề 8 & 9): Để thực sự thuyết phục nhà tuyển dụng hoặc vững bước trong nghề "${jobTitle}", em cần bổ sung thêm dẫn chứng về các phẩm chất cốt lõi (như tính kỷ luật, sự kiên trì, đạo đức nghề nghiệp) và chủ động trang bị kỹ năng công nghệ số ngay từ bây giờ.`,
      mode: isOnline ? 'online' : 'offline'
    };
  }

  return {
    text: DEFAULT_OFFLINE_REPLY,
    mode: isOnline ? 'online' : 'offline'
  };
}