import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const preferenceOptions = {
  강의력: ['좋음', '보통', '나쁨'],
  과제: ['많음', '보통', '적음'],
  팀플: ['적음', '보통', '많음'],
  시험: ['어려움', '쉬움'],
  출결: ['직접호명', '유체크'],
};

const StepThree = ({ data, onPrev }: any) => {
  const [review, setReview] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const saved = localStorage.getItem('lecturePreference');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReview(parsed);
      } catch (err) {
        console.error('선호도 불러오기 오류:', err);
      }
    }
  }, []);

  const handleSelect = (type: string, value: string) => {
    const updated = { ...review, [type]: value };
    setReview(updated);
    localStorage.setItem('lecturePreference', JSON.stringify(updated));
  };

  const handleFinish = async () => {
    if (!userId) {
      alert('로그인 정보가 없습니다.');
      return;
    }

    const preferences = Object.entries(review).map(([category, option]) => ({
      category,
      option: `${category}${option}`,
    }));

    try {
      await axios.post(`http://localhost:8080/users/1/preferences`, {
        preferences,
      });
      navigate('/home');
    } catch (err) {
      console.error('선호도 저장 실패:', err);
      alert('선호도 저장 중 오류가 발생했습니다.');
    }
  };

  const isComplete =
    Object.keys(preferenceOptions).length === Object.keys(review).length &&
    Object.values(review).every((v) => v !== '');

  return (
    <div className="mx-auto mt-6 max-h-[calc(100vh-120px)] max-w-4xl overflow-hidden rounded-xl bg-white p-5 shadow">
      <h2 className="text-center text-2xl font-bold text-sejongred">🎓 강의 선호도 설정</h2>
      <p className="text-center text-sm text-gray-600">
        강의에 대한 선호도를 선택해주세요.
        <br /> 더 나은 추천을 위해 활용됩니다.
      </p>

      <div className="mt-4 space-y-4">
        {Object.entries(preferenceOptions).map(([category, options]) => (
          <div key={category}>
            <p className="mb-1 font-semibold text-gray-700">#{category}</p>
            <div className="flex flex-wrap gap-2">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(category, opt)}
                  className={`rounded-full border px-3 py-0.5 text-sm transition ${
                    review[category] === opt
                      ? 'border-sejongred bg-sejongred text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-sejongred hover:text-sejongred'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between gap-4">
        <button
          onClick={onPrev}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 font-semibold text-gray-700 hover:bg-gray-100"
        >
          이전
        </button>
        <button
          onClick={handleFinish}
          disabled={!isComplete}
          className={`w-full rounded-lg py-2 font-semibold text-white transition ${
            isComplete ? 'bg-sejongred hover:bg-red-600' : 'cursor-not-allowed bg-gray-300'
          }`}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default StepThree;
