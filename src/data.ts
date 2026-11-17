// src/data.ts

export const OFFLINE_AI_BANK = [
  {
    keywords: ['không giỏi toán', 'sợ toán', 'học toán không tốt', 'máy tính'],
    response: '🤖 [AI - Ngoại tuyến]: Thầy cô và hệ thống rất hiểu băn khoăn của em! Nếu em thích công nghệ/máy tính nhưng học Toán chưa tốt, em hoàn toàn có thể chọn các hướng đi như: Quản trị mạng, Thiết kế đồ họa số, Truyền thông đa phương tiện hoặc Lập trình ứng dụng thực chiến.'
  },
  {
    keywords: ['chăm sóc người khác', 'y tế', 'giúp đỡ', 'sức khỏe'],
    response: '🤖 [AI - Ngoại tuyến]: Theo cẩm nang hướng nghiệp, nếu em có sở thích chăm sóc người khác, các nhóm ngành rất phù hợp gồm: Bác sĩ, Điều dưỡng, Y sĩ, Công tác xã hội hoặc Chăm sóc sắc đẹp công nghệ cao.'
  },
  {
    keywords: ['dân tộc', 'vùng cao', 'khó khăn', 'ưu tiên'],
    response: '🤖 [AI - Ngoại tuyến]: Đối với học sinh dân tộc thiểu số và vùng khó khăn, em có các chính sách hỗ trợ tuyệt vời như: Chế độ cử tuyển, ưu tiên vào đại học hoặc học tại các trường trung cấp nghề miễn phí học phí.'
  },
  {
    keywords: ['không học đại học', 'trường nghề', 'cao đẳng', 'con đường khác'],
    response: '🤖 [AI - Ngoại tuyến]: Đại học không phải là con đường duy nhất! Theo Chủ đề 10, em hoàn toàn có thể chọn hệ Cao đẳng nghề / Trung cấp (học 1.5 - 2 năm, ra trường có việc làm ngay với thu nhập ổn định).'
  },
  {
    keywords: ['hoàn cảnh', 'tiền', 'nghèo', 'học phí cao', 'không có điều kiện'],
    response: '🤖 [AI - Ngoại tuyến]: Đừng quá lo lắng về kinh tế em nhé! Em có thể chọn các khối trường Quân đội, Công an, Sư phạm (được miễn 100% học phí) hoặc vay vốn tín dụng sinh viên.'
  }
];

export const DEFAULT_OFFLINE_REPLY = 
  "🤖 [AI - Hướng dẫn chung]: Chào em, hiện thiết bị đang ở chế độ ngoại tuyến (Offline). Để định hướng đúng, em hãy trải nghiệm các khu vực trên website nhé!";

export const DEFAULT_SCENARIOS = [
  {
    id: 1,
    title: 'Tình huống 1: Đam mê cá nhân và truyền thống gia đình',
    content: 'Một học sinh rất đam mê Công nghệ thông tin nhưng gia đình ép phải thi học kinh tế theo truyền thống kinh doanh của gia đình. Nếu là em, em sẽ xử lý như thế nào?',
    optionA: 'Lập bảng kế hoạch học tập, số liệu việc làm CNTT để phân tích và thuyết phục cha mẹ bằng sự chân thành.',
    optionB: 'Buông xuôi, nộp hồ sơ theo ý cha mẹ dù trong lòng không thích.',
    resultA: '🌟 Đánh giá sư phạm: Rất xuất sắc! Việc chuẩn bị thông tin thực tế chứng minh năng lực thể hiện tính tự chủ và bản lĩnh cá nhân.',
    resultB: '⚠️ Đánh giá sư phạm: Chưa tối ưu! Buông xuôi theo ý gia đình dễ khiến em mất động lực học tập và không phát huy được sở trường.',
    isDefault: true
  },
  {
    id: 2,
    title: 'Tình huống 2: Lựa chọn trường nghề hay Đại học khi kinh tế khó khăn',
    content: 'Gia đình có hoàn cảnh khó khăn, học lực khá. Em băn khoăn giữa việc vay vốn học Đại học 4 năm hay chọn học Cao đẳng nghề 2 năm để ra trường sớm đi làm phụ giúp gia đình.',
    optionA: 'Chọn học Cao đẳng nghề/Trung cấp để nhanh có tay nghề, tự lập tài chính sớm giảm gánh nặng cho gia đình.',
    optionB: 'Cố chấp vay vốn học Đại học bằng mọi giá dù áp lực trả nợ sau khi ra trường rất lớn.',
    resultA: '🌟 Đánh giá sư phạm: Rất thực tế và sáng suốt! Phù hợp với định hướng phân luồng và lập kế hoạch tài chính cá nhân.',
    resultB: '⚠️ Đánh giá sư phạm: Cần cân nhắc kỹ lưỡng hơn về áp lực tài chính và năng lực thực tế để tránh rủi ro bỏ học giữa chừng.',
    isDefault: true
  },
  {
    id: 3,
    title: 'Tình huống 3: Định hướng nghề nghiệp cho học sinh vùng khó khăn',
    content: 'Em ở vùng cao/vùng đồng bào dân tộc thiểu số, có nguyện vọng đóng góp cho quê hương nhưng chưa biết nên chọn nhóm ngành y tế cơ sở, sư phạm hay nông nghiệp công nghệ cao.',
    optionA: 'Tìm hiểu các chính sách cử tuyển, khối trường sư phạm/y tế được miễn học phí để trở về phục vụ địa phương.',
    optionB: 'Đợi nước đến chân mới tính, học đại trà ngành gì dễ đậu ở các thành phố lớn.',
    resultA: '🌟 Đánh giá sư phạm: Tuyệt vời! Thể hiện rõ tinh thần trách nhiệm với cộng đồng và biết tận dụng chính sách ưu tiên của Nhà nước.',
    resultB: '⚠️ Đánh giá sư phạm: Thiếu định hướng chiến lược dài hạn, dễ gặp khó khăn khi thích nghi với môi trường đô thị.',
    isDefault: true
  },
  {
    id: 4,
    title: 'Tình huống 4: Y tế — Đam mê chăm sóc sức khỏe hay áp lực gia đình',
    content: 'Em rất muốn thi ngành Điều dưỡng hoặc Y sĩ để chăm sóc sức khỏe cộng đồng, nhưng bố mẹ ngăn cản vì cho rằng nghề này vất vả, trực đêm độc hại và áp lực tâm lý lớn, bắt em chọn ngành Kinh tế phòng máy lạnh.',
    optionA: 'Chia sẻ các tài liệu về y học hiện đại, phân tích vai trò nhân đạo và nhu cầu nhân lực không bao giờ lỗi thời của ngành y tế, đồng thời cam kết rèn luyện bản lĩnh để bố mẹ yên tâm.',
    optionB: 'Cãi lời bố mẹ, kiên quyết nộp hồ sơ bỏ nhà đi hoặc buông xuôi học ngành kinh tế theo ý gia đình rồi chán nản.',
    resultA: '🌟 Đánh giá sư phạm: Rất xuất sắc! Ngành y đòi hỏi sự thấu cảm và kiên định; việc thuyết phục gia đình bằng sự tận tâm chính là bài kiểm tra bản lĩnh đầu đời.',
    resultB: '⚠️ Đánh giá sư phạm: Chưa tối ưu! Phản ứng tiêu cực hoặc buông xuôi sẽ làm mất lòng tin của gia đình và khiến bản thân đánh mất tương lai.',
    isDefault: true
  },
  {
    id: 5,
    title: 'Tình huống 5: Giáo dục — Ước mơ giáo viên vùng cao và định kiến xã hội',
    content: 'Em có năng khiếu sư phạm và muốn làm giáo viên vùng cao. Tuy nhiên, bạn bè trêu chọc rằng nghề giáo lương thấp, áp lực phụ huynh lớn và khuyên em nên ra thành phố làm kinh doanh tự do.',
    optionA: 'Kiên định với ước mơ gieo chữ, tìm hiểu các chính sách hỗ trợ giáo dục vùng cao và xác định sứ mệnh cống hiến lâu dài.',
    optionB: 'Lắng nghe đám đông, chọn đại một ngành "hot" kiếm tiền nhanh dù bản thân không có chút đam mê hay kiên nhẫn nào với nghề đó.',
    resultA: '🌟 Đánh giá sư phạm: Tuyệt vời! Thể hiện giá trị sống cao đẹp. Giáo dục là quốc sách hàng đầu, người thầy chân chính luôn có chỗ đứng vững chắc và sự tôn trọng từ xã hội.',
    resultB: '⚠️ Đánh giá sư phạm: Cần cân nhắc kỹ! Chạy theo số đông mà thiếu đam mê sẽ dẫn đến sự chán nản và nhanh chóng bỏ cuộc.',
    isDefault: true
  },
  {
    id: 6,
    title: 'Tình huống 6: Công nghệ — Đam mê lập trình nhưng tự ti vì học Toán chưa tốt',
    content: 'Em đam mê lập trình AI và thiết kế phần mềm, nhưng học lực môn Toán của em chỉ ở mức trung bình khá, khiến em tự ti rằng mình không đủ trí tuệ để theo đuổi ngành Công nghệ thông tin.',
    optionA: 'Chủ động cải thiện tư duy logic, học hỏi các ngôn ngữ lập trình thực chiến từ sớm, chọn hướng đi chuyên sâu về ứng dụng thực tế thay vì nghiên cứu toán học hàn lâm.',
    optionB: 'Từ bỏ ngay đam mê công nghệ vì sợ điểm Toán thấp, chuyển sang chọn ngành học nào hoàn toàn không phải tính toán.',
    resultA: '🌟 Đánh giá sư phạm: Rất sáng suốt! Công nghệ thông tin rất rộng, năng lực tự học và tư duy giải quyết vấn đề thực tế quan trọng hơn điểm số đơn thuần.',
    resultB: '⚠️ Đánh giá sư phạm: Tiếc nuối! Tự ti sẽ làm ta bỏ lỡ cơ hội vàng trong kỷ nguyên số nơi kỹ năng thực chiến được đặt lên hàng đầu.',
    isDefault: true
  },
  {
    id: 7,
    title: 'Tình huống 7: Kỹ thuật — Sốc môi trường nhà xưởng cơ khí thực tế',
    content: 'Em trúng tuyển ngành Kỹ thuật cơ khí chế tạo. Khi vào học, em thấy lớp phần lớn là nam sinh, công việc thực tế phải bám nhà xưởng, dầu nhớt và máy móc nặng nhọc, khiến em chạnh lòng.',
    optionA: 'Nhanh chóng thích nghi với môi trường thực tế, coi xưởng thực hành là phòng thí nghiệm tương lai, chủ động trau dồi kỹ năng vận hành công nghệ tự động hóa.',
    optionB: 'Lủi thủi ít giao tiếp, cảm thấy lạc lõng và có ý định bỏ học ngay học kỳ đầu tiên vì môi trường quá khô khan.',
    resultA: '🌟 Đánh giá sư phạm: Rất bản lĩnh! Kỹ thuật hiện đại rất khát nhân lực giỏi tay nghề kết hợp tư duy công nghệ cao, cơ hội việc làm vô cùng rộng mở.',
    resultB: '⚠️ Đánh giá sư phạm: Chưa phù hợp! Tâm lý ngại khó, sợ môi trường vất vả sẽ cản trở con đường trở thành kỹ sư giỏi.',
    isDefault: true
  },
  {
    id: 8,
    title: 'Tình huống 8: Nông nghiệp — Làm nông nghiệp công nghệ cao hay nghe châm chọc',
    content: 'Gia đình có trang trại lớn ở quê, em muốn học Nông nghiệp công nghệ cao để về quê làm giàu từ nông nghiệp sạch. Người làng cười chê rằng "học đại học xong lại về cày cuốc ruộng đồng".',
    optionA: 'Kiêu hãnh chứng minh nông nghiệp thời đại số là "nông nghiệp thông minh", ứng dụng IoT, drone và AI vào quản lý chuỗi giá trị nông sản.',
    optionB: 'Sợ điều tiếng làng xóm, giấu giếm ngành học của mình và tìm mọi cách bám trụ lại thành phố làm những công việc văn phòng bấp bênh.',
    resultA: '🌟 Đánh giá sư phạm: Quá tuyệt vời! Đón đầu xu thế khởi nghiệp xanh. Nông nghiệp công nghệ cao đang là mỏ vàng chưa được khai thác hết tại Việt Nam.',
    resultB: '⚠️ Đánh giá sư phạm: Thiếu tự tin vào bản thân, bỏ lỡ lợi thế tài nguyên sẵn có của gia đình.',
    isDefault: true
  },
  {
    id: 9,
    title: 'Tình huống 9: Kinh doanh — Khởi nghiệp thương mại điện tử và bẫy làm giàu',
    content: 'Em muốn khởi nghiệp kinh doanh thương mại điện tử ngay sau khi ra trường, nhưng chưa có vốn và thiếu kinh nghiệm thực chiến, dễ nghe theo lời dụ dỗ tham gia các khóa học làm giàu "ảo" trên mạng.',
    optionA: 'Tích lũy kinh nghiệm bằng cách đi làm thuê, học hỏi quy trình vận hành doanh nghiệp bài bản từ các anh chị đi trước trước khi tự lập nghiệp.',
    optionB: 'Vay mượn tiền đầu tư nóng theo lời hô hào trên mạng xã hội, dẫn đến nợ nần chồng chất khi chưa hiểu rõ quy luật thị trường.',
    resultA: '🌟 Đánh giá sư phạm: Rất khôn ngoan! Kinh doanh thực chiến cần tư duy quản trị tài chính, tích lũy trải nghiệm và sự cọ xát thực tế.',
    resultB: '⚠️ Đánh giá sư phạm: Rất rủi ro! Dễ sập bẫy tài chính và gánh nợ lớn do thiếu kiến thức quản trị.',
    isDefault: true
  },
  {
    id: 10,
    title: 'Tình huống 10: Du lịch — Khủng hoảng ngành du lịch và nỗi sợ bấp bênh',
    content: 'Em rất thích làm Hướng dẫn viên du lịch quốc tế vì được đi đây đi đó. Tuy nhiên, đợt khủng hoảng dịch bệnh hoặc biến động kinh tế toàn cầu có thể làm ngành du lịch tê liệt, khiến em lo sợ nghề nghiệp bấp bênh.',
    optionA: 'Trang bị thêm ngoại ngữ thứ hai, kỹ năng số và đa dạng hóa năng lực sang quản trị lữ hành hoặc vận hành hospitality thông minh.',
    optionB: 'Từ bỏ hoàn toàn ngành du lịch ngay từ đầu chỉ vì nghe nói nghề này rủi ro cao khi gặp thiên tai, dịch bệnh.',
    resultA: '🌟 Đánh giá sư phạm: Thể hiện sự linh hoạt thích ứng tuyệt vời! Du lịch luôn phục hồi mạnh mẽ và khát nhân sự đa kỹ năng.',
    resultB: '⚠️ Đánh giá sư phạm: Quá bi quan, đánh mất cơ hội trải nghiệm và phát triển trong ngành dịch vụ không khói.',
    isDefault: true
  },
  {
    id: 11,
    title: 'Tình huống 11: Truyền thông — Sáng tạo nội dung số hay định kiến nghề',
    content: 'Em có năng khiếu sáng tạo nội dung, làm video trên mạng xã hội. Em muốn theo đuổi ngành Truyền thông đa phương tiện nhưng bố mẹ lo lắng rằng nghề này bấp bênh, dễ bị đào thải.',
    optionA: 'Chứng minh cho gia đình thấy sự chuyên nghiệp của ngành truyền thông hiện đại (hoạch định chiến lược, sản xuất nội dung sạch, phân tích số liệu Big Data).',
    optionB: 'Chỉ làm nội dung bản năng theo phong trào giật gân, câu view trên mạng xã hội mà không chịu học bài bản chuyên môn.',
    resultA: '🌟 Đánh giá sư phạm: Rất chuyên nghiệp! Truyền thông thời đại số đòi hỏi đạo đức nghề nghiệp và tư duy cốt lõi sắc sảo.',
    resultB: '⚠️ Đánh giá sư phạm: Dễ tạo ra những hệ lụy tiêu cực và nhanh chóng bị cộng đồng đào thải.',
    isDefault: true
  },
  {
    id: 12,
    title: 'Tình huống 12: Nghệ thuật — Đam mê hội họa và nỗi sợ "nghèo đói nghệ sĩ"',
    content: 'Em có đam mê hội họa và thiết kế đồ họa. Nhưng gia đình bảo nghệ thuật là "cuộc chơi tốn kém", người bình thường theo đuổi sẽ đói nghèo và không có tương lai.',
    optionA: 'Kết hợp nghệ thuật với công nghệ (UI/UX Design, Digital Art, Game Design) để tạo ra các sản phẩm thương mại có giá trị cao, tự lập tài chính sớm.',
    optionB: 'Buông xuôi từ bỏ cọ vẽ, sống trong sự ấm ức và tiếc nuối tài năng của bản thân suốt quãng đời sinh viên.',
    resultA: '🌟 Đánh giá sư phạm: Xuất sắc! Nghệ thuật thăng hoa cùng kinh tế số. Designer giỏi và am hiểu công nghệ luôn có thu nhập cực kỳ đáng mơ ước.',
    resultB: '⚠️ Đánh giá sư phạm: Gây tổn thương tâm lý sâu sắc và lãng phí năng khiếu bẩm sinh.',
    isDefault: true
  }
];

export const DOMAIN_STRENGTHS_MAP: Record<string, string[]> = {
  'Sửa chữa & Kỹ thuật': [
    'Tôi thích tự tay tháo lắp, sửa chữa các đồ điện tử, thiết bị trong nhà.',
    'Tôi tò mò cách các động cơ, máy móc và cấu trúc vật lý vận hành.',
    'Tôi rất kiên trì mày mò tìm ra nguyên nhân khi một thiết bị bị hỏng.',
    'Tôi có tư duy không gian tốt và thích vẽ phác thảo kỹ thuật.'
  ],
  'Sáng tạo nghệ thuật': [
    'Tôi có năng khiếu về màu sắc, hình khối và bố cục thẩm mỹ.',
    'Tôi thích tạo ra các sản phẩm số, thiết kế poster, video độc đáo.',
    'Tôi có trí tưởng tượng phong phú và thích kể chuyện qua hình ảnh.',
    'Tôi luôn tìm kiếm những góc nhìn mới lạ, không thích sự rập khuôn.'
  ],
  'Giao tiếp & Xã hội': [
    'Tôi có khả năng lắng nghe thấu hiểu và kết nối mọi người dễ dàng.',
    'Tôi tự tin khi thuyết trình, dẫn chương trình hoặc điều phối nhóm.',
    'Tôi nhạy bén trong việc đọc vị cảm xúc và hòa giải các mâu thuẫn.',
    'Tôi thích tham gia các hoạt động cộng đồng, thiện nguyện.'
  ],
  'Chăm sóc sức khỏe': [
    'Tôi là người ân cần, tỉ mỉ và có sự đồng cảm sâu sắc với người đau ốm.',
    'Tôi giữ được sự bình tĩnh, vững vàng trong các tình huống khẩn cấp.',
    'Tôi quan tâm đến lối sống lành mạnh, y học và sinh học cơ thể người.',
    'Tôi sẵn sàng hy sinh thời gian cá nhân để hỗ trợ sự sống của người khác.'
  ],
  'Nghiên cứu & Công nghệ': [
    'Tôi đam mê giải mã các thuật toán, lập trình và công nghệ AI.',
    'Tôi thích tư duy logic, phân tích số liệu và tìm tòi bản chất sự việc.',
    'Tôi kiên nhẫn thử nghiệm và kiểm chứng các giả thuyết khoa học.',
    'Tôi có khả năng tự học công nghệ mới rất nhanh chóng.'
  ],
  'Kinh doanh & Tài chính': [
    'Tôi nhạy bén với các cơ hội thị trường và xu hướng tiêu dùng.',
    'Tôi giỏi tính toán con số, quản lý dòng tiền và lập kế hoạch ngân sách.',
    'Tôi có khả năng đàm phán, thuyết phục người khác theo quan điểm của mình.',
    'Tôi dám chấp nhận rủi ro có tính toán để đạt được mục tiêu tài chính.'
  ],
  'Giáo dục & Sư phạm': [
    'Tôi có sự kiên nhẫn cao khi giảng giải lại kiến thức cho người khác hiểu.',
    'Tôi thích truyền cảm hứng, hướng dẫn và nhìn thấy sự tiến bộ của người khác.',
    'Tôi có phong cách giao tiếp chuẩn mực, sư phạm và đáng tin cậy.',
    'Tôi thích nghiên cứu phương pháp truyền đạt và tâm lý lứa tuổi.'
  ],
  'An ninh & Quốc phòng': [
    'Tôi có tinh thần kỷ luật thép, tôn trọng tuyệt đối các quy định và mệnh lệnh.',
    'Tôi có thể chất bền bỉ, tinh thần thép và ý chí kiên định trước áp lực.',
    'Tôi luôn đặt lợi ích của tập thể, của Tổ quốc lên trên lợi ích cá nhân.',
    'Tôi xử lý tình huống nhanh nhạy, quyết đoán và có trách nhiệm cao.'
  ]
};

export const EXAM_SUBJECTS = ['Toán', 'Ngữ văn', 'Tiếng Anh', 'Vật lí', 'Hóa học', 'Sinh học', 'Lịch sử', 'Địa lí', 'GDKT & PL', 'Tin học', 'Công nghệ'];

export const COMBINATION_BANK = [
  {
    code: 'A00',
    name: 'A00 (Toán, Vật lí, Hóa học)',
    subjects: ['Toán', 'Vật lí', 'Hóa học'],
    domains: ['Sửa chữa & Kỹ thuật', 'Nghiên cứu & Công nghệ', 'Kinh doanh & Tài chính', 'An ninh & Quốc phòng'],
    majors: 'Công nghệ thông tin, Kỹ thuật cơ khí, Tự động hóa, Điện - Điện tử, Kinh tế, Học viện Kỹ thuật Quân sự',
    universities: [
      'ĐH Bách Khoa (Hà Nội / TP.HCM) — Điểm chuẩn rất cao (26 - 29đ)',
      'ĐH Sư phạm Kỹ thuật TP.HCM / ĐH Công nghiệp — Điểm chuẩn khá (22 - 25.5đ)',
      'Học viện Kỹ thuật Quân sự / ĐH Bách Khoa Đà Nẵng — Điểm chuẩn cao (24 - 27đ)',
      'Các trường ĐH địa phương (ĐH Quy Nhơn, ĐH Nha Trang, ĐH Phú Yên...) — Điểm chuẩn vừa sức (16 - 21đ)'
    ],
    warning: '⚠️ Lưu ý thực tế: Tổ hợp A00 có tỷ lệ chọi rất cao ở các trường tốp đầu. Cần phân bổ nguyện vọng thông minh từ cao xuống thấp.'
  },
  {
    code: 'A01',
    name: 'A01 (Toán, Vật lí, Tiếng Anh)',
    subjects: ['Toán', 'Vật lí', 'Tiếng Anh'],
    domains: ['Nghiên cứu & Công nghệ', 'Kinh doanh & Tài chính', 'Sửa chữa & Kỹ thuật'],
    majors: 'Khoa học máy tính, Trí tuệ nhân tạo (AI), Thương mại điện tử, Logistics, Quản trị kinh doanh, Tài chính ngân hàng',
    universities: [
      'ĐH Ngoại thương / ĐH Kinh tế Quốc dân / ĐH Kinh tế TP.HCM — Điểm chuẩn rất cao (26 - 28.5đ)',
      'ĐH Công nghệ Thông tin (ĐHQG) / Học viện Bưu chính Viễn thông — Điểm chuẩn cao (25 - 27.5đ)',
      'ĐH Tài chính - Marketing / ĐH Ngân hàng — Điểm chuẩn khá (23 - 25.5đ)',
      'ĐH Nha Trang / ĐH Quy Nhơn / ĐH Tây Nguyên — Điểm chuẩn vừa sức (16 - 20đ)'
    ],
    warning: '⚠️ Lưu ý thực tế: Tiếng Anh là lợi thế cực lớn khi học CNTT và Kinh tế. Hãy tận dụng chứng chỉ IELTS (nếu có) để cộng điểm ưu tiên xét tuyển.'
  },
  {
    code: 'B00',
    name: 'B00 (Toán, Hóa học, Sinh học)',
    subjects: ['Toán', 'Hóa học', 'Sinh học'],
    domains: ['Chăm sóc sức khỏe', 'Nghiên cứu & Công nghệ'],
    majors: 'Y khoa, Dược học, Điều dưỡng, Kỹ thuật xét nghiệm y học, Công nghệ sinh học, Nông nghiệp công nghệ cao',
    universities: [
      'Học viện Quân y / ĐH Y Hà Nội / ĐH Y Dược TP.HCM — Điểm chuẩn cực cao (26.5 - 29.5đ)',
      'ĐH Y Dược Huế / ĐH Y Dược Cần Thơ / ĐH Y khoa Phạm Ngọc Thạch — Điểm chuẩn cao (23 - 26.5đ)',
      'ĐH Tây Nguyên / ĐH Kỹ thuật Y Dược Đà Nẵng — Điểm chuẩn khá (19 - 24.5đ)',
      'Hệ Cao đẳng Y tế các tỉnh / ĐH Nông Lâm — Điểm chuẩn vừa sức (16 - 20đ)'
    ],
    warning: '⚠️ Lưu ý thực tế: Ngành Y khoa và Quân y đòi hỏi điểm số gần như tuyệt đối. Nếu học lực mức Khá, hãy cân nhắc Điều dưỡng, Kỹ thuật Y học hoặc Công nghệ sinh học.'
  },
  {
    code: 'C00',
    name: 'C00 (Ngữ văn, Lịch sử, Địa lí)',
    subjects: ['Ngữ văn', 'Lịch sử', 'Địa lí'],
    domains: ['Giáo dục & Sư phạm', 'An ninh & Quốc phòng', 'Giao tiếp & Xã hội'],
    majors: 'Sư phạm Ngữ văn/Lịch sử/Địa lí, Giáo dục Tiểu học, Luật, Báo chí - Truyền thông, Học viện An ninh/Cảnh sát, Chính trị',
    universities: [
      'Học viện Biên phòng / Trường Sĩ quan Chính trị / Học viện Báo chí — Điểm chuẩn rất cao (26.5 - 29đ)',
      'ĐH Sư phạm Hà Nội / ĐH Sư phạm TP.HCM / ĐHSư phạm Huế — Điểm chuẩn cao (25 - 28.5đ)',
      'ĐH Luật / ĐH Khoa học Xã hội & Nhân văn — Điểm chuẩn khá cao (24 - 27.5đ)',
      'ĐH Phú Yên / ĐH Quy Nhơn / ĐH Khánh Hòa — Điểm chuẩn vừa sức (18 - 24đ)'
    ],
    warning: '⚠️ Lưu ý thực tế: Khối C00 ở các ngành Sư phạm và Quân đội/Công an có điểm chuẩn rất cao (thường trên 27 điểm) do chỉ tiêu ít. Cần ôn luyện thật kỹ để tránh rủi ro trượt sát nút.'
  },
  {
    code: 'C03',
    name: 'C03 (Toán, Ngữ văn, Lịch sử)',
    subjects: ['Toán', 'Ngữ văn', 'Lịch sử'],
    domains: ['An ninh & Quốc phòng', 'Giáo dục & Sư phạm', 'Giao tiếp & Xã hội'],
    majors: 'Nghiệp vụ Công an, Nghiệp vụ Cảnh sát, Luật học, Quản lý nhà nước, Sư phạm Tiểu học',
    universities: [
      'Học viện Cảnh sát nhân dân / ĐH Cảnh sát nhân dân — Kết hợp bài thi Đánh giá Bộ Công an',
      'ĐH Luật Hà Nội / ĐH Luật TP.HCM — Điểm chuẩn cao (24 - 27đ)',
      'ĐH Sài Gòn / ĐH Quy Nhơn — Điểm chuẩn khá (21 - 25đ)'
    ],
    warning: '⚠️ Lưu ý thực tế: Với các trường Công an, ngoài điểm 3 môn thi tốt nghiệp (chiếm 40%), thí sinh bắt buộc phải qua sơ tuyển sức khỏe, chính trị và bài thi Đánh giá của Bộ Công an (chiếm 60%).'
  },
  {
    code: 'D01',
    name: 'D01 (Toán, Ngữ văn, Tiếng Anh)',
    subjects: ['Toán', 'Ngữ văn', 'Tiếng Anh'],
    domains: ['Kinh doanh & Tài chính', 'Giao tiếp & Xã hội', 'Giáo dục & Sư phạm', 'Sáng tạo nghệ thuật'],
    majors: 'Sư phạm Tiếng Anh, Ngôn ngữ Anh/Trung/Hàn, Quản trị Du lịch & Lữ hành, Truyền thông đa phương tiện, Marketing, Thiết kế đồ họa',
    universities: [
      'ĐH Ngoại ngữ / ĐH Sư phạm / ĐH Kinh tế — Điểm chuẩn cao (24.5 - 28đ)',
      'ĐH Hà Nội / ĐH Mở / ĐH Tôn Đức Thắng — Điểm chuẩn khá (22 - 25.5đ)',
      'ĐH Nha Trang / ĐH Đà Lạt / ĐH Quy Nhơn / ĐH Phú Yên — Điểm chuẩn vừa sức (16 - 22đ)'
    ],
    warning: '⚠️ Lưu ý thực tế: D01 là tổ hợp "quốc dân" xét tuyển được hầu hết các trường. Vì cả Toán và Văn đều là môn thi bắt buộc, việc chọn thêm Tiếng Anh giúp mở rộng tối đa cánh cửa đại học.'
  },
  {
    code: 'A00_IT',
    name: 'Tổ hợp Mới: Toán, Ngữ văn, Tin học',
    subjects: ['Toán', 'Ngữ văn', 'Tin học'],
    domains: ['Nghiên cứu & Công nghệ', 'Sửa chữa & Kỹ thuật'],
    majors: 'Công nghệ thông tin, Kỹ thuật phần mềm, Hệ thống thông tin, Sư phạm Tin học, Thiết kế mỹ thuật số',
    universities: [
      'ĐH Công nghệ (ĐHQG) / ĐH Bách Khoa / ĐH Sư phạm Kỹ thuật — Xét tuyển tổ hợp có môn Tin học theo chương trình GDPT 2018',
      'ĐH Công nghệ Thông tin & Truyền thông Việt - Hàn (ĐH Đà Nẵng)',
      'ĐH Quy Nhơn / ĐH Nha Trang / ĐH FPT'
    ],
    warning: '⚠️ Lưu ý thực tế: Từ năm 2025-2026, môn Tin học chính thức là môn thi tốt nghiệp tự chọn và được rất nhiều trường ĐH đưa vào tổ hợp xét tuyển khối ngành Công nghệ và Sư phạm Tin.'
  },
  {
    code: 'C14_GDKT',
    name: 'Tổ hợp Mới: Toán, Ngữ văn, GDKT & PL',
    subjects: ['Toán', 'Ngữ văn', 'GDKT & PL'],
    domains: ['Kinh doanh & Tài chính', 'Giao tiếp & Xã hội', 'Giáo dục & Sư phạm'],
    majors: 'Luật kinh tế, Quản trị kinh doanh, Tài chính ngân hàng, Công tác xã hội, Quản lý giáo dục',
    universities: [
      'ĐH Kinh tế - Luật / Học viện Phụ nữ / Học viện Thanh thiếu niên',
      'ĐH Luật / ĐH Nội vụ / ĐH Công đoàn',
      'Các trường Đại học đa ngành địa phương và khu vực miền Trung - Tây Nguyên'
    ],
    warning: '⚠️ Lưu ý thực tế: Môn Giáo dục kinh tế và pháp luật (GDKT & PL) là môn rất dễ đạt điểm cao (8-9+) nếu nắm chắc kiến thức thực tế, cực kỳ lợi thế để kéo tổng điểm xét tuyển.'
  }
];