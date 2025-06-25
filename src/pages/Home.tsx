import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const majorTabs = {
  컴퓨터공학과: ['인공지능시스템', '메타버스 플랫폼', '클라우드 컴퓨팅'],
  콘텐츠소프트웨어학과: ['공간비주얼 SW', '인터렉티브 플랫폼'],
  인공지능데이터사이언스학과: ['지능형에이전트', 'AI콘텐츠', '데이터인텔리전스'],
};

const dummyLectures = [
  {
    name: 'AI프로그래밍',
    score: 90,
    category: '인공지능시스템',
    description: '파이썬 기반 AI 실습 위주 강의',
  },
  {
    name: 'aaa',
    score: 80,
    category: '인공지능시스템',
    description: '파이썬 기반 AI 실습 위주 강의',
  },
  {
    name: 'bbbb',
    score: 70,
    category: '인공지능시스템',
    description: '파이썬 기반 AI 실습 위주 강의',
  },
  {
    name: 'dddd',
    score: 33,
    category: '인공지능시스템',
    description: '파이썬 기반 AI 실습 위주 강의',
  },
  {
    name: '메타버스 UX디자인',
    score: 85,
    category: '메타버스 플랫폼',
    description: 'UX 중심의 메타버스 UI 강의',
  },
  {
    name: '클라우드 운영실습',
    score: 80,
    category: '클라우드 컴퓨팅',
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
    <div className="mt-3 space-y-6 p-6">
      <div className="text-xl font-bold">
        {user.name}님<br />
        <span className="text-base text-gray-600">{user.major}</span>
      </div>

      <div className="flex space-x-2 overflow-x-auto">
        {majorTabs[user.major].map((tab) => (
          <button
            key={tab}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${
              selectedTab === tab ? 'bg-sejongred text-white' : 'border-gray-300'
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center rounded-xl border p-4 shadow">
          <h3 className="mb-2 text-lg font-semibold">이수 가능성</h3>
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

        <div className="scrollbar-hide max-h-[250px] space-y-4 overflow-y-auto pr-1">
          {dummyLectures
            .filter((lec) => lec.category === selectedTab)
            .map((lec) => (
              <div
                key={lec.name}
                className="cursor-pointer rounded-xl border p-4 shadow hover:bg-gray-50"
                onClick={() => setModalLecture(lec)}
              >
                <div className="text-lg font-bold">{lec.name}</div>
                <div className="text-sm text-gray-500">과목 이수 가능성: {lec.score}</div>
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
            <h3 className="mb-2 text-lg font-bold">{modalLecture.name}</h3>
            <p className="text-sm text-gray-700">{modalLecture.description}</p>
            <div className="mt-2 text-xs text-gray-400">카테고리: {modalLecture.category}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
