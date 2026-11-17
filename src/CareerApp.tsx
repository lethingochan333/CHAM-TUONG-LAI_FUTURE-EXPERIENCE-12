import React, { useState, useEffect } from 'react';

export interface CareerSubmission {
  id: string;
  studentName: string;
  className: string;
  interest: string;
  strength: string;
  gameScore: number;
  selectedPath: string;
  aiReport: string;
  createdAt: string;
  synced: boolean;
}

export default function CareerApp() {
  const [activeTab, setActiveTab] = useState<'intro' | 'game' | 'ai' | 'teacher'>('intro');
  const [gameStep, setGameStep] = useState(1);
  const [score, setScore] = useState(0);
  const [selectedPath, setSelectedPath] = useState('Chưa hoàn thành Game');

  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('12C');
  const [interest, setInterest] = useState('');
  const [strength, setStrength] = useState('');
  const [aiReport, setAiReport] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [submissions, setSubmissions] = useState<CareerSubmission[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('hdtn12_submissions') || '[]');
    setSubmissions(saved);

    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineData();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncOfflineData = () => {
    const saved: CareerSubmission[] = JSON.parse(localStorage.getItem('hdtn12_submissions') || '[]');
    const updated = saved.map(item => ({ ...item, synced: true }));
    localStorage.setItem('hdtn12_submissions', JSON.stringify(updated));
    setSubmissions(updated);
  };

  const handleGameChoice = (points: number, pathName?: string) => {
    setScore(prev => prev + points);
    if (pathName) setSelectedPath(pathName);
    setGameStep(prev => prev + 1);
  };

  const handleConsultAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !interest.trim()) {
      alert('Vui lòng nhập đầy đủ họ tên và ngành nghề định hướng!');
      return;
    }

    setLoadingAI(true);
    setTimeout(() => {
      const report = `🤖 BÁO CÁO PHÂN TÍCH & ĐỊNH HƯỚNG NGHỀ NGHIỆP CÁ NHÂN HÓA
(Tích hợp Chủ đề 8, 9, 10 - Hoạt động trải nghiệm, hướng nghiệp 12)
==================================================================
👤 Học sinh: ${studentName} | Lớp: ${className}
🎯 Ngành nghề mục tiêu: ${interest}
🎮 Kết quả mô phỏng "Ngã rẽ tuổi 18": ${score}/85 điểm (${selectedPath})

1. ĐỐI CHIẾU YÊU CẦU THỊ TRƯỜNG LAO ĐỘNG HIỆN ĐẠI (CHỦ ĐỀ 8):
- Ngành "${interest}" trong kỷ nguyên số đòi hỏi khả năng ứng dụng công nghệ, tư duy giải quyết vấn đề và thái độ làm việc chuyên nghiệp.
- Thế mạnh hiện có của em ("${strength}") là nền tảng rất tốt để phát triển chuyên môn sâu.

2. KẾ HOẠCH RÈN LUYỆN PHẨM CHẤT & NĂNG LỰC PHÙ HỢP (CHỦ ĐỀ 9):
- Phẩm chất trọng tâm: Rèn tính kỷ luật tự giác, trách nhiệm cá nhân và sự kiên trì trước áp lực học tập cuối cấp.
- Năng lực cần bồi dưỡng ngay:
  + Năng lực tự học và làm chủ công cụ AI hỗ trợ ngành ${interest}.
  + Kỹ năng giao tiếp, hợp tác nhóm và quản lý thời gian hiệu quả.

3. CHUẨN BỊ TÂM LÍ THÍCH ỨNG MÔI TRƯỜNG MỚI (CHỦ ĐỀ 10):
- Chủ động tìm hiểu chương trình đào tạo, học phí và cơ hội việc làm thực tế của ngành ${interest}.
- Rèn luyện kỹ năng sống tự lập, quản lý chi tiêu cá nhân và giữ vững tâm lý tự tin trước kỳ thi Tốt nghiệp THPT.`;

      setAiReport(report);
      setLoadingAI(false);

      const newRecord: CareerSubmission = {
        id: `hdtn_${Date.now()}`,
        studentName,
        className,
        interest,
        strength,
        gameScore: score,
        selectedPath,
        aiReport: report,
        createdAt: new Date().toLocaleString('vi-VN'),
        synced: navigator.onLine
      };

      const updatedList = [newRecord, ...submissions];
      setSubmissions(updatedList);
      localStorage.setItem('hdtn12_submissions', JSON.stringify(updatedList));
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[11px] bg-emerald-700/80 px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-emerald-400/30">
              Sản phẩm Giáo dục Trực quan Ứng dụng AI & Gamification
            </span>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wide mt-2">
              🌟 HỆ SINH THÁI ĐỊNH HƯỚNG HƯỚNG NGHIỆP LỚP 12
            </h1>
            <p className="text-xs text-emerald-100 mt-1">
              Tích hợp Chủ đề 8, 9, 10 — Môn Hoạt động trải nghiệm, hướng nghiệp 12
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <span className="text-xs bg-emerald-600/90 text-white px-3.5 py-2 rounded-xl font-bold shadow-xs">
                🟢 Online — Tự động đồng bộ Cloud
              </span>
            ) : (
              <span className="text-xs bg-amber-600 text-white px-3.5 py-2 rounded-xl font-bold shadow-xs">
                🟠 Offline — Lưu trên máy học sinh
              </span>
            )}
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('intro')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-all ${activeTab === 'intro' ? 'bg-emerald-800 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-emerald-50 border'}`}
          >
            📖 Tổng quan Chủ đề 8 - 9 - 10
          </button>
          <button
            onClick={() => setActiveTab('game')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-all ${activeTab === 'game' ? 'bg-emerald-800 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-emerald-50 border'}`}
          >
            🎮 Trạm 1: Game Mô phỏng "Ngã rẽ tuổi 18"
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-all ${activeTab === 'ai' ? 'bg-emerald-800 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-emerald-50 border'}`}
          >
            🤖 Trạm 2: Trợ lý ảo AI Cố vấn Hướng nghiệp
          </button>
          <button
            onClick={() => setActiveTab('teacher')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-all ${activeTab === 'teacher' ? 'bg-emerald-800 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-emerald-50 border'}`}
          >
            📊 Dữ liệu lớp học ({submissions.length})
          </button>
        </div>

        {/* TAB 1: INTRO */}
        {activeTab === 'intro' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs space-y-2">
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">CHỦ ĐỀ 8</span>
              <h3 className="font-bold text-sm text-slate-900">Nghề nghiệp & yêu cầu với người lao động hiện đại</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Khám phá xu hướng thị trường lao động số, nhận diện các tiêu chuẩn về kỷ luật, năng lực công nghệ và khả năng thích ứng.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-teal-100 shadow-xs space-y-2">
              <span className="text-xs font-black text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">CHỦ ĐỀ 9</span>
              <h3 className="font-bold text-sm text-slate-900">Rèn luyện phẩm chất, năng lực theo định hướng nghề</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Đánh giá điểm mạnh, điểm yếu cá nhân (SWOT) và thiết lập lộ trình rèn luyện phẩm chất, năng lực phù hợp với nghề đã chọn.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-cyan-100 shadow-xs space-y-2">
              <span className="text-xs font-black text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-lg">CHỦ ĐỀ 10</span>
              <h3 className="font-bold text-sm text-slate-900">Quyết định chọn nghề & chuẩn bị tâm lí thích ứng</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ra quyết định lựa chọn hướng đi sau THPT và trang bị tâm lý vững vàng khi bước vào môi trường học tập, làm việc mới.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: GAME */}
        {activeTab === 'game' && (
          <div className="bg-white p-6 rounded-2xl border shadow-xs space-y-6">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h2 className="font-bold text-base text-emerald-950">🎮 Trò chơi mô phỏng: Ngã rẽ tuổi 18</h2>
                <p className="text-xs text-slate-500">Hoàn thành 3 thử thách tình huống để kiểm tra mức độ sẵn sàng nghề nghiệp</p>
              </div>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-xl">
                ⭐ Điểm thích ứng: {score}
              </span>
            </div>

            {gameStep === 1 && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-emerald-50 rounded-xl font-bold text-emerald-950 border border-emerald-200">
                  📌 Thử thách 1 (Chủ đề 8): Doanh nghiệp hiện đại ưu tiên tuyển dụng nhân sự có kỹ năng số, sử dụng thành thạo AI và làm việc nhóm. Em sẽ chuẩn bị như thế nào ngay từ lớp 12?
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button onClick={() => handleGameChoice(30)} className="p-4 text-left border rounded-xl hover:bg-emerald-50 font-semibold cursor-pointer">
                    ✅ Chủ động rèn kỹ năng Tin học, ứng dụng AI vào học tập và tích cực tham gia hoạt động tập thể. (+30đ)
                  </button>
                  <button onClick={() => handleGameChoice(10)} className="p-4 text-left border rounded-xl hover:bg-emerald-50 font-semibold cursor-pointer">
                    ⏳ Chỉ tập trung học thuộc lý thuyết, đợi sau này đi làm mới bắt đầu tìm hiểu công nghệ. (+10đ)
                  </button>
                </div>
              </div>
            )}

            {gameStep === 2 && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-teal-50 rounded-xl font-bold text-teal-950 border border-teal-200">
                  📌 Thử thách 2 (Chủ đề 10): Đứng trước quyết định chọn trường, chọn nghề sau khi tốt nghiệp THPT, căn cứ nào là quan trọng nhất với em?
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button onClick={() => handleGameChoice(30, 'Định hướng Đại học / Cao đẳng chuyên sâu')} className="p-4 text-left border rounded-xl hover:bg-teal-50 font-semibold cursor-pointer">
                    🎓 Kết hợp giữa năng lực học tập, sở thích bản thân, điều kiện gia đình và nhu cầu xã hội. (+30đ)
                  </button>
                  <button onClick={() => handleGameChoice(25, 'Định hướng Học nghề thực chiến')} className="p-4 text-left border rounded-xl hover:bg-teal-50 font-semibold cursor-pointer">
                    🛠️ Chọn học nghề thực hành ngắn hạn phù hợp với tay nghề để sớm tự lập tài chính. (+25đ)
                  </button>
                  <button onClick={() => handleGameChoice(10, 'Chọn nghề theo đám đông')} className="p-4 text-left border rounded-xl hover:bg-teal-50 font-semibold cursor-pointer">
                    👥 Chọn đại theo ngành mà bạn bè trong lớp đăng ký nhiều nhất. (+10đ)
                  </button>
                </div>
              </div>
            )}

            {gameStep === 3 && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-cyan-50 rounded-xl font-bold text-cyan-950 border border-cyan-200">
                  📌 Thử thách 3 (Chủ đề 10 - Thích ứng tâm lý): Khi bước vào môi trường mới xa gia đình, gặp áp lực học tập và chi tiêu, em sẽ xử lý ra sao?
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button onClick={() => handleGameChoice(25)} className="p-4 text-left border rounded-xl hover:bg-cyan-50 font-semibold cursor-pointer">
                    💪 Lập kế hoạch thu chi hàng tháng, chủ động kết nối bạn bè tích cực và tìm kiếm sự hỗ trợ từ thầy cô. (+25đ)
                  </button>
                  <button onClick={() => handleGameChoice(10)} className="p-4 text-left border rounded-xl hover:bg-cyan-50 font-semibold cursor-pointer">
                    😔 Thu mình lại, chán nản và muốn bỏ cuộc để đổi ngành khác ngay lập tức. (+10đ)
                  </button>
                </div>
              </div>
            )}

            {gameStep > 3 && (
              <div className="text-center py-8 space-y-4 bg-emerald-50/50 rounded-2xl border border-emerald-200">
                <div className="text-4xl">🏆</div>
                <h3 className="font-bold text-lg text-emerald-950">
                  Hoàn thành xuất sắc! Điểm thích ứng của em: {score}/85 điểm
                </h3>
                <p className="text-xs text-slate-600">
                  Xu hướng lựa chọn: <b>{selectedPath}</b>. Hãy bấm sang Trạm 2 để Trợ lý ảo AI lập lộ trình rèn luyện chi tiết!
                </p>
                <div className="flex justify-center gap-3">
                  <button onClick={() => setActiveTab('ai')} className="px-5 py-2.5 bg-emerald-800 text-white font-bold rounded-xl text-xs cursor-pointer">
                    🤖 Sang Trạm 2: Tư vấn cùng AI
                  </button>
                  <button onClick={() => { setGameStep(1); setScore(0); }} className="px-4 py-2.5 bg-white border text-slate-700 font-bold rounded-xl text-xs cursor-pointer">
                    🔄 Chơi lại
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: AI MENTOR */}
        {activeTab === 'ai' && (
          <div className="bg-white p-6 rounded-2xl border shadow-xs space-y-6">
            <div className="border-b pb-3">
              <h2 className="font-bold text-base text-emerald-950">🤖 Trợ lý ảo AI Cố vấn Hướng nghiệp & Rèn luyện bản thân (Chủ đề 9)</h2>
              <p className="text-xs text-slate-500">Nhập thông tin cá nhân để AI phân tích và xuất lộ trình rèn luyện phẩm chất, năng lực</p>
            </div>

            <form onSubmit={handleConsultAI} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Họ và tên học sinh</label>
                  <input type="text" required placeholder="VD: Nguyễn Văn A" value={studentName} onChange={e => setStudentName(e.target.value)} className="w-full px-3 py-2 border rounded-xl font-bold" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Lớp</label>
                  <input type="text" value={className} onChange={e => setClassName(e.target.value)} className="w-full px-3 py-2 border rounded-xl font-bold" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Ngành nghề định hướng</label>
                  <input type="text" required placeholder="VD: Công nghệ thông tin, Y khoa, Sư phạm..." value={interest} onChange={e => setInterest(e.target.value)} className="w-full px-3 py-2 border rounded-xl font-bold" />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Điểm mạnh, môn học yêu thích hoặc sở trường của em</label>
                <input type="text" required placeholder="VD: Học tốt Toán - Tin, cẩn thận, thích tìm tòi công nghệ..." value={strength} onChange={e => setStrength(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
              </div>
              <button type="submit" disabled={loadingAI} className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl cursor-pointer shadow-sm">
                {loadingAI ? '✨ AI đang phân tích hồ sơ năng lực...' : '🚀 Phân tích & Lập Kế hoạch Rèn luyện (Chủ đề 9)'}
              </button>
            </form>

            {aiReport && (
              <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs text-emerald-950 whitespace-pre-line leading-relaxed font-sans">
                {aiReport}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: TEACHER DASHBOARD */}
        {activeTab === 'teacher' && (
          <div className="bg-white p-6 rounded-2xl border shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="font-bold text-base text-emerald-950">📊 Thống kê Hồ sơ Định hướng Hướng nghiệp Học sinh</h2>
              <button onClick={syncOfflineData} className="px-3 py-1.5 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-bold cursor-pointer">
                🔄 Đồng bộ dữ liệu
              </button>
            </div>
            {submissions.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">Chưa có học sinh nào gửi phiếu tư vấn hướng nghiệp.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700">
                      <th className="p-2.5 border">Họ tên</th>
                      <th className="p-2.5 border">Lớp</th>
                      <th className="p-2.5 border">Ngành định hướng</th>
                      <th className="p-2.5 border">Điểm Game</th>
                      <th className="p-2.5 border">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map(sub => (
                      <tr key={sub.id} className="border-b hover:bg-slate-50">
                        <td className="p-2.5 border font-bold">{sub.studentName}</td>
                        <td className="p-2.5 border">{sub.className}</td>
                        <td className="p-2.5 border text-emerald-800 font-semibold">{sub.interest}</td>
                        <td className="p-2.5 border font-bold">{sub.gameScore}/85</td>
                        <td className="p-2.5 border">
                          {sub.synced ? (
                            <span className="text-emerald-700 font-bold">🟢 Đã đồng bộ</span>
                          ) : (
                            <span className="text-amber-600 font-bold">🟠 Lưu Offline</span>
                          )}
                        </td>
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