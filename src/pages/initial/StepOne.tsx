import { useEffect } from 'react';

const StepOne = ({ onNext, onChange }: any) => {
  // 입력 핸들러
  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...getStoredData(), [name]: value };
    localStorage.setItem('userInfo', JSON.stringify(updatedData)); // 저장
    onChange(name, value);
  };

  // 로컬스토리지에서 기존 값 불러오기
  useEffect(() => {
    const saved = getStoredData();
    Object.entries(saved).forEach(([key, value]) => {
      onChange(key, value); // 부모에도 전달
    });
  }, []);

  const getStoredData = () => {
    try {
      return JSON.parse(localStorage.getItem('userInfo') || '{}');
    } catch {
      return {};
    }
  };

  const stored = getStoredData();

  return (
    <div className="mx-auto mt-4 max-w-md space-y-6 rounded-xl bg-white p-5 shadow">
      <h2 className="text-center text-2xl font-bold text-sejongred">👤 학생 정보 입력</h2>

      <div>
        <label className="mb-1 block font-medium">이름</label>
        <input
          name="name"
          placeholder="이름을 입력하세요"
          value={stored.name || ''}
          onChange={handleInput}
          className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sejongred"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">학과</label>
        <select
          name="major"
          value={stored.major || ''}
          onChange={handleInput}
          className="w-full rounded-lg border bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sejongred"
        >
          <option value="">학과를 선택하세요</option>
          <option value="컴퓨터공학과">컴퓨터공학과</option>
          <option value="소프트웨어학과">콘텐츠소프트웨어학과</option>
          <option value="인공지능학과">인공지능데이터사이언스학과</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block font-medium">학번</label>
        <input
          name="studentId"
          type="number"
          value={stored.studentId || ''}
          placeholder="예: 20201234"
          onChange={handleInput}
          className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sejongred"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">이수 학기</label>
        <select
          name="semesterCompleted"
          value={stored.semesterCompleted || ''}
          onChange={handleInput}
          className="w-full rounded-lg border bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sejongred"
        >
          <option value="">이수 학기를 선택하세요</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block font-medium">재학 예정 학기</label>
        <select
          name="semesterPlan"
          value={stored.semesterPlan || ''}
          onChange={handleInput}
          className="w-full rounded-lg border bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sejongred"
        >
          <option value="">재학 예정 학기를 선택하세요</option>
          {['2024-1', '2024-2', '2025-1', '2025-2', '2026-1'].map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block font-medium">희망 진로 분야</label>
        <input
          name="careerGoal"
          value={stored.careerGoal || ''}
          placeholder="예: 프론트엔드 개발자"
          onChange={handleInput}
          className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sejongred"
        />
      </div>

      <button
        onClick={onNext}
        className="mt-4 w-full rounded-lg bg-sejongred py-3 font-semibold text-white transition hover:bg-red-600"
      >
        다음
      </button>
    </div>
  );
};

export default StepOne;
