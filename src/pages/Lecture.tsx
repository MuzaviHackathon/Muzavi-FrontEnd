// Recommend.tsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CATEGORY_BY_MAJOR: Record<string, string[]> = {
  컴퓨터공학과: ['전체보기', '인공지능시스템', '메타버스 플랫폼', '클라우드 컴퓨팅'],
  콘텐츠소프트웨어학과: ['전체보기', '공간비주얼 SW', '인터렉티브 플랫폼'],
  인공지능데이터사이언스학과: ['전체보기', '지능형에이전트', 'AI콘텐츠', '데이터인텔리전스'],
};

const mockLectures = [
  {
    lectureId: 1,
    title: '인공지능 개론',
    professor: '김철수',
    tags: ['과제 많음', '팀플 많음'],
    category: '인공지능시스템',
    description: 'AI 전반에 대한 이해를 돕는 입문 강의입니다.',
  },
  {
    lectureId: 2,
    title: '가상현실 개론',
    professor: '박지은',
    tags: ['과제 적음', '직접 호명'],
    category: '메타버스 플랫폼',
    description: 'VR/AR 개념과 활용 사례를 학습합니다.',
  },
  {
    lectureId: 3,
    title: '클라우드 컴퓨팅',
    professor: '이민호',
    tags: ['과제 없음', '유체크'],
    category: '클라우드 컴퓨팅',
    description: '클라우드 인프라의 실습 중심 강의입니다.',
  },
  {
    lectureId: 4,
    title: 'AI콘텐츠 제작',
    professor: '김유정',
    tags: ['성적 깐깐함', '직접 호명'],
    category: 'AI콘텐츠',
    description: 'AI를 활용한 콘텐츠 제작 기법을 익힙니다.',
  },
];

export default function Recommend() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [user, setUser] = useState<{ name: string; major: string } | null>(null);
  const [categories, setCategories] = useState<string[]>(['전체보기']);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || '전체보기'
  );
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
        setCategories(CATEGORY_BY_MAJOR[major] || ['전체보기']);
      } catch (err) {
        console.error('userInfo 파싱 오류:', err);
      }
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(`?category=${selectedCategory}&searchValue=${searchValue}`);

      let result = mockLectures.filter(
        (l) => selectedCategory === '전체보기' || l.category === selectedCategory
      );

      if (searchValue) {
        result = result.filter((l) => l.title.toLowerCase().includes(searchValue.toLowerCase()));
      }

      setFilteredLectures(result);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchValue, selectedCategory, navigate]);

  if (!user) return null;

  return (
    <div className="mt-3 flex h-[calc(100vh-9.5rem)] flex-col p-6">
      <div className="mx-auto w-full max-w-screen-md pb-2">
        <div className="mb-4 text-xl font-bold">
          {user.name}님<br />
          <span className="text-base text-gray-600">{user.major}</span>
        </div>
        <input
          type="text"
          className="mb-4 w-full rounded-lg border px-4 py-2"
          placeholder="강의명 검색"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="scrollbar-hide mb-2 flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              key={category}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm ${
                selectedCategory === category
                  ? 'bg-sejongred text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="scrollbar-hide mx-auto w-full max-w-screen-md flex-1 overflow-y-auto pb-6">
        {filteredLectures.length > 0 ? (
          filteredLectures.map((lecture, index) => (
            <motion.div
              key={lecture.lectureId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="mb-4 cursor-pointer rounded-lg border p-4 shadow"
              onClick={() => setModalLecture(lecture)}
            >
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{lecture.title}</h2>
              </div>
              <div className="mb-1 text-sm text-gray-700">{lecture.professor}</div>
              <div className="text-sm text-gray-500">
                {lecture.tags.map((tag: string) => (
                  <span key={tag} className="mr-2">
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

      {modalLecture && (
        <div className="z-51 fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="relative w-80 rounded-xl bg-white p-6 shadow-xl">
            <button
              onClick={() => setModalLecture(null)}
              className="absolute right-3 top-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h3 className="mb-2 text-lg font-bold">{modalLecture.title}</h3>
            <p className="text-sm text-gray-700">{modalLecture.description}</p>
            <div className="mt-2 text-xs text-gray-400">카테고리: {modalLecture.category}</div>
          </div>
        </div>
      )}
    </div>
  );
}
