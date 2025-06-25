import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const preferenceOptions = {
  강의력: ['좋음', '보통', '나쁨'],
  과제: ['적음', '보통', '많음'],
  팀플: ['적음', '보통', '많음'],
  성적: ['깐깐한', '너그러움'],
  출결: ['직접호명', '유체크'],
  시험: ['객관식', '주관식', '혼합'],
};

const StepThree = ({ data }: any) => {
  const [review, setReview] = useState<Record<string, string>>({});
  const navigate = useNavigate();

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

  const handleFinish = () => {
    console.log('최종 사용자 설정 데이터:', {
      ...data,
      lecturePreference: review,
    });
    navigate('/home');
  };

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

      <button
        onClick={handleFinish}
        className="mt-6 w-full rounded-lg bg-sejongred py-2 font-semibold text-white transition hover:bg-red-600"
      >
        완료
      </button>
    </div>
  );
};

export default StepThree;
