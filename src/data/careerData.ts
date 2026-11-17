export interface CareerSubmission {
  id: string;
  studentName: string;
  className: string;
  interest: string;
  strength: string;
  theme8Score: number;
  theme9Score: number;
  theme10Choice: string;
  aiReport: string;
  createdAt: string;
  synced: boolean;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  mode?: 'online' | 'offline';
}

export interface SWOTData {
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
}

export interface TrainingPlan {
  quality: string;
  action: string;
  time: string;
}

export const VIDEO_LIST = [
  {
    id: 'v1',
    title: 'Chủ đề 8: Thị trường lao động số & Yêu cầu với người lao động',
    category: 'Chủ đề 8',
    url: 'https://www.youtube.com/embed/placeholder1',
    desc: 'Phân tích các yêu cầu về kỷ luật, năng lực công nghệ và an toàn lao động trong kỷ nguyên số.'
  },
  {
    id: 'v2',
    title: 'Chủ đề 9: Hướng dẫn lập ma trận SWOT & Rèn luyện năng lực cá nhân',
    category: 'Chủ đề 9',
    url: 'https://www.youtube.com/embed/placeholder2',
    desc: 'Kỹ năng tự đánh giá điểm mạnh, điểm yếu và xây dựng kế hoạch rèn luyện thực tế.'
  },
  {
    id: 'v3',
    title: 'Chủ đề 10: Bí quyết chọn ngành, chọn trường & Thích ứng môi trường mới',
    category: 'Chủ đề 10',
    url: 'https://www.youtube.com/embed/placeholder3',
    desc: 'Gỡ rối tâm lý, vượt qua rào cản định kiến và chuẩn bị tâm thế vững vàng bước vào đời.'
  }
];

export const OFFLINE_KNOWLEDGE_BANK = [
  {
    keywords: ['khó khăn', 'nghèo', 'không có điều kiện', 'học phí', 'tiền', 'hoàn cảnh'],
    response: 'Dạ, hệ thống rất thấu hiểu hoàn cảnh của em. Nếu điều kiện kinh tế chưa cho phép học đại học tự túc học phí cao, em hoàn toàn có thể chọn: (1) Các trường Quân đội, Công an, Sư phạm được miễn 100% học phí và hỗ trợ sinh hoạt phí; (2) Hệ Cao đẳng nghề thực chiến (chỉ 1.5 - 2 năm) để sớm đi làm có thu nhập rồi học liên thông; hoặc (3) Tận dụng gói tín dụng sinh viên của Ngân hàng Chính sách Xã hội.'
  },
  {
    keywords: ['bố mẹ', 'gia đình', 'ngăn cản', 'bắt ép', 'không cho', 'phản đối'],
    response: 'Theo Chủ đề 10 (Bản lĩnh thực hiện đam mê), khi gia đình phản đối nghề em chọn, nguyên nhân lớn nhất là do bố mẹ lo lắng cho tương lai của em. Em đừng vội cãi lời hay buông xuôi, hãy: (1) Tìm hiểu kỹ thông tin tuyển sinh, cơ hội việc làm của ngành đó; (2) Lập một bảng kế hoạch học tập nghiêm túc; (3) Nhờ thầy cô chủ nhiệm cùng phân tích để thuyết phục bố mẹ bằng hành động thực tế.'
  },
  {
    keywords: ['cntt', 'công nghệ thông tin', 'ai', 'máy tính', 'lập trình', 'tin học'],
    response: 'Ngành Công nghệ thông tin & AI (Chủ đề 8) đang có nhu cầu nhân lực rất lớn. Để theo đuổi ngành này, ngay từ lớp 12 em cần rèn luyện: Tư duy giải quyết vấn đề, khả năng tự học ngoại ngữ/công nghệ mới và tính kiên trì khi xử lý lỗi (Chủ đề 9).'
  },
  {
    keywords: ['y khoa', 'bác sĩ', 'điều dưỡng', 'dược', 'quân y', 'sức khỏe'],
    response: 'Nhóm ngành Chăm sóc sức khỏe (Bác sĩ, Điều dưỡng, Quân y...) đòi hỏi phẩm chất nhân hậu, sự cẩn thận tỉ mỉ, sức khỏe bền bỉ và khả năng chịu áp lực cực cao (Chủ đề 8 & 9). Em cần tập trung tối đa cho tổ hợp môn mũi nhọn và chuẩn bị tâm lý sẵn sàng thực hành liên tục tại bệnh viện (Chủ đề 10).'
  },
  {
    keywords: ['nông dân', 'nông nghiệp', 'trồng trọt', 'chăn nuôi', 'lâm nghiệp'],
    response: 'Làm nông nghiệp trong xã hội hiện đại (Chủ đề 8) không còn là "chân lấm tay bùn" thuần túy mà là Nông nghiệp Công nghệ cao, Kỹ sư giống cây trồng, Tự động hóa tưới tiêu và Thương mại điện tử nông sản. Đây là hướng đi cực kỳ tiềm năng tại địa phương nếu em biết kết hợp kiến thức Sinh - Hóa - Tin học!'
  }
];

export const DEFAULT_OFFLINE_REPLY = 
  "Dạ, hiện thiết bị đang ở chế độ Ngoại tuyến (Offline). Theo cẩm nang Chủ đề 8, 9, 10: Để chọn đúng nghề và thành công, em hãy đối chiếu Sở thích + Năng lực cốt lõi (SWOT) với Yêu cầu thực tế của thị trường lao động, đồng thời giữ vững tâm lý tự tin, chủ động thích ứng với môi trường mới nhé!";