import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const majorTabs = {
  컴퓨터공학과: ['인공지능시스템', '메타버스 플랫폼', '클라우드 컴퓨팅'],
  콘텐츠소프트웨어학과: ['공간비주얼 SW', '인터렉티브 플랫폼'],
  인공지능데이터사이언스학과: ['지능형에이전트', 'AI콘텐츠', '데이터인텔리전스'],
};

// {
//     //학생테이블
//     id: 1,
//     professor_id: 1,
//     name: '수업1',
//     department: '컴퓨터공학과',
//     classfication: '전필',
//     credit: 3,
//     course_code: '123',
//     semester: 2024 - 1,
//     rating_avg: 3.2,
//     day_time: '월수 18시',
//     room: 207,
//     //교수 테이블
//     professor_name: '김김김',
//     professor_department: '인공지능학과',
//     //태그 테이블
//     tag_name: ['과제 많음', '성적 깐깐함'],
//     frequency: 10,
//   },

const dummyLectures = [
  {
    name: 'AI프로그래밍',
    score: 90,
    professor: '홍길동',
    tag: ['과제 많음', '시험 깐깐함'],
    track: '인공지능시스템',
    description: '파이썬 기반 AI 실습 위주 강의',
  },
  {
    name: 'aaa',
    score: 80,
    professor: '길동홍',
    tag: ['과제 많음', '시험 깐깐함'],
    track: '인공지능시스템',
    description: '파이썬 기반 AI 실습 위주 강의',
  },
  {
    name: 'bbbb',
    score: 70,
    professor: '홍길동',
    tag: ['과제 많음', '시험 깐깐함'],
    track: '인공지능시스템',
    description: '파이썬 기반 AI 실습 위주 강의',
  },
  {
    name: 'dddd',
    score: 33,
    professor: '홍길동',
    tag: ['과제 많음', '시험 깐깐함'],
    track: '인공지능시스템',
    description: '파이썬 기반 AI 실습 위주 강의',
  },
  {
    name: '메타버스 UX디자인',
    score: 85,
    professor: '홍길동',
    tag: ['과제 많음', '시험 깐깐함'],
    track: '메타버스 플랫폼',
    description: 'UX 중심의 메타버스 UI 강의',
  },
  {
    name: '클라우드 운영실습',
    score: 80,
    professor: '홍길동',
    tag: ['과제 많음', '시험 깐깐함'],
    track: '클라우드 컴퓨팅',
    description: 'AWS 기반 실습 위주 강의',
  },
];

const trackProgressMock: Record<string, number> = {
  인공지능시스템: 90,
  '메타버스 플랫폼': 70,
  '클라우드 컴퓨팅': 50,
};

const PIE_COLORS = ['#e60026', '#f0f0f0'];

const Home = () => {
  const [user, setUser] = useState<{ name: string; major: keyof typeof majorTabs } | null>(null);
  const [selectedTab, setSelectedTab] = useState('');
  const [modalLecture, setModalLecture] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('userInfo');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const { name, major } = parsed;
        setUser({ name, major });
        setSelectedTab(majorTabs[major]?.[0] || '');
      } catch (err) {
        console.error('유저 정보 파싱 오류:', err);
      }
    }
  }, []);

  if (!user) return null;

  // 현재 선택된 탭의 이수율 데이터 구성
  const pieData = [
    { name: '이수완료', value: trackProgressMock[selectedTab] || 0 },
    { name: '미이수', value: 100 - (trackProgressMock[selectedTab] || 0) },
  ];

  return (
    <div className="mt-3 space-y-3 p-6">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-xl font-bold text-sejongred">{user.name}님</p>
        <p className="mt-1 text-base text-gray-600">{user.major}</p>
      </div>
      {/* 탭 */}
      <div className="">
        {/* {user.major}과 트랙명 */}
        <div className="scrollbar-hide mb-2 flex gap-2 overflow-x-auto">
          {majorTabs[user.major].map((tab) => (
            <button
              key={tab}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                selectedTab === tab ? 'bg-sejongred text-white shadow' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-xl border p-4 shadow">
            <h3 className="mb-2 text-lg font-semibold">트랙 이수 가능성</h3>
            <div className="flex items-center justify-center">
              <PieChart width={140} height={140}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((_, idx) => (
                    <Cell key={idx} fill={PIE_COLORS[idx]} />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-800 text-sm font-bold"
                >
                  {trackProgressMock[selectedTab] || 0}%
                </text>
              </PieChart>
            </div>
          </div>

          {/* 강의 추천 리스트 */}
          <div className="scrollbar-hide max-h-[250px] space-y-4 overflow-y-auto pr-1">
            {dummyLectures
              .filter((lec) => lec.track === selectedTab)
              .map((lec) => (
                <div
                  key={lec.name}
                  className="cursor-pointer rounded-xl border p-4 shadow-sm transition hover:bg-gray-100"
                  onClick={() => setModalLecture(lec)}
                >
                  <div className="text-lg font-bold">{lec.name}</div>
                  <div className="text-sm">{lec.professor} 교수</div>
                  <div className="text-sm text-gray-500">
                    과목 이수 가능성:{' '}
                    <span className="font-semibold text-sejongred">{lec.score}%</span>
                  </div>
                  {lec.tag && (
                    <div className="flex flex-wrap gap-2 text-xs font-medium text-sejongred">
                      {lec.tag.map((tag) => (
                        <span key={tag} className="rounded-full bg-red-50 px-2 py-1">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
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
              <div className="flex justify-between">
                <h3 className="text-xl font-bold text-sejongred">{modalLecture.name}</h3>
                <h1 className="text-m text-red-900">{modalLecture.score}%</h1>
              </div>
              <div className="text-xs text-gray-400">{modalLecture.professor} 교수</div>
              {/* <div className="my-2 text-xs text-gray-400">학과: {user.major}</div> */}
              <div className="mb-2 text-xs text-gray-400">트랙: {modalLecture.track}</div>
              <p className="text-sm leading-relaxed text-gray-800">
                AI로 이 강좌를 이러한 확률로 이수 가능성을 측정한 이유. <br />
                {modalLecture.description}
              </p>
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
    </div>
  );
};

export default Home;
