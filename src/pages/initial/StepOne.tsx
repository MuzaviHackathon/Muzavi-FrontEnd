import { useEffect, useState } from 'react';
import axios from 'axios';

const StepOne = ({ onNext, onChange }: any) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const getStoredData = () => {
    try {
      return JSON.parse(localStorage.getItem('userInfo') || '{}');
    } catch {
      return {};
    }
  };

  const stored = getStoredData();

  const checkFormValidity = (data: any) => {
    const requiredFields = [
      'name',
      'major',
      'studentNumber',
      'semesterTaken',
      'returnSemester',
      'preferredJob',
    ];
    const isValid = requiredFields.every(
      (field) => data[field] && data[field].toString().trim() !== ''
    );
    setIsFormValid(isValid);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...getStoredData(), [name]: value };
    localStorage.setItem('userInfo', JSON.stringify(updatedData));
    onChange(name, value);
    checkFormValidity(updatedData);
  };

  useEffect(() => {
    const saved = getStoredData();
    Object.entries(saved).forEach(([key, value]) => {
      onChange(key, value);
    });
    checkFormValidity(saved);
  }, []);

  const handleSubmit = async () => {
    const payload = getStoredData();

    try {
      const response = await axios.post('http://localhost:8080/users/register', payload);
      console.log('등록 성공:', response.data);
      onNext();
    } catch (error) {
      console.error('등록 실패:', error);
      alert('사용자 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="mx-auto mt-4 max-w-md space-y-6 rounded-xl bg-white p-5 shadow">
      <h2 className="text-center text-2xl font-bold text-sejongred">👤 학생 정보 입력</h2>

      {/* 이름 */}
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

      {/* 학과 */}
      <div>
        <label className="mb-1 block font-medium">학과</label>
        <select
          name="major"
          value={stored.major || ''}
          onChange={handleInput}
          className="w-full rounded-lg border bg-white px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-sejongred"
        >
          <option value="">학과를 선택하세요</option>
          <option value="컴퓨터공학과">컴퓨터공학과</option>
          <option value="소프트웨어학과">콘텐츠소프트웨어학과</option>
          <option value="인공지능학과">인공지능데이터사이언스학과</option>
        </select>
      </div>

      {/* 학번 */}
      <div>
        <label className="mb-1 block font-medium">학번</label>
        <input
          name="studentNumber"
          type="number"
          value={stored.studentNumber || ''}
          placeholder="예: 20201234"
          onChange={handleInput}
          className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sejongred"
        />
      </div>

      {/* 이수 학기 */}
      <div>
        <label className="mb-1 block font-medium">이수 학기</label>
        <select
          name="semesterTaken"
          value={stored.semesterTaken || ''}
          onChange={handleInput}
          className="w-full rounded-lg border bg-white px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-sejongred"
        >
          <option value="">이수 학기를 선택하세요</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* 재학 예정 학기 */}
      <div>
        <label className="mb-1 block font-medium">재학 예정 학기</label>
        <select
          name="returnSemester"
          value={stored.returnSemester || ''}
          onChange={handleInput}
          className="w-full rounded-lg border bg-white px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-sejongred"
        >
          <option value="">재학 예정 학기를 선택하세요</option>
          {['2024-1', '2024-2', '2025-1', '2025-2', '2026-1'].map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>
      </div>

      {/* 희망 진로 분야 */}
      <div>
        <label className="mb-1 block font-medium">희망 진로 분야</label>
        <input
          name="preferredJob"
          value={stored.preferredJob || ''}
          placeholder="예: 프론트엔드 개발자"
          onChange={handleInput}
          className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sejongred"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className={`mt-4 w-full rounded-lg py-3 font-semibold text-white transition ${
          isFormValid ? 'bg-sejongred hover:bg-red-600' : 'cursor-not-allowed bg-gray-300'
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default StepOne;
