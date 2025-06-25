// Recommend.tsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const track_BY_MAJOR: Record<string, string[]> = {
  컴퓨터공학과: ['전체보기', '인공지능시스템', '메타버스 플랫폼', '클라우드 컴퓨팅'],
  콘텐츠소프트웨어학과: ['전체보기', '공간비주얼 SW', '인터렉티브 플랫폼'],
  인공지능데이터사이언스학과: ['전체보기', '지능형에이전트', 'AI콘텐츠', '데이터인텔리전스'],
};

const mockLectures = [
  {
    lectureId: 1,
    name: '인공지능 개론',
    professor: '김철수',
    tag: ['과제 많음', '팀플 많음'],
    track: '인공지능시스템',
    description: 'AI 전반에 대한 이해를 돕는 입문 강의입니다.',
  },
  {
    lectureId: 2,
    name: '가상현실 개론',
    professor: '박지은',
    tag: ['과제 적음', '직접 호명'],
    track: '메타버스 플랫폼',
    description: 'VR/AR 개념과 활용 사례를 학습합니다.',
  },
  {
    lectureId: 3,
    name: '클라우드 컴퓨팅',
    professor: '이민호',
    tag: ['과제 없음', '유체크'],
    track: '클라우드 컴퓨팅',
    description: '클라우드 인프라의 실습 중심 강의입니다.',
  },
  {
    lectureId: 4,
    name: 'AI콘텐츠 제작',
    professor: '김유정',
    tag: ['시험 어려움', '직접 호명'],
    track: 'AI콘텐츠',
    description: 'AI를 활용한 콘텐츠 제작 기법을 익힙니다.',
  },
  {
    lectureId: 5,
    name: '스크롤 테스트',
    professor: 'Test',
    tag: ['시험 어려움', '직접 호명'],
    track: 'AI콘텐츠',
    description: 'AI를 활용한 콘텐츠 제작 기법을 익힙니다.',
  },
];

export default function Recommend() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [user, setUser] = useState<{ name: string; major: string } | null>(null);
  const [categories, setCategories] = useState<string[]>(['전체보기']);
  const [selectedtrack, setSelectedtrack] = useState(searchParams.get('track') || '전체보기');
  const [searchValue, setSearchValue] = useState(searchParams.get('searchValue') || '');
  const [filteredLectures, setFilteredLectures] = useState(mockLectures);
  const [modalLecture, setModalLecture] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('userInfo');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const { name, major } = parsed;
        setUser({ name, major });
        setCategories(track_BY_MAJOR[major] || ['전체보기']);
      } catch (err) {
        console.error('userInfo 파싱 오류:', err);
      }
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(`?track=${selectedtrack}&searchValue=${searchValue}`);

      let result = mockLectures.filter(
        (l) => selectedtrack === '전체보기' || l.track === selectedtrack
      );

      if (searchValue) {
        result = result.filter((l) => l.name.toLowerCase().includes(searchValue.toLowerCase()));
      }

      setFilteredLectures(result);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchValue, selectedtrack, navigate]);

  if (!user) return null;

  return (
    <div className="mt-3 flex h-[calc(100vh-9.5rem)] flex-col p-6">
      {/* 검색창 */}
      <div className="relative mb-4 w-full max-w-screen-md">
        <input
          type="text"
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-sejongred"
          placeholder="강의명을 검색해보세요"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <img
          src="/assets/search.svg"
          alt="검색"
          className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
        />
      </div>

      {/* 카테고리 탭 */}
      <div className="scrollbar-hide mb-4 flex w-full max-w-screen-md gap-2 overflow-x-auto pb-1">
        {categories.map((track) => (
          <button
            key={track}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              selectedtrack === track
                ? 'bg-sejongred text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedtrack(track)}
          >
            {track}
          </button>
        ))}
      </div>

      {/* 강의 리스트 */}
      <div className="scrollbar-hide w-full max-w-screen-md flex-1 overflow-y-auto pb-6">
        {filteredLectures.length > 0 ? (
          filteredLectures.map((lecture, index) => (
            <motion.div
              key={lecture.lectureId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="mb-4 cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow transition hover:bg-gray-50"
              onClick={() => setModalLecture(lecture)}
            >
              <div className="mb-1 text-lg font-semibold text-gray-900">{lecture.name}</div>
              <div className="mb-1 text-sm text-gray-600">{lecture.professor} 교수</div>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-sejongred">
                {lecture.tag.map((tag: string) => (
                  <span key={tag} className="rounded-full bg-red-50 px-2 py-1">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-10 text-center text-gray-500">검색 결과가 없습니다.</div>
        )}
      </div>

      {/* 모달 */}
      {modalLecture && (
        <div className="z-51 fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="relative w-80 rounded-xl bg-white p-6 shadow-xl">
            <button
              onClick={() => setModalLecture(null)}
              className="absolute right-3 top-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-sejongred">{modalLecture.name}</h3>
            <div className="text-xs text-gray-400">{modalLecture.professor} 교수</div>
            <div className="mb-2 text-xs text-gray-400">트랙: {modalLecture.track}</div>
            <p className="text-sm leading-relaxed text-gray-800">{modalLecture.description}</p>
            {modalLecture.tag && (
              <div className="mt-1 flex flex-wrap gap-2 text-xs font-medium text-sejongred">
                {modalLecture.tag.map((tag) => (
                  <span key={tag} className="rounded-full bg-red-50 px-2 py-1">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
