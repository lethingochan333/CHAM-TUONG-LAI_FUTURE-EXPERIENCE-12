import React, { useState, useEffect } from 'react';
import type { CareerSubmission, ChatMessage } from './types';
import { 
  OFFLINE_AI_BANK, 
  DEFAULT_SCENARIOS, 
  DOMAIN_STRENGTHS_MAP, 
  EXAM_SUBJECTS, 
  COMBINATION_BANK 
} from './data';

// 🔑 API KEY GEMINI CỦA CÔ
const GEMINI_API_KEY = "AQ.Ab8RN6JuhuKNPihZJkvIF29C5AOf2ykfF1a0OEwp1NG4JTs-uw";

const RANDOM_FALLBACKS = [
  "Câu hỏi của em rất thú vị! Em hãy thử làm bài khảo sát ở Trạm 1 để hệ thống hiểu rõ hơn về năng lực của em nhé.",
  "Cảm ơn em đã chia sẻ! Chọn nghề là một hành trình dài, em hãy thử đặt các lựa chọn lên 'Bàn cân' ở Trạm 1 xem sao.",
  "Mình đã ghi nhận băn khoăn của em. Lời khuyên là em hãy tham khảo thêm xu hướng việc làm thực tế tại Trạm 2 nhé.",
  "Thầy cô rất hiểu áp lực của em lúc này! Đừng ngại trao đổi thêm với gia đình và xem cách giải quyết ở các tình huống tại Trạm 3 nhé.",
  "Đây là một vấn đề rất hay! Để có quyết định đúng đắn, em hãy thử chọn Tổ hợp môn xét tuyển ở Trạm 3 để xem điểm chuẩn các trường thế nào nhé.",
  "Mình luôn ở đây để lắng nghe! Tuy nhiên để định hướng tốt nhất, em nên hoàn thành việc lập Ma trận SWOT ở Trạm 5."
];

// ====================================================================
// 1. KHO 24 THẺ BÀI GACHA NGHỀ NGHIỆP SIÊU PHONG PHÚ
// ====================================================================
const GACHA_CARDS = [
  { rank: 'SSR', title: '🧙‍♂️ Pháp Sư Code (Lập trình viên AI)', desc: 'Chỉ tay gọi gió, gõ phím sinh tiền. Lương đô la nhưng coi chừng thức đêm hói đầu nha em!', color: 'from-purple-600 to-fuchsia-600', shadow: 'shadow-purple-500/50' },
  { rank: 'SSR', title: '✈️ Cơ Trưởng Bầu Trời (Phi công)', desc: 'Chiếm lĩnh bầu trời, thu nhập trên chín tầng mây! Yêu cầu: thể lực siêu phàm, thần kinh thép và Tiếng Anh cực đỉnh.', color: 'from-sky-400 to-blue-700', shadow: 'shadow-blue-500/50' },
  { rank: 'SSR', title: '⚖️ Cán Cân Công Lý (Luật sư / Pháp chế)', desc: 'Cãi giỏi, cãi khỏe, cãi ra tiền! Khả năng ghi nhớ điều luật thần sầu, không ai cãi lại nổi kể cả người yêu cũ.', color: 'from-red-600 to-rose-900', shadow: 'shadow-red-500/50' },
  { rank: 'SSR', title: '🌿 Chiến Thần Nông Nghiệp Số', desc: 'Tay cầm iPad, chân đạp ruộng đồng. Điều khiển drone tưới tiêu sành điệu, tương lai làm chủ trang trại triệu đô.', color: 'from-green-500 to-emerald-700', shadow: 'shadow-emerald-500/50' },
  { rank: 'SSR', title: '🧬 Phù Thủy Sinh Học (Công nghệ Gen)', desc: 'Nghiên cứu vaccine, biến đổi gen cứu nhân độ thế. Bộ óc thiên tài thuộc hàng hiếm trong làng khoa học.', color: 'from-indigo-600 to-violet-900', shadow: 'shadow-indigo-500/50' },
  { rank: 'SSR', title: '⚡ Kỹ Sư Năng Lượng Xanh', desc: 'Kiến tạo tương lai năng lượng mặt trời và gió. Đón đầu xu thế phát triển bền vững toàn cầu.', color: 'from-yellow-500 to-amber-700', shadow: 'shadow-yellow-500/50' },
  
  { rank: 'SR', title: '👩‍🏫 Bậc Thầy Gõ Đầu Trẻ (Giáo viên THPT)', desc: 'Thanh xuân gắn liền với bụi phấn và giáo án. Lương ổn định, đặc quyền lớn nhất là lúc nào cũng trẻ trung năng động!', color: 'from-teal-400 to-emerald-600', shadow: 'shadow-teal-500/50' },
  { rank: 'SR', title: '🏛️ Chúa Tể Bản Vẽ (Kiến trúc sư)', desc: 'Vẽ vời giấc mơ thành hiện thực. Ngày thiết kế bay bổng, đêm thức trắng gánh còng lưng vì khách bắt đổi phương án.', color: 'from-indigo-500 to-purple-700', shadow: 'shadow-indigo-500/50' },
  { rank: 'SR', title: '🩺 Bậc Thầy Chữa Lành (Bác sĩ / Y tế)', desc: 'Gánh vác sinh mệnh và tâm hồn người khác. Sức chịu đựng áp lực thuộc hàng quái vật! Rất đáng kính trọng.', color: 'from-blue-500 to-cyan-600', shadow: 'shadow-blue-500/50' },
  { rank: 'SR', title: '💸 Chúa Tể Chốt Đơn (Thương Mại ĐT)', desc: 'Lên livestream 5 phút chốt vạn đơn hàng. Năng lượng tràn trề, tư duy nhảy số nhạy hơn máy tính.', color: 'from-orange-500 to-red-600', shadow: 'shadow-orange-500/50' },
  { rank: 'SR', title: '🎒 Đôi Chân Không Mỏi (HDV Du lịch)', desc: 'Ăn nhà hàng, ngủ khách sạn 5 sao nhiều hơn ở nhà. Được đi muôn nơi nhưng họng phải khỏe để thuyết minh liên tục.', color: 'from-yellow-400 to-amber-600', shadow: 'shadow-yellow-500/50' },
  { rank: 'SR', title: '📈 Cá Mập Tài Chính (Investment Banker)', desc: 'Phù thủy dòng tiền, lướt sóng chứng khoán. Đọc báo cáo tài chính như đọc tiểu thuyết ngôn tình.', color: 'from-emerald-600 to-teal-900', shadow: 'shadow-emerald-500/50' },
  { rank: 'SR', title: '🌐 Kiến Trúc Sư Mạng (Network Engineer)', desc: 'Bảo vệ hệ thống an ninh mạng quốc gia trước các hacker mũ đen. Ngầu lòi như phim hành động Hollywood.', color: 'from-cyan-600 to-blue-900', shadow: 'shadow-cyan-500/50' },
  { rank: 'SR', title: '🔬 Chuyên Gia Dinh Dưỡng & Food Tech', desc: 'Sáng tạo các công nghệ thực phẩm sạch, xu hướng ăn uống healthy cho thế hệ tương lai.', color: 'from-lime-500 to-green-700', shadow: 'shadow-lime-500/50' },

  { rank: 'R', title: '👔 Chiến Thần Bàn Giấy (Cán bộ Văn phòng)', desc: 'Sáng 8h chấm công, chiều 5h xách cặp. Bình yên, ổn định, combo bất diệt: máy lạnh, trà sữa và hóng drama giờ nghỉ.', color: 'from-slate-400 to-gray-600', shadow: 'shadow-slate-500/50' },
  { rank: 'R', title: '🎨 Lãng Khách Bán Cảm Hứng (Designer)', desc: 'Sống bằng cái đẹp, hít thở bằng deadline. Mắt thẩm mỹ tuyệt vời nhưng hay bị khách hàng giục sửa logo 10 lần.', color: 'from-pink-500 to-rose-600', shadow: 'shadow-pink-500/50' },
  { rank: 'R', title: '📊 Bàn Tính Vàng (Kế toán - Kiểm toán)', desc: 'Sai một ly đi nguyên tháng lương. Bộ não tính toán chính xác đến từng con số 0, thủ quỹ tương lai của gia đình.', color: 'from-amber-400 to-yellow-600', shadow: 'shadow-amber-500/50' },
  { rank: 'R', title: '✍️ Ngự Sử Ngôn Từ (Biên tập viên / Nhà báo)', desc: 'Mỗi bài viết là một thông điệp chạm đến trái tim độc giả. Sắc sảo, uyển chuyển và luôn đi đầu bắt trend.', color: 'from-rose-400 to-pink-700', shadow: 'shadow-rose-500/50' },
  { rank: 'R', title: '📦 Phù Thủy Logistics (Chuyên viên XNK)', desc: 'Nối vòng tay lớn đưa hàng hóa Việt Nam vươn tầm thế giới. Giỏi ngoại ngữ và điều phối container cực đỉnh.', color: 'from-blue-400 to-indigo-600', shadow: 'shadow-blue-400/50' },
  { rank: 'R', title: '🤝 Đại Sứ Giao Tiếp (Chuyên viên Nhân sự - HR)', desc: 'Nắm giữ sinh tử hồ sơ ứng viên. Tâm lý, khéo léo, là cầu nối hòa giải mọi mâu thuẫn trong công ty.', color: 'from-purple-400 to-indigo-600', shadow: 'shadow-purple-500/50' },
  { rank: 'R', title: '🏨 Quản Gia Khách Sạn 5 Sao (Hospitality)', desc: 'Nụ cười luôn nở trên môi, phục vụ thượng đế từ A đến Z với tiêu chuẩn quốc tế khắt khe nhất.', color: 'from-amber-500 to-orange-700', shadow: 'shadow-amber-400/50' },
  { rank: 'R', title: '📐 Thợ Săn Tọa Độ (Kỹ sư Trắc địa / Xây dựng)', desc: 'Đội nắng dầm mưa đo đạc từng mét vuông đất mẹ. Nền móng của những tòa cao ốc chọc trời bắt đầu từ đây.', color: 'from-stone-500 to-neutral-700', shadow: 'shadow-stone-500/50' },
  { rank: 'R', title: '💊 Dược Sư Tận Tâm (Chuyên gia Dược phẩm)', desc: 'Hiểu rõ từng thành phần hóa học của thuốc, tư vấn sức khỏe chuẩn xác cho mọi nhà.', color: 'from-teal-500 to-cyan-800', shadow: 'shadow-teal-400/50' },
  { rank: 'R', title: '🎬 Đạo Sĩ Truyền Thông (Content Creator)', desc: 'Biến những ý tưởng điên rồ nhất thành triệu view trên mạng xã hội. Không bao giờ thiếu muối!', color: 'from-fuchsia-550 to-pink-700', shadow: 'shadow-fuchsia-500/50' },
];

// ====================================================================
// 2. NGÂN HÀNG 40 CÂU HỎI TRẮC NGHIỆM SINH TỒN
// ====================================================================
const ALL_SURVIVAL_QUIZZES = [
  { id: 1, question: "Đang lướt TopTop, em thấy clip: 'Đừng học ĐH, học ngành X ra trường lương 100 triệu/tháng dễ ợt'. Em sẽ làm gì?", options: [{ text: "Nộp hồ sơ ngay kẻo lỡ thời cơ! 🤑", points: 0, feedback: "Ối dồi ôi! Tấm chiếu mới chưa từng trải. Không có công việc nào việc nhẹ lương 100 củ đâu em!" }, { text: "Lướt qua! Lên báo chính thống hoặc hỏi GV xem thực hư. 🤔", points: 15, feedback: "Tuyệt vời! 15 điểm tỉnh táo. Trái tim nóng nhưng cái đầu phải lạnh!" }] },
  { id: 2, question: "Bạn thân rỉ tai: 'Mày thi trường nào tao thi cùng, ở trọ chung cho vui!'", options: [{ text: "Đồng ý 2 tay! Có bạn thân ở chung là sướng nhất. 👯‍♀️", points: 0, feedback: "Sai lầm chí mạng! Hướng nghiệp không phải đi ăn trà sữa, sở trường mỗi người một khác." }, { text: "Rủ bạn vào 'Trạm 1' khám phá bản thân để tìm đam mê riêng. 🛑", points: 15, feedback: "Đỉnh chóp! Tình bạn đẹp là giúp nhau phát triển đúng thế mạnh." }] },
  { id: 3, question: "Sắp đến ngày điền nguyện vọng mà vẫn chưa biết thích gì, em sẽ:", options: [{ text: "Thấy ngành nào tên sang chảnh, điểm chuẩn thấp thì điền bừa. 🎲", points: 0, feedback: "Rất nguy hiểm! Chọn ngành kiểu 'lô tô' dễ dẫn đến bỏ học giữa chừng." }, { text: "Làm bài phân tích SWOT ở Trạm 5, kết hợp điểm mạnh để chọn tổ hợp tối ưu. 🎯", points: 20, feedback: "Quá đẳng cấp! Em đích thực là chiến thần hướng nghiệp có chiến lược." }] },
  { id: 4, question: "Nghe nói trường A check-in sang chảnh, học phí cao dù ngành đó em không thích lắm. Em tính sao?", options: [{ text: "Cứ vào cho oai với bạn bè, ra trường tính sau. 😎", points: 0, feedback: "Báo động đỏ! Học phí cao mà không đam mê chỉ phí tiền bố mẹ." }, { text: "Cân nhắc kỹ sở thích, năng lực và tài chính gia đình rồi mới quyết định. 💡", points: 20, feedback: "Chính xác! Đại học là học nghề chứ không phải nơi sống ảo." }] },
  { id: 5, question: "Đang ôn thi căng thẳng thì có anh khóa trên rủ tham gia mạng lưới khởi nghiệp đa cấp 'ngồi mát ăn bát vàng'. Em làm gì?", options: [{ text: "Làm giàu không khó, nghỉ học đi kiếm tiền thôi! 💸", points: 0, feedback: "Trời ơi cứu! Bẫy đa cấp lừa đảo đó em ơi." }, { text: "Tỉnh táo từ chối, block nick và tập trung ôn thi Tốt nghiệp. 🛑", points: 15, feedback: "Rất bản lĩnh! Đừng để bẫy làm giàu nhanh đánh cắp tương lai." }] },
  { id: 6, question: "Báo chí viết ngành em định học đang thừa nhân lực, nguy cơ thất nghiệp cao. Cảm xúc của em?", options: [{ text: "Hoang mang tột độ! Đổi sang ngành 'hot' dù không thích. 😨", points: 0, feedback: "Thiếu bản lĩnh! Chạy theo phong trào dễ thất nghiệp hơn." }, { text: "Bình tĩnh tìm ngách thị trường, nâng cao ngoại ngữ và AI. 🚀", points: 20, feedback: "Tuyệt vời! Nhân sự giỏi không bao giờ sợ thất nghiệp." }] },
  { id: 7, question: "Em có khiếu nghệ thuật nhưng bố mẹ ép học Kinh tế cho dễ xin việc.", options: [{ text: "Buông xuôi học Kinh tế trong sự ấm ức, chán nản. 😔", points: 0, feedback: "Chưa tối ưu! Học ngành ghét bào mòn động lực sống mỗi ngày." }, { text: "Lấy các dự án thiết kế/tranh vẽ đã làm để chứng minh năng lực với bố mẹ. 🎨", points: 15, feedback: "Rất trưởng thành! Thuyết phục gia đình bằng năng lực thực tế." }] },
  { id: 8, question: "Hoàn cảnh gia đình khó khăn, sợ không đủ tiền học ĐH 4 năm.", options: [{ text: "Chấp nhận số phận, nghỉ ngang đi làm công nhân kiếm tiền lẻ. 🏭", points: 0, feedback: "Đừng vội từ bỏ ước mơ! Có rất nhiều cánh cửa khác." }, { text: "Tìm trường miễn phí (Sư phạm, Quân đội) hoặc học Cao đẳng nghề 2 năm. 🛠️", points: 15, feedback: "Rất thực tế và nghị lực! ĐH không phải con đường duy nhất." }] },
  { id: 9, question: "Điểm thi thử thấp hơn điểm chuẩn ngành yêu thích năm ngoái 3 điểm. Em tính sao?", options: [{ text: "Tuyệt vọng, nộp bừa vào một ngành bét bảng cho chắc đỗ. 😭", points: 0, feedback: "Sai chiến thuật! Đừng vì sợ hãi mà đánh mất cơ hội." }, { text: "Tăng tốc ôn tập, rải nguyện vọng theo sơ đồ: Cao - Vừa sức - An toàn. 📈", points: 15, feedback: "Chiến thuật chốt hạ cực đỉnh! Vừa giữ ước mơ vừa có phương án dự phòng." }] },
  { id: 10, question: "Vào phòng thi gặp câu khó quá, không biết làm thì sao?", options: [{ text: "Tụng thần chú 'C là chân lý', khoanh bừa luôn cho nhanh. 🙈", points: 0, feedback: "Toang rồi! Thi cử không phải trò chơi may rủi hoàn toàn." }, { text: "Bình tĩnh loại trừ, làm chắc câu dễ trước, câu khó quay lại sau. 🧠", points: 10, feedback: "Rất kỹ năng! Tâm lý phòng thi vững vàng chiếm 50% thành công." }] },
  { id: 11, question: "Có người nói: 'Con gái học CNTT sau này khó lấy chồng vì suốt ngày cắm mặt vào máy tính'. Bạn nghĩ gì?", options: [{ text: "Nghe sợ quá, chắc né ngành IT ra thôi. 😰", points: 0, feedback: "Định kiến cổ hủ! Nữ lập trình viên cực kỳ đắt giá và thông minh." }, { text: "Kệ đời! Con gái thời đại số làm chủ công nghệ mới là ngầu nhất. 💻", points: 15, feedback: "Chuẩn bài! Phái nữ trong ngành công nghệ luôn có sức hút đặc biệt." }] },
  { id: 12, question: "Được nhận học bổng du học nhưng phải xa nhà, xa người yêu. Bạn sẽ:", options: [{ text: "Ở lại Việt Nam cho gần người yêu, yêu nhau quan trọng hơn. 🥰", points: 0, feedback: "Tiếc nuối lớn! Đừng vì một mối tình học sinh mà bỏ lỡ chân trời thế giới." }, { text: "Xách balo lên và đi! Cơ hội đổi đời và khẳng định bản thân trong tầm tay. ✈️", points: 20, feedback: "Đại bàng tung cánh! Tương lai rộng mở đang chờ đón bạn." }] },
  { id: 13, question: "Chọn trường gần nhà ba mẹ quản lý hay ra thành phố lớn tự lập?", options: [{ text: "Ở gần nhà cho sướng, có cơm mẹ nấu giặt đồ hộ. 🏠", points: 0, feedback: "Sẽ mãi là 'cây kiểng trong nhà kính' khó mà trưởng thành." }, { text: "Ra thành phố lớn bơi ngoài biển lớn để rèn luyện bản lĩnh sinh tồn. 🌊", points: 15, feedback: "Tuổi trẻ là phải dấn thân và va vấp để tôi luyện." }] },
  { id: 14, question: "Thấy bạn bè đứa nào cũng có định hướng rõ ràng, còn mình thì mông lung như một trò đùa:", options: [{ text: "Trầm cảm, tự ti, nghĩ mình kém cỏi nhất trái đất. 🥀", points: 0, feedback: "Mỗi đóa hoa có thời gian nở riêng, đừng so sánh chặng đua của mình với ai khác." }, { text: "Bình tĩnh ghé ngay 'Trạm 1: Khám phá chính mình' để tự soi chiếu lại bản thân. 🧭", points: 15, feedback: "Thông minh! Chậm mà chắc, hiểu mình là chìa khóa vạn năng." }] },
  { id: 15, question: "Học ngành Sư phạm nhưng sợ sau này ra trường không xin được việc biên biên chế:", options: [{ text: "Thôi bỏ, học sư phạm thời nay đói nghèo lắm. 🌾", points: 0, feedback: "Nhận định phiến diện! Giáo viên giỏi ngoại ngữ/Kỹ năng mềm trường quốc tế lương cực khủng." }, { text: "Trau dồi tiếng Anh, kỹ năng số để dạy trường chất lượng cao hoặc trường song ngữ. 🍎", points: 20, feedback: "Người thầy giỏi luôn có chỗ đứng vững chắc ở bất kỳ đâu." }] },
  { id: 16, question: "Người họ hàng mỉa mai: 'Con nhà tông không giống lông cũng giống cánh, học hành thế này khéo sau lại đi hốt rác'. Phản ứng của bạn?", options: [{ text: "Cãi tay đôi một trận tơi bời hoa lá với họ hàng. ẩu đả luôn!", points: 0, feedback: "Mất bình tĩnh rồi. Cách trả đũa ngọt ngào nhất là thành công vang dội." }, { text: "Im lặng, mỉm cười và dùng kết quả thi Đại học để 'vả mặt' bằng hành động. 🤫", points: 20, feedback: "Sự im lặng đẳng cấp nhất của kẻ chiến thắng!" }] },
  { id: 17, question: "Làm bài test hướng nghiệp ra kết quả khuyên làm Nghệ sĩ, nhưng bạn lại thích đếm tiền làm Kinh doanh:", options: [{ text: "Chắc máy tính lác rồi, đập máy mua kẹo ăn. 🍫", points: 0, feedback: "Công nghệ không lác đâu, chỉ là bạn chưa rõ mình muốn gì thôi." }, { text: "Test chỉ là tham khảo, quyết định cuối cùng vẫn thuộc về bộ óc và trái tim mình. ❤️", points: 15, feedback: "Chính xác! La bàn trong tay bạn, bạn mới là thuyền trưởng." }] },
  { id: 18, question: "Có nên chọn học ngành Y khoa chỉ vì nghe nói nhà có người làm bác sĩ sẽ oai và giàu?", options: [{ text: "Quá chuẩn! Oai với họ hàng là ưu tiên số 1. 🩺", points: 0, feedback: "Ác mộng đấy! 6 năm đại học Y cùng những đêm trực trắng sẽ làm bạn 'gục ngã' nếu không có tâm huyết." }, { text: "Cân nhắc kỹ độ lỳ đòn, sức chịu đựng và tình yêu với bệnh nhân trước khi thi Y. 🏥", points: 20, feedback: "Y đức và sự kiên trì là tối thượng trong ngành y." }] },
  { id: 19, question: "Bạn thích làm Streamer/Game thủ chuyên nghiệp thay vì học đại học:", options: [{ text: "Bỏ học chiến game kiếm tiền tỷ giống các thần tượng ngay! 🎮", points: 0, feedback: "Tỷ lệ thành công 1 phần nghìn, hậu quả bỏ học là cực kỳ cay đắng." }, { text: "Coi game là đam mê tay trái, hoàn thành tốt việc học phổ thông và đại học trước. 📚", points: 15, feedback: "Đường dài mới biết ngựa hay. Kiến thức văn hóa là bệ phóng vững chắc nhất." }] },
  { id: 20, question: "Khi gặp thất bại trong lần thi thử đầu tiên, bạn sẽ:", options: [{ text: "Khóc ngập phòng và buông xuôi, coi như đời tôi chấm hết. 😭", points: 0, feedback: "Mới thi thử mà đã đầu hàng số phận thế sao?" }, { text: "Phân tích xem mình sai ở đâu, vá lỗi kiến thức rồi chiến tiếp! ⚡", points: 15, feedback: "Th thất bại là mẹ thành công, chiến thần không sợ vấp ngã." }] },
  { id: 21, question: "Bạn bè rủ rê mua tài liệu 'đề thi mật' giá vài triệu đồng trên mạng trước ngày thi:", options: [{ text: "Chuyển khoản mua gấp để trúng tủ thành thủ khoa! 💸", points: 0, feedback: "Cạn lời! Tiền mất tật mang và tiếp tay cho tội phạm lừa đảo." }, { text: "Báo cáo trang cá nhân lừa đảo và tự lực cánh sinh ôn luyện sách giáo khoa. 📖", points: 20, feedback: "Quá tỉnh táo! Không có con đường tắt nào ngoài tự học thực chất." }] },
  { id: 22, question: "Học ngoại ngữ cảm giác quá khó, nhớ từ vựng trước quên từ vựng sau:", options: [{ text: "Ghét tiếng Anh, xin trường nào xét tuyển hoàn toàn khối C hoặc Toán Văn. 🚫", points: 0, feedback: "Tự bóp chân mình trong kỷ nguyên hội nhập quốc tế đấy em ơi." }, { text: "Thay đổi phương pháp học qua phim ảnh, âm nhạc và app thông minh để tạo hứng thú. 🎧", points: 15, feedback: "Rất linh hoạt và biết cách thích nghi với phương pháp mới." }] },
  { id: 23, question: "Người yêu cũ khuyên bạn nên chọn trường A để hai đứa dễ gặp nhau:", options: [{ text: "Nghe lời ngay vì tình yêu là vĩnh cửu! 💕", points: 0, feedback: "Đừng bao giờ lấy tương lai sự nghiệp ra để đánh cược cho một cuộc tình tuổi 18." }, { text: "Tỉnh ngộ! Tương lai của mình do mình quyết định, người yêu cũ là mây khói. ☁️", points: 20, feedback: "Sáng suốt lắm! Độc lập tài chính và sự nghiệp vững vàng mới là chân ái." }] },
  { id: 24, question: "Thầy cô giao bài tập nhóm nhưng mấy đứa trong nhóm ỉ i không chịu làm:", options: [{ text: "Ôm hết việc làm thay phần tụi nó rồi tức tối khóc thét. 😤", points: 0, feedback: "Vừa mệt thân vừa tạo thói quen xấu cho đồng đội." }, { text: "Họp nhóm phân công rõ ràng, ai không làm gạch tên khỏi danh sách nộp thầy. 📋", points: 15, feedback: "Tác phong quản lý lãnh đạo chuyên nghiệp xuất hiện từ đây." }] },
  { id: 25, question: "Bạn được ba mẹ tặng một khoản tiền lớn để tự đầu tư cho tương lai:", options: [{ text: "Đập hết vào mua sắm điện thoại đời mới và quần áo hiệu. 🛍️", points: 0, feedback: "Hơi phí phạm tuổi trẻ rồi đó nha." }, { text: "Mua sách chuyên ngành, đăng ký khóa học kỹ năng số và để dành quỹ khẩn cấp. 🧠", points: 20, feedback: "Đầu tư cho trí tuệ là khoản đầu tư sinh lời cao nhất." }] },
  { id: 26, question: "Nhìn thấy các anh chị sinh viên ra trường chạy Grab kiếm sống, bạn có thấy sợ học đại học không?", options: [{ text: "Sợ chứ! Thôi ở nhà đi làm thợ may cho lành. 🪡", points: 0, feedback: "Đại học dạy tư duy chứ không đảm bảo việc làm nếu bạn thụ động." }, { text: "Hiểu rằng đại học dạy tư duy giải quyết vấn đề, còn năng lực thực chiến mới quyết định thu nhập. 💼", points: 20, feedback: "Tư duy cực kỳ sâu sắc và thực tế." }] },
  { id: 27, question: "Cảm thấy stress nặng, mất ngủ vì áp lực kỳ thi cận kề:", options: [{ text: "Cố gồng chịu đựng đến gục ngã luôn trong phòng thi. 🛌", points: 0, feedback: "Cực kỳ nguy hiểm cho sức khỏe thể chất lẫn tinh thần." }, { text: "Tâm sự với phụ huynh, đi dạo hít thở khí trời và cân bằng giấc ngủ. 🌳", points: 15, feedback: "Biết chăm sóc bản thân là bước đầu tiên để chạm tới thành công." }] },
  { id: 28, question: "Có nên học song ngành (2 bằng đại học cùng lúc) để sau này dễ xin việc?", options: [{ text: "Đăng ký học 3 ngành luôn cho thiên hạ lác mắt! 🔥", points: 0, feedback: "Quá tải đấy! Cẩn thận chém đứt tay chứ chưa kịp mài sắc dao." }, { text: "Cân nhắc sức lực và thời gian, chỉ học song ngành khi thực sự bổ trợ cho nhau. ⚖️", points: 15, feedback: "Chất lượng hơn số lượng, tính toán đường dài rất chuẩn." }] },
  { id: 29, question: "Bạn thích làm việc trong môi trường tập đoàn đa quốc gia (Corporate) hay Startup?", options: [{ text: "Thích ổn định, sáng chấm công tối về -> Chọn tập đoàn lớn. 🏢", points: 0, feedback: "Môi trường quy củ, học hỏi quy trình chuẩn rất tốt." }, { text: "Thích bay nhảy, thử thách cái mới, tốc độ nhanh -> Chọn Startup. 🚀", points: 0, feedback: "Cả hai đều tuyệt vời tùy thuộc vào cá tính của bạn!" }, { text: "Cả hai đáp án trên đều đúng tùy thuộc vào định hướng phát triển cá nhân! ✨", points: 20, feedback: "Tuyệt đỉnh! Hiểu rõ văn hóa doanh nghiệp phù hợp với mình." }] },
  { id: 30, question: "Định nghĩa thế nào là một 'người thành công' ở tuổi 25 theo quan điểm của bạn?", options: [{ text: "Phải có nhà lầu, xe hơi chục tỷ rực rỡ khoe facebook. 🏎️", points: 0, feedback: "Áp lực vật chất đôi khi làm bạn quên mất hạnh phúc đích thực." }, { text: "Độc lập tài chính, sống có ích, làm công việc mình yêu và bình an trong tâm hồn. 🌻", points: 20, feedback: "Chuẩn mực sống văn minh và hạnh phúc bền vững!" }] },
  { id: 31, question: "Bạn bè khoe đã được tuyển thẳng Đại học sớm, còn bạn vẫn phải cày cuốc ôn thi:", options: [{ text: "Ghen tị, chán nản, buông xuôi không muốn ôn nữa. 🌧️", points: 0, feedback: "Đường đua marathon nhìn vào đích cuối cùng, không nhìn đoạn xuất phát." }, { text: "Lấy đó làm động lực bứt phá để tự tay giành vé vào trường mơ ước. 🔥", points: 15, feedback: "Bản lĩnh kiên cường của một sĩ tử thực thụ." }] },
  { id: 32, question: "Có nên nhờ AI viết hộ toàn bộ bài luận xét tuyển đại học không?", options: [{ text: "Nhanh gọn lẹ, copy paste đỡ nhức đầu! 🤖", points: 0, feedback: "Hội đồng tuyển sinh đọc hàng nghìn bài sẽ nhận ra ngay văn phong vô hồn của AI." }, { text: "Dùng AI để trau chuốt ý tưởng, còn câu chuyện và cảm xúc thật phải là của chính mình. ✍️", points: 20, feedback: "Sử dụng công nghệ thông minh! Tôn trọng tính chân thực." }] },
  { id: 33, question: "Gặp một bài toán khó nhằn mất cả buổi chiều chưa giải ra:", options: [{ text: "Vò đầu bứt tai, xé vở và bỏ cuộc. 💥", points: 0, feedback: "Nóng nảy không giải quyết được vấn đề." }, { text: "Nhờ thầy cô/bạn bè giảng hộ hoặc tạm nghỉ thư giãn rồi quay lại chinh phục. ☕", points: 15, feedback: "Kiên trì và biết cầu thị là chìa khóa vàng." }] },
  { id: 34, question: "Bạn nghĩ kỹ năng nào quan trọng nhất cho học sinh 12 bước vào đời?", options: [{ text: "Kỹ năng ăn chơi nhảy múa hết mình. 🎉", points: 0, feedback: "Hơi sớm để quẩy tung nóc nhà đấy em ơi." }, { text: "Kỹ năng tự học suốt đời, tư duy phản biện và khả năng thích ứng linh hoạt. 🌐", points: 20, feedback: "Tầm nhìn chiến lược vượt thời đại!" }] },
  { id: 35, question: "Ba mẹ không có điều kiện mua laptop mới cho bạn học đồ họa/lập trình:", options: [{ text: "Hờn dỗi, trách móc ba mẹ không bằng ba mẹ nhà người ta. 😒", points: 0, feedback: "Thiếu thấu cảm! Ba mẹ đã cố gắng hết sức vì bạn rồi." }, { text: "Dùng tạm máy cũ, ra thư viện trường hoặc làm thêm tích góp mua trả góp. 💪", points: 20, feedback: "Hiếu thảo, tự lập và biết vươn lên hoàn cảnh." }] },
  { id: 36, question: "Tham gia các hoạt động thiện nguyện, Đoàn hội trường lớp có làm mất thời gian ôn thi không?", options: [{ text: "Có chứ, chỉ tốn thời gian rảnh rỗi. ⏳", points: 0, feedback: "Bỏ lỡ cơ hội rèn luyện kỹ năng mềm cực quý giá." }, { text: "Là môi trường tuyệt vời để rèn luyện kỹ năng giao tiếp, lãnh đạo và ghi điểm hồ sơ học bạ. 🌟", points: 15, feedback: "Phát triển toàn diện Đức - Trí - Thể - Mỹ!" }] },
  { id: 37, question: "Khi đứng trước một ngã rẽ quan trọng và không ai đưa ra lời khuyên chính xác cho bạn:", options: [{ text: "Đứng ì một chỗ chờ người khác kéo đi. 🧍", points: 0, feedback: "Cuộc đời là của bạn, không ai sống hộ bạn được đâu." }, { text: "Dũng cảm tự chịu trách nhiệm với quyết định của mình, sai thì sửa, chừa thì đứng lên. 🦁", points: 20, feedback: "Tinh thần của một thủ lĩnh thực thụ!" }] },
  { id: 38, question: "Bạn nghĩ sao về việc học nghề sớm thay vì đại học?", options: [{ text: "Học nghề là tụi dốt mới học. 👎", points: 0, feedback: "Quan điểm cực kỳ lỗi thời! Xã hội luôn cần thợ lành nghề giỏi hơn cử nhân thất nghiệp." }, { text: "Là lối đi thông minh, thực tế, giúp tự lập tài chính nhanh và không áp lực nợ nần. 🛠️", points: 15, feedback: "Tư duy phân luồng giáo dục hiện đại." }] },
  { id: 39, question: "Mạng xã hội khen ngợi ngành này 'hot', nhưng bạn lại có đam mê mãnh liệt với ngành khác ít người học:", options: [{ text: "Đập bỏ đam mê theo số đông cho an tâm. 👥", points: 0, feedback: "Sống cuộc đời của người khác phác thảo thay bạn." }, { text: "Kiên định với con đường ngách của mình, chuyên gia ngành ngách luôn có chỗ đứng độc tôn. 👑", points: 20, feedback: "Cá tính xuất sắc! Độc lập và kiêu hãnh." }] },
  { id: 40, question: "Sau khi hoàn thành xong 'La Bàn Hướng Nghiệp Tuổi 18', cảm giác của bạn lúc này thế nào?", options: [{ text: "Bình thường như cân đường hộp sữa. 😑", points: 0, feedback: "Hơi phũ phàng nha, cố gắng trải nghiệm lại các trạm xem nào!" }, { text: "Tự tin hơn hẳn, đã có bản đồ rõ ràng để sẵn sàng chiến đấu cho kỳ thi sắp tới! 🚀", points: 20, feedback: "Chúc mừng bạn! Tương lai rực rỡ đang vẫy gọi phía trước!" }] }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'self' | 'market' | 'market_intel' | 'mapping' | 'chat_ai' | 'games' | 'teacher'>('home');
  const [marketIntelTab, setMarketIntelTab] = useState<'situation' | 'admission'>('situation');

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [submissions, setSubmissions] = useState<CareerSubmission[]>([]);

  // State Trợ lý AI
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: 'Xin chào! Mình là Trợ lý AI Hướng nghiệp. Em đang băn khoăn điều gì? (Ví dụ: Thích máy tính nhưng sợ học Toán, hoặc điều kiện kinh tế khó khăn...)' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // State Game 1: Gacha
  const [gachaResult, setGachaResult] = useState<any>(null);
  const [isGachaSpinning, setIsGachaSpinning] = useState(false);

  // State Game 2: Sinh Tồn (Phiên bản Ngẫu nhiên 4 câu từ 40 câu)
  const [activeQuizzes, setActiveQuizzes] = useState<any[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [game2Score, setGame2Score] = useState(0);
  const [game2Feedback, setGame2Feedback] = useState<string | null>(null);
  const [isGame2Finished, setIsGame2Finished] = useState(false);
  const [selectedOptIndex, setSelectedOptIndex] = useState<number | null>(null);

  // State kịch bản "Khám phá chính mình"
  const [selfBranch, setSelfBranch] = useState<'intro' | 'branch1_clear' | 'branch2_compare' | 'branch3_explore' | 'result'>('intro');
  const [userChoiceType, setUserChoiceType] = useState<string>('');
  
  const [b1TargetJob, setB1TargetJob] = useState('');
  const [b1Checks, setB1Checks] = useState<string[]>([]);
  const [b2Option1, setB2Option1] = useState('');
  const [b2Option2, setB2Option2] = useState('');
  const [b2Scores, setB2Scores] = useState({ opt1Passion: 3, opt2Passion: 3, opt1Ability: 3, opt2Ability: 3, opt1Finance: 3, opt2Finance: 3 });
  const [b3SubStep, setB3SubStep] = useState<1 | 2 | 3>(1);
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [strengthAnswers, setStrengthAnswers] = useState<string[]>([]);
  const [valueAnswers, setValueAnswers] = useState<string[]>([]);

  const [scenarios, setScenarios] = useState(() => {
    try {
      const saved = localStorage.getItem('hdtn12_scenarios_bank');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const customScenarios = parsed.filter((s: { isDefault?: boolean }) => !s.isDefault);
          const uniqueMap = new Map();
          [...customScenarios, ...DEFAULT_SCENARIOS].forEach(item => uniqueMap.set(item.id, item));
          return Array.from(uniqueMap.values());
        }
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_SCENARIOS;
  });

  const [selectedScenarioId, setSelectedScenarioId] = useState<number>(() => scenarios[0]?.id || 1);
  const [showOptions, setShowOptions] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState<'A' | 'B' | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newOptA, setNewOptA] = useState('');
  const [newOptB, setNewOptB] = useState('');

  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('12C');
  const [targetCareer, setTargetCareer] = useState('');
  const [swot, setSwot] = useState({ strengths: '', weaknesses: '', opportunities: '', threats: '' });
  const [admissionMode, setAdmissionMode] = useState<'lookup' | 'advise'>('lookup');
  const [electiveSub1, setElectiveSub1] = useState('Tiếng Anh');
  const [electiveSub2, setElectiveSub2] = useState('Lịch sử');
  const [selectedComboCode, setSelectedComboCode] = useState('D01');
  const [strongSubjects, setStrongSubjects] = useState<string[]>(['Toán', 'Tin học']);
  const [adviseDomain, setAdviseDomain] = useState<string>('Nghiên cứu & Công nghệ');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('hdtn12_master_submissions') || '[]');
    setSubmissions(saved);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Khởi tạo Game Sinh Tồn (Bốc ngẫu nhiên 4 câu từ 40 câu)
    setActiveQuizzes(getRandomQuizzes(4));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getRandomQuizzes = (n: number) => {
    const shuffled = [...ALL_SURVIVAL_QUIZZES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  const syncDiscoveryToMappingAndAdmission = () => {
    if (selfBranch === 'branch1_clear' && b1TargetJob) setTargetCareer(b1TargetJob);
    else if (selfBranch === 'branch2_compare') {
      const total1 = b2Scores.opt1Passion + b2Scores.opt1Ability + b2Scores.opt1Finance;
      const total2 = b2Scores.opt2Passion + b2Scores.opt2Ability + b2Scores.opt2Finance;
      setTargetCareer(total1 >= total2 ? b2Option1 : b2Option2);
    } else if (selectedDomain) {
      setTargetCareer(selectedDomain);
      setAdviseDomain(selectedDomain);
      if (strengthAnswers.length > 0) setSwot(prev => ({ ...prev, strengths: strengthAnswers[0] }));
    }
  };

  // CƠ CHẾ AI LAI (HYBRID)
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    const updatedMsgs = [...chatMessages, { sender: 'user' as const, text: userText }];
    setChatMessages(updatedMsgs);
    setInputMessage('');
    setIsChatLoading(true);

    if (!navigator.onLine) {
      setTimeout(() => executeFallbackAI(userText, updatedMsgs), 800);
      return;
    }

    try {
      const systemPrompt = `Bạn là chuyên gia tư vấn hướng nghiệp tâm lý cho học sinh lớp 12 tại VN. Tên bạn là Trợ lý AI Hướng Nghiệp. Trả lời súc tích (3-4 câu), ngôn ngữ gần gũi, truyền cảm hứng. Câu hỏi: "${userText}"`;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt }] }] })
      });

      if (!response.ok) throw new Error("API bị chặn");

      const data = await response.json();
      if (data.candidates && data.candidates.length > 0) {
        setChatMessages(prev => [...prev, { sender: 'ai', text: `🤖 [AI]: ${data.candidates[0].content.parts[0].text}`, mode: 'online' }]);
        setIsChatLoading(false);
      } else throw new Error("Phản hồi rỗng");
    } catch (error) {
      executeFallbackAI(userText, updatedMsgs);
    }
  };

  const executeFallbackAI = (userText: string, currentHistory: ChatMessage[]) => {
    const lowerInput = userText.toLowerCase().trim();
    let fallbackText = "";
    if (['chào', 'hi', 'hello', 'alo', 'xin chào'].some(kw => lowerInput === kw || lowerInput.includes(`${kw} `))) {
      fallbackText = "Chào em! Rất vui được đồng hành cùng em. Em đang gặp vướng mắc gì về việc chọn ngành, chọn trường, hãy kể cho mình nghe nhé!";
    } else {
      for (const item of OFFLINE_AI_BANK) {
        if (item.keywords.some((kw: string) => lowerInput.includes(kw))) {
          fallbackText = item.response.replace('🤖 [AI - Ngoại tuyến]: ', ''); break;
        }
      }
    }
    if (!fallbackText) fallbackText = RANDOM_FALLBACKS[Math.floor(Math.random() * RANDOM_FALLBACKS.length)];
    setChatMessages([...currentHistory, { sender: 'ai', text: `🤖 [AI]: ${fallbackText}`, mode: 'online' }]);
    setIsChatLoading(false);
  };

  // Logic Game 1: Gacha Thẻ bài
  const playGacha = () => {
    if (isGachaSpinning) return;
    setGachaResult(null);
    setIsGachaSpinning(true);
    setTimeout(() => {
      const randomCard = GACHA_CARDS[Math.floor(Math.random() * GACHA_CARDS.length)];
      setGachaResult(randomCard);
      setIsGachaSpinning(false);
    }, 1200);
  };

  // Logic Game 2: Sinh tồn (Random)
  const handleQuizAnswer = (optIndex: number, points: number, feedback: string) => {
    if (selectedOptIndex !== null) return;
    setSelectedOptIndex(optIndex);
    setGame2Score(prev => prev + points);
    setGame2Feedback(feedback);
    
    setTimeout(() => {
      if (currentQuizIndex < activeQuizzes.length - 1) {
        setCurrentQuizIndex(prev => prev + 1);
        setSelectedOptIndex(null);
        setGame2Feedback(null);
      } else {
        setIsGame2Finished(true);
      }
    }, 2800); 
  };

  const resetGame2 = () => {
    setActiveQuizzes(getRandomQuizzes(4)); // Bốc lại 4 câu hỏi ngẫu nhiên mới từ 40 câu
    setCurrentQuizIndex(0);
    setGame2Score(0);
    setGame2Feedback(null);
    setSelectedOptIndex(null);
    setIsGame2Finished(false);
  };

  const handleAddCustomScenario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !newOptA.trim() || !newOptB.trim()) { alert('Vui lòng điền đầy đủ!'); return; }
    const newScen = { id: Date.now(), title: newTitle, content: newContent, optionA: newOptA, optionB: newOptB, resultA: '🌟 Phân tích sư phạm: Góc nhìn rất thực tế.', resultB: '⚠️ Phân tích sư phạm: Cần cân nhắc kỹ lưỡng.', isDefault: false };
    const updatedScenarios = [newScen, ...scenarios];
    setScenarios(updatedScenarios); localStorage.setItem('hdtn12_scenarios_bank', JSON.stringify(updatedScenarios));
    setSelectedScenarioId(newScen.id); setShowOptions(false); setChosenAnswer(null); setShowAddModal(false);
  };

  const handleDeleteScenario = (idToDelete: number) => {
    const target = scenarios.find((s: { id: number }) => s.id === idToDelete);
    if (target?.isDefault) { alert('Đây là tình huống chuẩn SGK mặc định, không thể xóa!'); return; }
    if (window.confirm('Xóa tình huống này?')) {
      const updated = scenarios.filter((s: { id: number }) => s.id !== idToDelete);
      setScenarios(updated); localStorage.setItem('hdtn12_scenarios_bank', JSON.stringify(updated));
      if (selectedScenarioId === idToDelete && updated.length > 0) setSelectedScenarioId(updated[0].id);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !targetCareer.trim()) { alert('Nhập đủ họ tên và mục tiêu!'); return; }
    const newRecord: CareerSubmission = { id: `rec_${Date.now()}`, studentName, className, interest: targetCareer, strength: swot.strengths || 'Năng lực tự học số', score: game2Score || 0, choice: 'Đã hoàn thành bản đồ', createdAt: new Date().toLocaleString('vi-VN'), synced: navigator.onLine };
    const updated = [newRecord, ...submissions];
    setSubmissions(updated); localStorage.setItem('hdtn12_master_submissions', JSON.stringify(updated));
    alert('Đã lưu hồ sơ thành công vào Sổ quản lý lớp học!');
  };

  const currentScenario = scenarios.find((s: { id: number }) => s.id === selectedScenarioId) || scenarios[0];
  const my4ExamSubjects = ['Toán', 'Ngữ văn', electiveSub1, electiveSub2];
  const currentComboObj = COMBINATION_BANK.find(c => c.code === selectedComboCode) || COMBINATION_BANK[0];
  const missingSubjects = currentComboObj.subjects.filter(sub => !my4ExamSubjects.includes(sub));
  const recommendedCombos = COMBINATION_BANK.filter(combo => {
    const matchDomain = combo.domains.includes(adviseDomain);
    const matchStrongCount = combo.subjects.filter(s => strongSubjects.includes(s)).length;
    return matchDomain || matchStrongCount >= 2;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white p-6 sm:p-9 rounded-3xl shadow-xl relative border border-emerald-800/60 space-y-4">
          <div className="absolute top-6 right-6">
            {isOnline ? (
              <span className="text-[11px] bg-emerald-700/90 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 shadow-xs border border-emerald-500/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online Mode
              </span>
            ) : (
              <span className="text-[11px] bg-amber-600 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-300"></span> Offline Mode
              </span>
            )}
          </div>

          <div className="pr-36 sm:pr-48 space-y-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wide leading-tight">
              CHẠM TƯƠNG LAI — FUTURE EXPERIENCE 12
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-amber-300 font-extrabold tracking-wide">
              KHÁM PHÁ BẢN THÂN – TRẢI NGHIỆM THẾ GIỚI NGHỀ – KIẾN TẠO TƯƠNG LAI
            </p>
          </div>

          <div className="pt-3 border-t border-emerald-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-semibold text-emerald-100 tracking-wide">
              Không gian trải nghiệm và khám phá tương lai dành cho học sinh lớp 12
            </span>
            <span className="text-xs text-emerald-300 italic font-semibold whitespace-nowrap">
              Ý tưởng & thiết kế: GV NgocHan Le
            </span>
          </div>
        </div>

        {/* NAVBAR */}
        <div className="bg-white p-2 rounded-2xl border shadow-xs flex items-center justify-between gap-1 overflow-x-auto whitespace-nowrap scrollbar-none">
          <div className="flex items-center gap-1">
            <button onClick={() => setActiveTab('home')} className={`px-2.5 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${activeTab === 'home' ? 'bg-emerald-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-emerald-50'}`}>🏠 Trang chủ</button>
            <button onClick={() => setActiveTab('self')} className={`px-2.5 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${activeTab === 'self' ? 'bg-emerald-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-emerald-50'}`}>🪞 Khám phá chính mình</button>
            <button onClick={() => setActiveTab('market')} className={`px-2.5 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${activeTab === 'market' ? 'bg-emerald-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-emerald-50'}`}>🌍 Thế giới nghề</button>
            <button onClick={() => setActiveTab('market_intel')} className={`px-2.5 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${activeTab === 'market_intel' ? 'bg-emerald-900 text-white shadow-sm' : 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'}`}>📈 Hiểu thị trường</button>
            <button onClick={() => setActiveTab('mapping')} className={`px-2.5 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${activeTab === 'mapping' ? 'bg-emerald-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-emerald-50'}`}>🧭 Bản đồ nghề nghiệp</button>
            <button onClick={() => setActiveTab('chat_ai')} className={`px-2.5 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${activeTab === 'chat_ai' ? 'bg-emerald-900 text-white shadow-sm' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}`}>🤖 Trợ lý AI</button>
            <button onClick={() => setActiveTab('games')} className={`px-2.5 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${activeTab === 'games' ? 'bg-emerald-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-emerald-50'}`}>🎮 Game</button>
          </div>
          <div className="shrink-0 pl-1">
            <button onClick={() => setActiveTab('teacher')} className={`px-2.5 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${activeTab === 'teacher' ? 'bg-emerald-900 text-white shadow-sm' : 'bg-emerald-50 text-emerald-900 border border-emerald-200'}`}>📊 Sổ lớp ({submissions.length})</button>
          </div>
        </div>

        {/* TRANG CHỦ VỚI MÀU SẮC XEN KẼ (PASTEL XANH LÁ & CAM ĐẤT) */}
        {activeTab === 'home' && (
          <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-800 uppercase tracking-wide leading-snug">
                HÀNH TRÌNH HƯỚNG NGHIỆP TUỔI 18
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              
              {/* TRẠM 1: XANH LÁ PASTEL */}
              <div onClick={() => setActiveTab('self')} className="p-6 bg-emerald-50/80 rounded-2xl border border-emerald-300 cursor-pointer hover:shadow-lg hover:border-emerald-500 transition-all space-y-2.5 relative overflow-hidden">
                <span className="absolute top-2 right-4 text-5xl font-black text-emerald-900/10 select-none">01</span>
                <span className="text-[11px] font-black tracking-wider bg-emerald-900 text-white px-2.5 py-1 rounded-md">TRẠM 1</span>
                <h3 className="font-black text-base text-emerald-950 uppercase pt-1">KHÁM PHÁ CHÍNH MÌNH</h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">Đánh giá bản thân qua 3 kịch bản cá nhân hóa: Đã rõ mục tiêu, Còn phân vân hoặc Chưa biết rõ.</p>
              </div>

              {/* TRẠM 2: CAM ĐẤT / VÀNG PASTEL ẤM ÁP */}
              <div onClick={() => setActiveTab('market')} className="p-6 bg-amber-50/90 rounded-2xl border border-amber-300 cursor-pointer hover:shadow-lg hover:border-amber-500 transition-all space-y-2.5 relative overflow-hidden">
                <span className="absolute top-2 right-4 text-5xl font-black text-amber-900/10 select-none">02</span>
                <span className="text-[11px] font-black tracking-wider bg-amber-700 text-white px-2.5 py-1 rounded-md">TRẠM 2</span>
                <h3 className="font-black text-base text-amber-950 uppercase pt-1">THẾ GIỚI NGHỀ</h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">Cập nhật thông tin các nhóm ngành đang khát nhân lực và kỹ năng cốt lõi kỷ nguyên số.</p>
              </div>

              {/* TRẠM 3: XANH LÁ PASTEL */}
              <div onClick={() => { setActiveTab('market_intel'); setMarketIntelTab('situation'); }} className="p-6 bg-emerald-50/80 rounded-2xl border border-emerald-300 cursor-pointer hover:shadow-lg hover:border-emerald-500 transition-all space-y-2.5 relative overflow-hidden">
                <span className="absolute top-2 right-4 text-5xl font-black text-emerald-900/10 select-none">03</span>
                <span className="text-[11px] font-black tracking-wider bg-emerald-900 text-white px-2.5 py-1 rounded-md">TRẠM 3</span>
                <h3 className="font-black text-base text-emerald-950 uppercase pt-1">HIỂU THỊ TRƯỜNG</h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">Xử lý tình huống thực tế, đối chiếu tổ hợp môn xét tuyển Đại học và gợi ý trường phù hợp.</p>
              </div>

              {/* TRẠM 4: CAM ĐẤT / VÀNG PASTEL ẤM ÁP */}
              <div onClick={() => setActiveTab('chat_ai')} className="p-6 bg-amber-50/90 rounded-2xl border border-amber-300 cursor-pointer hover:shadow-lg hover:border-amber-500 transition-all space-y-2.5 relative overflow-hidden">
                <span className="absolute top-2 right-4 text-5xl font-black text-amber-900/10 select-none">04</span>
                <span className="text-[11px] font-black tracking-wider bg-amber-700 text-white px-2.5 py-1 rounded-md">TRẠM 4</span>
                <h3 className="font-black text-base text-amber-950 uppercase pt-1">TRỢ LÝ AI</h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">Giải đáp thắc mắc hướng nghiệp với sức mạnh của AI thông minh được tích hợp trực tiếp.</p>
              </div>

              {/* TRẠM 5: XANH LÁ PASTEL */}
              <div onClick={() => setActiveTab('mapping')} className="p-6 bg-emerald-50/80 rounded-2xl border border-emerald-300 cursor-pointer hover:shadow-lg hover:border-emerald-500 transition-all space-y-2.5 relative overflow-hidden">
                <span className="absolute top-2 right-4 text-5xl font-black text-emerald-900/10 select-none">05</span>
                <span className="text-[11px] font-black tracking-wider bg-emerald-900 text-white px-2.5 py-1 rounded-md">TRẠM 5</span>
                <h3 className="font-black text-base text-emerald-950 uppercase pt-1">BẢN ĐỒ NGHỀ NGHIỆP</h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">Thiết lập ma trận SWOT, chốt mục tiêu nghề nghiệp và lưu trữ hồ sơ vào sổ quản lý lớp.</p>
              </div>

              {/* MINIGAME: CAM ĐẤT / VÀNG PASTEL ẤM ÁP */}
              <div onClick={() => setActiveTab('games')} className="p-6 bg-amber-50/90 rounded-2xl border border-amber-300 cursor-pointer hover:shadow-lg hover:border-amber-500 transition-all space-y-2.5 relative overflow-hidden">
                <span className="absolute top-2 right-4 text-5xl font-black text-amber-900/10 select-none">🎮</span>
                <span className="text-[11px] font-black tracking-wider bg-amber-700 text-white px-2.5 py-1 rounded-md">MINIGAME</span>
                <h3 className="font-black text-base text-amber-950 uppercase pt-1">Thử thách & Thư giãn</h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">Bốc thẻ Gacha (24 ngành nghề) và vượt ải sinh tồn với ngân hàng 40 câu hỏi ngẫu nhiên cực kỳ thú vị.</p>
              </div>

            </div>
          </div>
        )}

        {/* TRẠM 1 */}
        {activeTab === 'self' && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border shadow-sm space-y-8 animate-fadeIn">
            {selfBranch === 'intro' && (
              <div className="text-center max-w-2xl mx-auto space-y-6 py-6">
                <span className="text-xs font-black tracking-widest bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-lg uppercase">Trạm 1: Khám phá chính mình — Câu chuyện của tôi</span>
                <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 leading-snug">Nếu ngày mai phải lựa chọn một con đường cho tương lai, bạn có biết mình thực sự muốn gì không?</h2>
                <div className="grid grid-cols-1 gap-4 pt-4">
                  <button onClick={() => { setUserChoiceType('Đã có mục tiêu tương lai'); setSelfBranch('branch1_clear'); }} className="p-5 text-left border-2 border-emerald-300 hover:border-emerald-800 bg-emerald-50/50 hover:bg-emerald-900 hover:text-white rounded-2xl transition-all cursor-pointer shadow-xs group relative">
                    <div className="font-black text-base pr-8">🎯 Tôi đã có mục tiêu tương lai.</div>
                    <p className="text-xs opacity-80 mt-1 font-medium">Đi thẳng vào thẩm định tính khả thi và kế hoạch hành động cho mục tiêu của bạn.</p>
                    <span className="absolute bottom-4 right-4 w-7 h-7 rounded-full bg-emerald-800 text-white group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center font-bold text-xs transition-colors">➔</span>
                  </button>
                  <button onClick={() => { setUserChoiceType('Còn phân vân giữa vài lựa chọn'); setSelfBranch('branch2_compare'); }} className="p-5 text-left border-2 border-amber-300 hover:border-amber-700 bg-amber-50/50 hover:bg-amber-800 hover:text-white rounded-2xl transition-all cursor-pointer shadow-xs group relative">
                    <div className="font-black text-base pr-8">🤔 Tôi có một vài lựa chọn nhưng còn phân vân.</div>
                    <p className="text-xs opacity-80 mt-1 font-medium">Đặt 2 ngành nghề đang phân vân lên bàn cân chấm điểm theo đam mê, năng lực và điều kiện.</p>
                    <span className="absolute bottom-4 right-4 w-7 h-7 rounded-full bg-amber-700 text-white group-hover:bg-white group-hover:text-amber-900 flex items-center justify-center font-bold text-xs transition-colors">➔</span>
                  </button>
                  <button onClick={() => { setUserChoiceType('Chưa biết mình phù hợp với điều gì'); setSelfBranch('branch3_explore'); setB3SubStep(1); }} className="p-5 text-left border-2 border-teal-300 hover:border-teal-800 bg-teal-50/50 hover:bg-teal-900 hover:text-white rounded-2xl transition-all cursor-pointer shadow-xs group relative">
                    <div className="font-black text-base pr-8">🌱 Tôi chưa biết mình phù hợp với điều gì.</div>
                    <p className="text-xs opacity-80 mt-1 font-medium">Thực hiện 3 hoạt động khám phá sở thích, giải mã năng lực đặc thù và giá trị nghề nghiệp.</p>
                    <span className="absolute bottom-4 right-4 w-7 h-7 rounded-full bg-teal-800 text-white group-hover:bg-amber-300 group-hover:text-slate-950 flex items-center justify-center font-bold text-xs transition-colors">➔</span>
                  </button>
                </div>
              </div>
            )}
            {selfBranch === 'branch1_clear' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-emerald-50 border-2 border-emerald-200 p-4 rounded-2xl text-xs sm:text-sm font-semibold text-emerald-950">💬 Hệ thống: "Tuyệt vời! Việc sớm xác định mục tiêu là lợi thế rất lớn. Hãy cùng kiểm chứng xem mục tiêu đó đã thực sự vững chắc chưa nhé!"</div>
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-black text-emerald-950">🎯 Thử thách Thẩm định Mục tiêu Nghề nghiệp</h3>
                  <div>
                    <label className="font-bold text-sm block mb-1.5">1. Ngành học / Nghề nghiệp mục tiêu bạn đã chọn là gì?</label>
                    <input type="text" placeholder="VD: Bác sĩ Quân y, Kỹ sư Phần mềm, Sư phạm Tiểu học..." value={b1TargetJob} onChange={e => setB1TargetJob(e.target.value)} className="w-full px-4 py-3 border-2 border-emerald-600 rounded-xl font-bold text-sm bg-white" />
                  </div>
                  <div className="space-y-2.5 pt-2">
                    <label className="font-bold text-sm block">2. Đánh dấu vào những điều bạn ĐÃ CHUẨN BỊ cho mục tiêu này:</label>
                    {['Tôi đã tìm hiểu rõ các trường đào tạo và mức điểm chuẩn 3 năm gần nhất.', 'Tôi biết rõ các môn trong tổ hợp xét tuyển và đang tập trung ôn luyện.', 'Tôi đã hiểu rõ công việc thực tế hằng ngày và cả những vất vả, áp lực của nghề này.', 'Điều kiện tài chính của gia đình (hoặc chính sách miễn học phí) phù hợp với lựa chọn này.', 'Tôi đã trao đổi và nhận được sự đồng thuận, ủng hộ từ bố mẹ.'].map((chk) => {
                      const isChecked = b1Checks.includes(chk);
                      return (
                        <div key={chk} onClick={() => setB1Checks(isChecked ? b1Checks.filter(c => c !== chk) : [...b1Checks, chk])} className={`p-3.5 border-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all flex items-center gap-3 ${isChecked ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-white border-slate-200 hover:bg-emerald-50'}`}>
                          <span>{isChecked ? '✅' : '⬜'}</span><span>{chk}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between pt-4">
                    <button onClick={() => setSelfBranch('intro')} className="px-5 py-2.5 bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer">⬅ Quay lại</button>
                    <button onClick={() => { if(!b1TargetJob.trim()) { alert('Vui lòng nhập tên nghề mục tiêu!'); return; } setSelfBranch('result'); }} className="px-6 py-2.5 bg-emerald-900 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md">✨ Xem Đánh giá Độ khớp Mục tiêu ➔</button>
                  </div>
                </div>
              </div>
            )}
            {selfBranch === 'branch2_compare' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-2xl text-xs sm:text-sm font-semibold text-amber-950">💬 Hệ thống: "Phân vân giữa các ngã rẽ là điều rất bình thường ở tuổi 18. Hãy đặt 2 lựa chọn lên bàn cân định lượng để tìm ra câu trả lời!"</div>
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-black text-emerald-950">⚖️ Bàn Cân So Sánh 2 Lựa Chọn Ngành Nghề</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300"><label className="font-black text-xs uppercase text-emerald-900 block mb-1">Lựa chọn 1</label><input type="text" placeholder="VD: Công nghệ thông tin" value={b2Option1} onChange={e => setB2Option1(e.target.value)} className="w-full px-3 py-2 border rounded-xl font-bold text-sm bg-white" /></div>
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300"><label className="font-black text-xs uppercase text-amber-900 block mb-1">Lựa chọn 2</label><input type="text" placeholder="VD: Sư phạm / Kinh tế" value={b2Option2} onChange={e => setB2Option2(e.target.value)} className="w-full px-3 py-2 border rounded-xl font-bold text-sm bg-white" /></div>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border space-y-4 text-xs sm:text-sm">
                    <p className="font-bold text-slate-700">Chấm điểm từ 1 (Thấp) đến 5 (Rất cao) cho từng tiêu chí:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b pb-3">
                      <div><label className="font-bold block mb-1">💖 Mức độ yêu thích ({b2Option1 || 'Lựa chọn 1'}): {b2Scores.opt1Passion}/5</label><input type="range" min="1" max="5" value={b2Scores.opt1Passion} onChange={e => setB2Scores({...b2Scores, opt1Passion: Number(e.target.value)})} className="w-full accent-emerald-800" /></div>
                      <div><label className="font-bold block mb-1">💖 Mức độ yêu thích ({b2Option2 || 'Lựa chọn 2'}): {b2Scores.opt2Passion}/5</label><input type="range" min="1" max="5" value={b2Scores.opt2Passion} onChange={e => setB2Scores({...b2Scores, opt2Passion: Number(e.target.value)})} className="w-full accent-amber-700" /></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b pb-3">
                      <div><label className="font-bold block mb-1">💪 Năng lực môn học đáp ứng ({b2Option1 || 'Lựa chọn 1'}): {b2Scores.opt1Ability}/5</label><input type="range" min="1" max="5" value={b2Scores.opt1Ability} onChange={e => setB2Scores({...b2Scores, opt1Ability: Number(e.target.value)})} className="w-full accent-emerald-800" /></div>
                      <div><label className="font-bold block mb-1">💪 Năng lực môn học đáp ứng ({b2Option2 || 'Lựa chọn 2'}): {b2Scores.opt2Ability}/5</label><input type="range" min="1" max="5" value={b2Scores.opt2Ability} onChange={e => setB2Scores({...b2Scores, opt2Ability: Number(e.target.value)})} className="w-full accent-amber-700" /></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className="font-bold block mb-1">🏡 Phù hợp hoàn cảnh gia đình ({b2Option1 || 'Lựa chọn 1'}): {b2Scores.opt1Finance}/5</label><input type="range" min="1" max="5" value={b2Scores.opt1Finance} onChange={e => setB2Scores({...b2Scores, opt1Finance: Number(e.target.value)})} className="w-full accent-emerald-800" /></div>
                      <div><label className="font-bold block mb-1">🏡 Phù hợp hoàn cảnh gia đình ({b2Option2 || 'Lựa chọn 2'}): {b2Scores.opt2Finance}/5</label><input type="range" min="1" max="5" value={b2Scores.opt2Finance} onChange={e => setB2Scores({...b2Scores, opt2Finance: Number(e.target.value)})} className="w-full accent-amber-700" /></div>
                    </div>
                  </div>
                  <div className="flex justify-between pt-2">
                    <button onClick={() => setSelfBranch('intro')} className="px-5 py-2.5 bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer">⬅ Quay lại</button>
                    <button onClick={() => { if(!b2Option1.trim() || !b2Option2.trim()) { alert('Vui lòng nhập tên 2 ngành đang phân vân!'); return; } setSelfBranch('result'); }} className="px-6 py-2.5 bg-emerald-900 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md">✨ Xem Kết quả Bàn cân So sánh ➔</button>
                  </div>
                </div>
              </div>
            )}
            {selfBranch === 'branch3_explore' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-teal-50 border-2 border-teal-200 p-4 rounded-2xl text-xs sm:text-sm font-semibold text-teal-950">💬 Hệ thống: "Không sao cả! Hành trình 3 hoạt động dưới đây được tạo ra để giúp bạn hiểu mình hơn. Hãy bắt đầu từ những điều nhỏ nhất."</div>
                {b3SubStep === 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    <h3 className="text-lg sm:text-xl font-black text-emerald-950">1️⃣ Hoạt động 1: Tôi thích gì? (Chọn lĩnh vực bạn có thiện cảm nhất)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['Sửa chữa & Kỹ thuật', 'Sáng tạo nghệ thuật', 'Giao tiếp & Xã hội', 'Chăm sóc sức khỏe', 'Nghiên cứu & Công nghệ', 'Kinh doanh & Tài chính', 'Giáo dục & Sư phạm', 'An ninh & Quốc phòng'].map((item) => (
                        <button key={item} onClick={() => { setSelectedDomain(item); setStrengthAnswers([]); }} className={`p-3.5 border-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all text-left flex items-center justify-between ${selectedDomain === item ? 'bg-emerald-900 text-white border-emerald-900 shadow-md' : 'bg-white border-emerald-200 hover:bg-emerald-50 text-slate-800'}`}>
                          <span>{item}</span><span>{selectedDomain === item ? '✅' : '⚪'}</span>
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between pt-4">
                      <button onClick={() => setSelfBranch('intro')} className="px-5 py-2.5 bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer">⬅ Quay lại</button>
                      <button onClick={() => { if(!selectedDomain) { alert('Vui lòng chọn 1 lĩnh vực!'); return; } setB3SubStep(2); }} className="px-6 py-2.5 bg-emerald-900 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md">Sang Hoạt động 2: Giải mã năng lực ➔</button>
                    </div>
                  </div>
                )}
                {b3SubStep === 2 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg sm:text-xl font-black text-emerald-950">2️⃣ Hoạt động 2: Giải mã năng lực của tôi ({selectedDomain})</h3>
                      <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-3 py-1 rounded-lg">Năng lực đặc thù</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600">Chọn những mô tả đúng với thói quen và khả năng của bạn (có thể chọn nhiều):</p>
                    <div className="grid grid-cols-1 gap-3">
                      {(DOMAIN_STRENGTHS_MAP[selectedDomain] || []).map((stmt) => {
                        const isSelected = strengthAnswers.includes(stmt);
                        return (
                          <div key={stmt} onClick={() => setStrengthAnswers(isSelected ? strengthAnswers.filter(s => s !== stmt) : [...strengthAnswers, stmt])} className={`p-4 border-2 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer transition-all flex items-center gap-3 ${isSelected ? 'bg-emerald-900 text-white border-emerald-900 shadow-md' : 'bg-white border-emerald-200 hover:bg-emerald-50 text-slate-800'}`}>
                            <span>{isSelected ? '✅' : '⭕'}</span><span>{stmt}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between pt-4">
                      <button onClick={() => setB3SubStep(1)} className="px-5 py-2.5 bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer">⬅ Quay lại</button>
                      <button onClick={() => { if(strengthAnswers.length === 0) { alert('Hãy chọn ít nhất 1 năng lực!'); return; } setB3SubStep(3); }} className="px-6 py-2.5 bg-emerald-900 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md">Sang Hoạt động 3: Giá trị nghề nghiệp ➔</button>
                    </div>
                  </div>
                )}
                {b3SubStep === 3 && (
                  <div className="space-y-4 animate-fadeIn">
                    <h3 className="text-lg sm:text-xl font-black text-emerald-950">3️⃣ Hoạt động 3: Điều gì quan trọng với tôi?</h3>
                    <p className="text-xs sm:text-sm text-slate-600">Chọn tối đa <strong>3 giá trị nghề nghiệp</strong> quan trọng nhất với bạn:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['Thu nhập ổn định, tài chính vững vàng', 'Được thỏa sức sáng tạo, đổi mới', 'Có lộ trình thăng tiến, phát triển rõ ràng', 'Giúp ích thiết thực cho cộng đồng, xã hội', 'Được làm việc độc lập, tự chủ thời gian', 'Có thời gian trọn vẹn cho gia đình', 'Được học hỏi và nâng cao kiến thức thường xuyên'].map((val) => {
                        const isSelected = valueAnswers.includes(val);
                        return (
                          <div key={val} onClick={() => {
                              if (isSelected) setValueAnswers(valueAnswers.filter(v => v !== val));
                              else {
                                if (valueAnswers.length >= 3) { alert('Chỉ chọn tối đa 3 giá trị!'); return; }
                                setValueAnswers([...valueAnswers, val]);
                              }
                            }} className={`p-4 border-2 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer transition-all flex items-center gap-3 ${isSelected ? 'bg-amber-600 text-white border-amber-600 shadow-md' : 'bg-white border-amber-200 hover:bg-amber-50 text-slate-800'}`}>
                            <span>{isSelected ? '⭐' : '⚪'}</span><span>{val}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between pt-4">
                      <button onClick={() => setB3SubStep(2)} className="px-5 py-2.5 bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer">⬅ Quay lại</button>
                      <button onClick={() => { if(valueAnswers.length === 0) { alert('Vui lòng chọn ít nhất 1 giá trị!'); return; } setSelfBranch('result'); }} className="px-6 py-2.5 bg-emerald-900 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md">✨ Xem Hồ sơ Tổng hợp ➔</button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {selfBranch === 'result' && (
              <div className="max-w-3xl mx-auto space-y-6 text-center py-4 animate-fadeIn">
                <h3 className="text-xl sm:text-2xl font-black text-emerald-950 uppercase">🎉 Kết Quả Khám Phá Bản Thân</h3>
                <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border-2 border-emerald-300 text-left space-y-4 shadow-sm text-xs sm:text-sm">
                  <div><span className="font-bold text-emerald-900 uppercase text-[11px] block">Lựa chọn xuất phát của bạn:</span><span className="font-black text-slate-900 text-base">{userChoiceType}</span></div>
                  {b1TargetJob && (
                    <div className="space-y-2 border-t pt-3">
                      <div><span className="font-bold">Ngành/Nghề mục tiêu:</span> <span className="font-black text-emerald-800 text-base">{b1TargetJob}</span></div>
                      <div><span className="font-bold">Mức độ sẵn sàng thực tế:</span> <span className="font-black text-amber-700">{b1Checks.length}/5 tiêu chí chuẩn bị ({b1Checks.length * 20}%)</span></div>
                      <p className="text-slate-700 font-medium bg-white p-3 rounded-xl border">💡 <strong>Lời khuyên sư phạm:</strong> {b1Checks.length >= 4 ? 'Bạn đã chuẩn bị rất kỹ lưỡng! Hãy chuyển sang bước chọn Tổ hợp xét tuyển để rà soát trường đại học ngay.' : 'Mục tiêu đã có nhưng bạn cần tìm hiểu kỹ hơn về điểm chuẩn, tổ hợp môn và trao đổi thêm với gia đình nhé!'}</p>
                    </div>
                  )}
                  {b2Option1 && b2Option2 && (
                    <div className="space-y-3 border-t pt-3">
                      {(() => {
                        const s1 = b2Scores.opt1Passion + b2Scores.opt1Ability + b2Scores.opt1Finance;
                        const s2 = b2Scores.opt2Passion + b2Scores.opt2Ability + b2Scores.opt2Finance;
                        return (
                          <>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="p-3 bg-white rounded-xl border border-emerald-300"><span className="font-bold block">{b2Option1}</span><span className="text-lg font-black text-emerald-800">{s1}/15 điểm</span></div>
                              <div className="p-3 bg-white rounded-xl border border-amber-300"><span className="font-bold block">{b2Option2}</span><span className="text-lg font-black text-amber-800">{s2}/15 điểm</span></div>
                            </div>
                            <p className="text-slate-800 font-semibold bg-white p-3 rounded-xl border">💡 <strong>Kết luận từ bàn cân:</strong> Cán cân đang nghiêng về <strong>{s1 >= s2 ? b2Option1 : b2Option2}</strong>. Hãy ưu tiên đặt ngành này ở nguyện vọng cao hơn khi xét tuyển!</p>
                          </>
                        );
                      })()}
                    </div>
                  )}
                  {selectedDomain && (
                    <div className="space-y-3 border-t pt-3">
                      <div><span className="font-bold">Lĩnh vực phù hợp nhất:</span> <span className="font-black text-emerald-800 text-base">⭐ {selectedDomain}</span></div>
                      <div><span className="font-bold block">Năng lực đặc thù tự đánh giá:</span><ul className="list-disc pl-5 font-semibold text-slate-800 mt-1 space-y-1">{strengthAnswers.map((s, idx) => <li key={idx}>{s}</li>)}</ul></div>
                      <div><span className="font-bold block mb-1">Giá trị nghề nghiệp cốt lõi:</span><div className="flex flex-wrap gap-1.5">{valueAnswers.map((v, idx) => <span key={idx} className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-lg text-xs">⭐ {v}</span>)}</div></div>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button onClick={() => { setSelfBranch('intro'); setB1TargetJob(''); setB2Option1(''); setSelectedDomain(''); }} className="px-5 py-3 bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer">🔄 Khám phá lại</button>
                  <button onClick={() => { syncDiscoveryToMappingAndAdmission(); setActiveTab('market_intel'); setMarketIntelTab('admission'); }} className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl text-xs sm:text-sm cursor-pointer shadow-md hover:bg-amber-700">🎓 Sang Tư vấn Tổ hợp Xét tuyển ➔</button>
                  <button onClick={() => { syncDiscoveryToMappingAndAdmission(); setActiveTab('mapping'); }} className="px-6 py-3 bg-emerald-900 text-white font-bold rounded-xl text-xs sm:text-sm cursor-pointer shadow-lg hover:bg-emerald-950">🧭 Lưu sang Bản đồ Nghề nghiệp ➔</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TRẠM 2 */}
        {activeTab === 'market' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6">
            <div className="border-b pb-3">
              <h2 className="font-black text-lg sm:text-xl text-emerald-950">🌍 Trạm 2: THẾ GIỚI NGHỀ — Xu hướng ngành nghề & Tác động của AI</h2>
              <p className="text-xs sm:text-sm text-slate-600">Cập nhật thông tin thực tế về các nhóm ngành đang phát triển và kỹ năng nhà tuyển dụng cần.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                <h3 className="font-bold text-sm sm:text-base text-emerald-950">🚀 Nhóm ngành đang phát triển mạnh</h3>
                <p className="text-slate-700 font-medium leading-relaxed">• Chuyên gia Trí tuệ nhân tạo (AI) & Khoa học dữ liệu.<br/>• An ninh mạng & Phát triển phần mềm.<br/>• Nông nghiệp công nghệ cao & Năng lượng xanh.<br/>• Y tế, Chăm sóc sức khỏe & Sư phạm chất lượng cao.</p>
              </div>
              <div className="p-5 bg-teal-50 rounded-2xl border border-teal-200 space-y-2">
                <h3 className="font-bold text-sm sm:text-base text-emerald-950">⚡ Kỹ năng cốt lõi được nhà tuyển dụng quan tâm</h3>
                <p className="text-slate-700 font-medium leading-relaxed">• Năng lực tự học số và thích ứng linh hoạt.<br/>• Tư duy giải quyết vấn đề phức tạp.<br/>• Kỹ năng làm việc nhóm và tuân thủ kỷ luật an toàn lao động.</p>
              </div>
            </div>
          </div>
        )}

        {/* TRẠM 3 */}
        {activeTab === 'market_intel' && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border shadow-sm space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-emerald-950">📈 Trạm 3: HIỂU THỊ TRƯỜNG & TUYỂN SINH</h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Trang bị bản lĩnh qua tình huống thực tế và tính toán tổ hợp xét tuyển Đại học.</p>
              </div>
              <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl border">
                <button onClick={() => setMarketIntelTab('situation')} className={`px-4 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${marketIntelTab === 'situation' ? 'bg-emerald-900 text-white shadow-sm' : 'text-slate-700 hover:bg-white'}`}>🎬 Tình huống thực tế</button>
                <button onClick={() => setMarketIntelTab('admission')} className={`px-4 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${marketIntelTab === 'admission' ? 'bg-emerald-900 text-white shadow-sm' : 'text-slate-700 hover:bg-white'}`}>🎓 Tổ hợp & Xét tuyển ĐH</button>
              </div>
            </div>

            {marketIntelTab === 'situation' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b">
                  <div>
                    <h3 className="text-lg font-black text-emerald-950">Xử lý tình huống thực tế đời sống</h3>
                    <p className="text-xs text-slate-500 mt-0.5">💡 Mẹo: Hãy cho HS suy ngẫm thoải mái, sau đó kích vào nội dung câu hỏi để mở phương án.</p>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <select value={selectedScenarioId} onChange={e => { setSelectedScenarioId(Number(e.target.value)); setShowOptions(false); setChosenAnswer(null); }} className="flex-1 md:flex-initial px-4 py-2.5 border-2 border-emerald-700 rounded-2xl text-xs font-bold bg-emerald-50 text-emerald-950 cursor-pointer shadow-xs focus:outline-none">
                      {scenarios.map((sc: { id: number; title: string }) => (
                        <option key={sc.id} value={sc.id}>{sc.title}</option>
                      ))}
                    </select>
                    {!currentScenario.isDefault && (
                      <button onClick={() => handleDeleteScenario(currentScenario.id)} title="Xóa tình huống này" className="px-3 py-2.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shadow-xs cursor-pointer">🗑️ Xóa</button>
                    )}
                    <button onClick={() => setShowAddModal(!showAddModal)} className="px-4 py-2.5 bg-emerald-900 text-white rounded-2xl text-xs font-bold hover:bg-emerald-950 transition-all whitespace-nowrap shadow-xs cursor-pointer"><span>{showAddModal ? '✖ Đóng' : '➕ Thêm tình huống'}</span></button>
                  </div>
                </div>

                {showAddModal && (
                  <div className="p-6 bg-emerald-50/90 rounded-2xl border-2 border-emerald-300 space-y-4 animate-fadeIn">
                    <div className="flex justify-between items-center">
                      <h4 className="font-black text-sm text-emerald-950 uppercase">➕ Bổ sung tình huống mới vào Ngân hàng</h4>
                      <span className="text-[11px] text-emerald-700 font-semibold">Lưu vĩnh viễn trên trình duyệt</span>
                    </div>
                    <form onSubmit={handleAddCustomScenario} className="space-y-3 text-xs sm:text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div><label className="font-bold block mb-1">Tiêu đề hiển thị trong danh mục</label><input type="text" placeholder="VD: Tình huống 13: Lĩnh vực X..." value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full px-3 py-2.5 border rounded-xl font-bold bg-white" required /></div>
                        <div><label className="font-bold block mb-1">Nội dung câu hỏi tình huống</label><input type="text" placeholder="VD: Em đứng trước ngã rẽ..." value={newContent} onChange={e => setNewContent(e.target.value)} className="w-full px-3 py-2.5 border rounded-xl font-bold bg-white" required /></div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div><label className="font-bold block mb-1">Phương án tích cực (A)</label><input type="text" placeholder="VD: Chủ động lập kế hoạch..." value={newOptA} onChange={e => setNewOptA(e.target.value)} className="w-full px-3 py-2.5 border rounded-xl font-bold bg-white" required /></div>
                        <div><label className="font-bold block mb-1">Phương án chưa tối ưu (B)</label><input type="text" placeholder="VD: Làm theo cảm tính..." value={newOptB} onChange={e => setNewOptB(e.target.value)} className="w-full px-3 py-2.5 border rounded-xl font-bold bg-white" required /></div>
                      </div>
                      <div className="text-right pt-1"><button type="submit" className="px-6 py-2.5 bg-emerald-900 text-white font-bold rounded-xl cursor-pointer text-xs shadow-md">💾 Lưu vào Ngân hàng Tình huống ➔</button></div>
                    </form>
                  </div>
                )}

                <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-50/70 to-teal-50/50 rounded-3xl border-2 border-emerald-200 space-y-6 shadow-sm">
                  <div onClick={() => { setShowOptions(!showOptions); if(showOptions) setChosenAnswer(null); }} className="cursor-pointer group bg-white/80 hover:bg-white p-5 rounded-2xl border-2 border-dashed border-emerald-400 transition-all shadow-xs" title="Kích vào đây để mở/ẩn các phương án trả lời">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">📌</span>
                        <h3 className="font-black text-emerald-950 text-base sm:text-xl leading-relaxed group-hover:text-emerald-800 transition-colors">{currentScenario.content}</h3>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold bg-emerald-900 text-white px-3 py-1.5 rounded-xl shadow-xs animate-pulse">{showOptions ? 'Ẩn phương án 🔼' : 'Kích mở phương án 🔽'}</span>
                      </div>
                    </div>
                  </div>

                  {showOptions && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <button onClick={() => setChosenAnswer('A')} className={`p-5 text-left border-2 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer transition-all shadow-xs flex items-start gap-3 ${chosenAnswer === 'A' ? 'bg-emerald-900 text-white border-emerald-900 shadow-md scale-[1.01]' : 'bg-white border-emerald-300 hover:bg-emerald-100/70 text-slate-900'}`}>
                          <span className="text-lg">💪</span><div><span className="block font-black text-xs uppercase opacity-80 mb-1">Phương án tích cực (A):</span>{currentScenario.optionA}</div>
                        </button>
                        <button onClick={() => setChosenAnswer('B')} className={`p-5 text-left border-2 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer transition-all shadow-xs flex items-start gap-3 ${chosenAnswer === 'B' ? 'bg-amber-800 text-white border-amber-800 shadow-md scale-[1.01]' : 'bg-white border-emerald-300 hover:bg-amber-50 text-slate-900'}`}>
                          <span className="text-lg">⏳</span><div><span className="block font-black text-xs uppercase opacity-80 mb-1">Phương án chưa tối ưu (B):</span>{currentScenario.optionB}</div>
                        </button>
                      </div>
                      {chosenAnswer && (
                        <div className="p-6 bg-white rounded-2xl border-2 border-emerald-400 text-xs sm:text-sm font-bold text-emerald-950 shadow-md animate-fadeIn space-y-2">
                          <div className="flex items-center gap-2 text-emerald-800 font-black uppercase text-xs tracking-wider"><span>💡</span> Phân tích & Đánh giá sư phạm từ hệ thống:</div>
                          <div className="text-slate-800 font-semibold leading-relaxed">{chosenAnswer === 'A' ? currentScenario.resultA : currentScenario.resultB}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {marketIntelTab === 'admission' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-end gap-2 pb-2">
                  <button onClick={() => setAdmissionMode('lookup')} className={`px-4 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${admissionMode === 'lookup' ? 'bg-emerald-900 text-white shadow-md' : 'bg-slate-100 text-slate-700'}`}>🔍 Luồng 1: Tra cứu Tổ hợp & Trường</button>
                  <button onClick={() => setAdmissionMode('advise')} className={`px-4 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${admissionMode === 'advise' ? 'bg-amber-700 text-white shadow-md' : 'bg-amber-50 text-amber-900 border border-amber-200'}`}>💡 Luồng 2: Máy tư vấn Tổ hợp tối ưu</button>
                </div>

                {admissionMode === 'lookup' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 bg-slate-50 rounded-2xl border space-y-4 text-xs sm:text-sm">
                        <h3 className="font-black text-emerald-950 uppercase text-sm">1. Chọn 4 môn thi Tốt nghiệp THPT của em</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-emerald-100/80 border border-emerald-300 rounded-xl font-bold text-emerald-950">🔒 Môn 1: Toán (Bắt buộc)</div>
                          <div className="p-3 bg-emerald-100/80 border border-emerald-300 rounded-xl font-bold text-emerald-950">🔒 Môn 2: Ngữ văn (Bắt buộc)</div>
                          <div><label className="font-bold block mb-1 text-xs">Môn tự chọn 1:</label><select value={electiveSub1} onChange={e => setElectiveSub1(e.target.value)} className="w-full p-2.5 border rounded-xl font-bold bg-white">{EXAM_SUBJECTS.filter(s => s !== 'Toán' && s !== 'Ngữ văn').map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                          <div><label className="font-bold block mb-1 text-xs">Môn tự chọn 2:</label><select value={electiveSub2} onChange={e => setElectiveSub2(e.target.value)} className="w-full p-2.5 border rounded-xl font-bold bg-white">{EXAM_SUBJECTS.filter(s => s !== 'Toán' && s !== 'Ngữ văn' && s !== electiveSub1).map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                        </div>
                      </div>

                      <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-4 text-xs sm:text-sm">
                        <h3 className="font-black text-emerald-950 uppercase text-sm">2. Chọn Tổ hợp xét tuyển Đại học mong muốn</h3>
                        <select value={selectedComboCode} onChange={e => setSelectedComboCode(e.target.value)} className="w-full p-3.5 border-2 border-emerald-700 rounded-xl font-bold bg-white text-emerald-950 cursor-pointer">
                          {COMBINATION_BANK.map(c => (<option key={c.code} value={c.code}>{c.name}</option>))}
                        </select>
                        {missingSubjects.length === 0 ? (
                          <div className="p-3.5 bg-emerald-100 text-emerald-950 rounded-xl border border-emerald-400 font-bold flex items-center gap-2"><span>✅</span><span>Hợp lệ! 4 môn thi Tốt nghiệp của em đã bao gồm đủ 3 môn của tổ hợp {currentComboObj.code}.</span></div>
                        ) : (
                          <div className="p-3.5 bg-red-100 text-red-900 rounded-xl border border-red-400 font-bold flex items-start gap-2"><span>⚠️</span><span>Cảnh báo lệch môn: Tổ hợp {currentComboObj.code} cần môn <strong>{missingSubjects.join(', ')}</strong> nhưng em chưa chọn thi môn này ở kỳ thi Tốt nghiệp!</span></div>
                        )}
                      </div>
                    </div>

                    <div className="p-6 bg-white rounded-3xl border-2 border-emerald-300 shadow-sm space-y-4 text-xs sm:text-sm">
                      <h3 className="font-black text-base sm:text-lg text-emerald-950 uppercase">🏫 Gợi ý Ngành & Trường Đại học xét tuyển tổ hợp {currentComboObj.name}</h3>
                      <div><span className="font-bold text-slate-600 block">Các nhóm ngành tiêu biểu:</span><p className="font-black text-emerald-900 text-sm sm:text-base mt-0.5">{currentComboObj.majors}</p></div>
                      <div><span className="font-bold text-slate-600 block mb-1.5">Danh sách các trường Đại học tiêu biểu (Phân tầng điểm chuẩn):</span><div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">{currentComboObj.universities.map((uni, idx) => (<div key={idx} className="p-3 bg-slate-50 rounded-xl border font-semibold text-slate-800 flex items-center gap-2"><span className="text-emerald-700 font-black">•</span><span>{uni}</span></div>))}</div></div>
                      <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl text-amber-950 font-semibold">{currentComboObj.warning}</div>
                    </div>
                  </div>
                )}

                {admissionMode === 'advise' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                      <div className="p-5 bg-slate-50 rounded-2xl border space-y-3">
                        <h3 className="font-black text-emerald-950 uppercase text-sm">1. Chọn 2 đến 3 môn học sở trường nhất của em</h3>
                        <div className="flex flex-wrap gap-2">
                          {EXAM_SUBJECTS.map(sub => {
                            const isSel = strongSubjects.includes(sub);
                            return (
                              <button key={sub} onClick={() => { if (isSel) setStrongSubjects(strongSubjects.filter(s => s !== sub)); else { if (strongSubjects.length >= 3) { alert('Chỉ chọn tối đa 3 môn sở trường nhất!'); return; } setStrongSubjects([...strongSubjects, sub]); } }} className={`px-3.5 py-2 rounded-xl font-bold cursor-pointer border transition-all ${isSel ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-white text-slate-700 hover:bg-emerald-50'}`}>{isSel ? `⭐ ${sub}` : sub}</button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-3">
                        <h3 className="font-black text-amber-950 uppercase text-sm">2. Chọn lĩnh vực nghề nghiệp em yêu thích</h3>
                        <select value={adviseDomain} onChange={e => setAdviseDomain(e.target.value)} className="w-full p-3.5 border-2 border-amber-600 rounded-xl font-bold bg-white text-slate-900 cursor-pointer">{Object.keys(DOMAIN_STRENGTHS_MAP).map(dom => (<option key={dom} value={dom}>{dom}</option>))}</select>
                        <p className="text-xs text-slate-600">Hệ thống sẽ đối chiếu môn học thế mạnh và lĩnh vực nghề để tìm ra tổ hợp xét tuyển có lợi nhất cho em.</p>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border-2 border-emerald-300 space-y-4 text-xs sm:text-sm">
                      <h3 className="font-black text-base sm:text-lg text-emerald-950 uppercase">💡 Lời khuyên Chiến lược Chọn Tổ hợp & Môn thi Tốt nghiệp</h3>
                      <p className="font-semibold text-slate-700">Với thế mạnh môn <strong>{strongSubjects.join(', ')}</strong> và định hướng lĩnh vực <strong>{adviseDomain}</strong>, hệ thống đề xuất các tổ hợp tối ưu sau:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recommendedCombos.map(combo => (
                          <div key={combo.code} className="p-4 bg-white rounded-2xl border border-emerald-300 shadow-xs space-y-2">
                            <div className="flex justify-between items-center"><span className="font-black text-emerald-950 text-sm sm:text-base">{combo.name}</span><button onClick={() => { setSelectedComboCode(combo.code); setAdmissionMode('lookup'); }} className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2.5 py-1 rounded-lg cursor-pointer hover:bg-emerald-200">Xem trường ĐH ➔</button></div>
                            <p className="text-xs text-slate-600"><strong>Ngành phù hợp:</strong> {combo.majors}</p>
                            <p className="text-[11px] text-amber-800 font-semibold">{combo.warning}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TRẠM 5 */}
        {activeTab === 'mapping' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6">
            <div className="border-b pb-3">
              <h2 className="font-black text-lg sm:text-xl text-emerald-950">🧭 Trạm 5: BẢN ĐỒ NGHỀ NGHIỆP — Ma trận SWOT Cá nhân</h2>
              <p className="text-xs sm:text-sm text-slate-600">Xây dựng hồ sơ cá nhân hóa và lưu trữ trực tiếp vào sổ quản lý của giáo viên.</p>
            </div>
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div><label className="font-semibold block mb-1">Họ và tên học sinh</label><input type="text" required placeholder="VD: Nguyễn Văn A" value={studentName} onChange={e => setStudentName(e.target.value)} className="w-full px-3 py-2.5 border rounded-xl font-bold bg-white" /></div>
                <div><label className="font-semibold block mb-1">Lớp</label><input type="text" value={className} onChange={e => setClassName(e.target.value)} className="w-full px-3 py-2.5 border rounded-xl font-bold bg-white" /></div>
                <div><label className="font-semibold block mb-1">Ngành nghề mục tiêu</label><input type="text" required placeholder="VD: Công nghệ thông tin..." value={targetCareer} onChange={e => setTargetCareer(e.target.value)} className="w-full px-3 py-2.5 border rounded-xl font-bold bg-white" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-emerald-50 rounded-xl border"><label className="font-semibold block mb-1">Điểm mạnh (Strengths)</label><input type="text" placeholder="VD: Cẩn thận, tư duy tốt..." value={swot.strengths} onChange={e => setSwot({...swot, strengths: e.target.value})} className="w-full px-2.5 py-1.5 border rounded-lg bg-white" /></div>
                <div className="p-3 bg-amber-50 rounded-xl border"><label className="font-semibold block mb-1">Điểm yếu (Weaknesses)</label><input type="text" placeholder="VD: Còn rụt rè..." value={swot.weaknesses} onChange={e => setSwot({...swot, weaknesses: e.target.value})} className="w-full px-2.5 py-1.5 border rounded-lg bg-white" /></div>
              </div>
              <button type="submit" className="px-6 py-3.5 bg-emerald-900 text-white font-bold rounded-xl cursor-pointer text-xs sm:text-sm shadow-md hover:bg-emerald-950">💾 Lưu Hồ sơ Bản đồ Nghề nghiệp vào Sổ lớp</button>
            </form>
          </div>
        )}

        {/* TRẠM 4 */}
        {activeTab === 'chat_ai' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border shadow-sm space-y-4">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h2 className="font-black text-base sm:text-lg text-emerald-950">🤖 Trạm 4: TRỢ LÝ AI — Người bạn đồng hành</h2>
                <p className="text-xs sm:text-sm text-slate-500">Tư vấn thông minh. Luôn sẵn sàng giải đáp ngay cả khi mất mạng.</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${isOnline ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {isOnline ? '🟢 Đã sẵn sàng' : '🟠 Sẵn sàng (Offline)'}
              </span>
            </div>

            <div className="h-80 overflow-y-auto p-4 bg-slate-50 rounded-2xl border space-y-3 flex flex-col">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xl p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${msg.sender === 'user' ? 'bg-emerald-900 text-white' : 'bg-white text-slate-800 border'}`}>{msg.text}</div>
                </div>
              ))}
              {isChatLoading && <div className="text-xs text-slate-400 italic">Trợ lý AI đang suy nghĩ...</div>}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input type="text" placeholder="Hỏi Trợ lý AI..." value={inputMessage} onChange={e => setInputMessage(e.target.value)} className="flex-1 px-4 py-3 border rounded-xl text-xs sm:text-sm" />
              <button type="submit" className="px-6 py-3 bg-emerald-900 text-white font-bold rounded-xl text-xs sm:text-sm cursor-pointer">Gửi 🚀</button>
            </form>
          </div>
        )}

        {/* ======================================================== */}
        {/* COMPONENT: MINIGAME (24 THẺ GACHA & NGÂN HÀNG 40 CÂU SINH TỒN) */}
        {/* ======================================================== */}
        {activeTab === 'games' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 animate-fadeIn">
            <div className="border-b pb-3">
              <h2 className="font-black text-xl sm:text-2xl text-emerald-950 uppercase tracking-tight">🎮 Tổ Hợp Game Giải Trí Hướng Nghiệp</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Xả stress sau giờ học với những bài test nhân phẩm và kỹ năng sinh tồn chuẩn Gen Z.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* GAME 1: GACHA NGHỀ NGHIỆP (24 THẺ BÀI) */}
              <div className="p-1 bg-gradient-to-br from-purple-300 via-pink-300 to-amber-300 rounded-3xl shadow-lg hover:shadow-xl transition-all">
                <div className="bg-white/95 p-6 rounded-[22px] h-full flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black tracking-widest bg-purple-900 text-white px-3 py-1.5 rounded-lg uppercase shadow-md">Game 01</span>
                    <span className="text-purple-950 font-black text-sm uppercase tracking-wider">🔮 Gacha Nhân Phẩm (24 Ngành)</span>
                  </div>
                  
                  <div className="text-center space-y-1 pb-2">
                    <h3 className="font-black text-lg text-slate-900">Bốc Thẻ Bài Tương Lai</h3>
                    <p className="text-xs text-slate-500 font-medium">Kho thẻ phong phú với 24 ngành nghề hot nhất. Bạn sẽ bốc trúng nghề gì?</p>
                  </div>
                  
                  {/* Khu vực thẻ bài */}
                  <div className="flex-1 flex items-center justify-center min-h-[220px] p-4 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 relative overflow-hidden">
                    {isGachaSpinning ? (
                      <div className="text-center space-y-3 animate-pulse">
                        <div className="text-5xl">🔮</div>
                        <div className="font-black text-slate-700 text-sm tracking-widest uppercase">Đang vận nội công bốc thẻ...</div>
                      </div>
                    ) : gachaResult ? (
                      <div className={`w-full h-full rounded-2xl p-5 bg-gradient-to-br ${gachaResult.color} text-white shadow-xl ${gachaResult.shadow} flex flex-col justify-center items-center text-center space-y-3 transform hover:scale-105 transition-transform cursor-pointer animate-fadeIn`}>
                        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full font-black text-xs tracking-widest border border-white/30">
                          Độ hiếm: {gachaResult.rank}
                        </div>
                        <h4 className="font-black text-xl leading-tight text-white drop-shadow-md">{gachaResult.title}</h4>
                        <p className="text-xs sm:text-sm font-semibold opacity-90">{gachaResult.desc}</p>
                      </div>
                    ) : (
                      <div className="text-center text-slate-400 font-bold text-sm">Chưa có thẻ nào được bốc. Hãy bấm nút bên dưới!</div>
                    )}
                  </div>
                  
                  <button onClick={playGacha} disabled={isGachaSpinning} className="w-full py-4 bg-purple-900 text-white font-black uppercase tracking-widest rounded-xl cursor-pointer hover:bg-purple-950 transition-all shadow-md text-sm disabled:opacity-50">
                    {isGachaSpinning ? 'Đang quay...' : '🎲 Bốc Thẻ Nhân Phẩm Ngay'}
                  </button>
                </div>
              </div>

              {/* GAME 2: SINH TỒN CHỌN NGHỀ (Random 4/40 câu) */}
              <div className="p-1 bg-gradient-to-br from-emerald-300 via-teal-300 to-cyan-300 rounded-3xl shadow-lg hover:shadow-xl transition-all">
                <div className="bg-white/95 p-6 rounded-[22px] h-full flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black tracking-widest bg-emerald-900 text-white px-3 py-1.5 rounded-lg uppercase shadow-md">Game 02</span>
                    <span className="text-emerald-950 font-black text-sm uppercase tracking-wider">🏝️ Sinh Tồn Tuổi 18 (40 Câu Hỏi)</span>
                  </div>

                  {!isGame2Finished && activeQuizzes.length > 0 ? (
                    <>
                      <div className="space-y-3">
                        <div className="flex justify-between items-end">
                          <h3 className="font-black text-lg text-slate-900">Vượt Ải Hướng Nghiệp</h3>
                          <span className="font-black text-emerald-700 text-sm">Điểm: {game2Score}</span>
                        </div>
                        {/* Thanh Tiến Trình */}
                        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${((currentQuizIndex) / activeQuizzes.length) * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-500 font-bold">Câu hỏi ngẫu nhiên {currentQuizIndex + 1} / {activeQuizzes.length}</p>
                      </div>

                      {/* Câu hỏi */}
                      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 font-black text-emerald-950 text-sm sm:text-base leading-relaxed">
                        {activeQuizzes[currentQuizIndex]?.question}
                      </div>

                      {/* Nút Trả lời */}
                      <div className="space-y-3 flex-1">
                        {activeQuizzes[currentQuizIndex]?.options.map((opt: any, idx: number) => {
                          const isSelected = selectedOptIndex === idx;
                          const isShowingFeedback = selectedOptIndex !== null;
                          return (
                            <button 
                              key={idx} 
                              onClick={() => handleQuizAnswer(idx, opt.points, opt.feedback)} 
                              disabled={isShowingFeedback}
                              className={`w-full p-3.5 text-left border-2 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all ${
                                isShowingFeedback 
                                  ? isSelected 
                                    ? (opt.points > 0 ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-red-600 text-white border-red-600') 
                                    : 'bg-slate-50 text-slate-400 border-slate-200 opacity-50'
                                  : 'bg-white border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 text-slate-800'
                              }`}
                            >
                              {opt.text}
                            </button>
                          );
                        })}
                      </div>

                      {/* Nhận xét bay lên */}
                      {game2Feedback && (
                        <div className={`p-4 rounded-xl font-bold text-xs sm:text-sm text-center animate-fadeIn ${game2Feedback.includes('Tấm chiếu mới') || game2Feedback.includes('nguy hiểm') || game2Feedback.includes('Sai lầm') || game2Feedback.includes('Toang') || game2Feedback.includes('Báo động') ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-emerald-100 text-emerald-900 border border-emerald-200'}`}>
                          {game2Feedback}
                        </div>
                      )}
                    </>
                  ) : (
                    // Kết quả cuối cùng
                    <div className="flex-1 flex flex-col justify-center items-center text-center space-y-5 animate-fadeIn p-4">
                      <div className="text-6xl">🏆</div>
                      <div className="space-y-2">
                        <h3 className="font-black text-2xl text-emerald-950 uppercase">Kết Quả Sinh Tồn</h3>
                        <p className="text-slate-600 font-medium">Tổng điểm bản lĩnh của bạn:</p>
                        <div className="text-4xl font-black text-emerald-700">{game2Score} Điểm</div>
                      </div>
                      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 font-bold text-sm text-emerald-900">
                        {game2Score >= 45 ? "Đánh giá: CHIẾN THẦN HƯỚNG NGHIỆP! Khó ai lừa được bạn." : "Đánh giá: TẤM CHIẾU MỚI! Bạn cần cẩn thận hơn trước các bẫy hướng nghiệp nhé."}
                      </div>
                      <button onClick={resetGame2} className="px-6 py-3 bg-emerald-900 text-white font-bold rounded-xl shadow-md hover:bg-emerald-950 transition-colors">
                        🔄 Chơi Lại (Bốc 4 Câu Mới)
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SỔ QUẢN LÝ */}
        {activeTab === 'teacher' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border shadow-sm space-y-4">
            <div className="border-b pb-4 flex justify-between items-center">
              <div>
                <h2 className="font-black text-lg sm:text-xl text-emerald-950">📊 Sổ quản lý & Thống kê Hồ sơ Hướng nghiệp Lớp học</h2>
                <p className="text-xs sm:text-sm text-slate-600">Quản lý danh sách học sinh hoàn thành các khu vực trải nghiệm trên cả Online & Offline.</p>
              </div>
              <button onClick={() => alert('Đã đồng bộ dữ liệu Cloud thành công!')} className="px-4 py-2 bg-emerald-100 text-emerald-900 rounded-xl text-xs sm:text-sm font-bold cursor-pointer">🔄 Đồng bộ Cloud</button>
            </div>
            {submissions.length === 0 ? <p className="text-xs text-slate-500 py-12 text-center">Chưa có hồ sơ học sinh nào gửi.</p> : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead><tr className="bg-slate-100 text-slate-700"><th className="p-3 border">Họ tên</th><th className="p-3 border">Lớp</th><th className="p-3 border">Mục tiêu nghề nghiệp</th><th className="p-3 border">Điểm thử thách</th><th className="p-3 border">Thời gian</th><th className="p-3 border">Trạng thái</th></tr></thead>
                  <tbody>
                    {submissions.map(sub => (
                      <tr key={sub.id} className="border-b hover:bg-slate-50">
                        <td className="p-3 border font-bold">{sub.studentName}</td>
                        <td className="p-3 border">{sub.className}</td>
                        <td className="p-3 border text-emerald-800 font-bold">{sub.interest}</td>
                        <td className="p-3 border font-bold">{sub.score} / {(activeQuizzes.length * 20) || 80}</td>
                        <td className="p-3 border text-slate-500">{sub.createdAt}</td>
                        <td className="p-3 border">{sub.synced ? <span className="text-emerald-700 font-bold">🟢 Đã đồng bộ</span> : <span className="text-amber-600 font-bold">🟠 Lưu Offline</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}