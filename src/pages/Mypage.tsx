import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: '',
    major: '',
    studentId: '',
    semesterCompleted: '',
    careerGoal: '',
    semesterPlan: '',
    lecturePref: {
      강의력: '',
      과제: '',
      팀플: '',
      성적: '',
      출결: '',
      시험: '',
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [excelData, setExcelData] = useState<any[]>([]);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    const lecturePref = localStorage.getItem('lecturePreference');
    const excelStored = localStorage.getItem('excelData');

    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      setUserInfo((prev) => ({
        ...prev,
        name: parsed.name || '',
        major: parsed.major || '',
        studentId: parsed.studentId || '',
        semesterCompleted: parsed.semesterCompleted || '',
        careerGoal: parsed.careerGoal || '',
        semesterPlan: parsed.semesterPlan || '',
      }));
    }

    if (lecturePref) {
      const parsedPref = JSON.parse(lecturePref);
      setUserInfo((prev) => ({
        ...prev,
        lecturePref: {
          강의력: parsedPref.강의력 || '',
          과제: parsedPref.과제 || '',
          팀플: parsedPref.팀플 || '',
          성적: parsedPref.성적 || '',
          출결: parsedPref.출결 || '',
          시험: parsedPref.시험 || '',
        },
      }));
    }

    if (excelStored) setExcelData(JSON.parse(excelStored));
  }, []);

  const handleUserInput = (e: any) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrefInput = (category: string, value: string) => {
    setUserInfo((prev) => ({
      ...prev,
      lecturePref: { ...prev.lecturePref, [category]: value },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { range: 2 });
      const filtered = data.map((row: any) => {
        let category = (row['이수구분'] || '').toString().replace(/\s/g, '');
        if (category.startsWith('교선')) category = '교선';
        return {
          학수번호: row['학수번호'],
          교과목명: row['교과목명'],
          이수구분: category,
          학점: Number(row['학점']),
          등급: row['등급'] || '-',
        };
      });
      setExcelData(filtered);
      localStorage.setItem('excelData', JSON.stringify(filtered));
    };
    reader.readAsBinaryString(file);
  };

  const handleSave = () => {
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        name: userInfo.name,
        major: userInfo.major,
        studentId: userInfo.studentId,
        semesterCompleted: userInfo.semesterCompleted,
        careerGoal: userInfo.careerGoal,
        semesterPlan: userInfo.semesterPlan,
      })
    );
    localStorage.setItem('lecturePreference', JSON.stringify(userInfo.lecturePref));
    localStorage.setItem('excelData', JSON.stringify(excelData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    const stored = localStorage.getItem('userInfo');
    const lecturePref = localStorage.getItem('lecturePreference');
    const excelStored = localStorage.getItem('excelData');

    if (stored) setUserInfo((prev) => ({ ...prev, ...JSON.parse(stored) }));
    if (lecturePref) {
      const parsedPref = JSON.parse(lecturePref);
      setUserInfo((prev) => ({
        ...prev,
        lecturePref: {
          강의력: parsedPref.강의력 || '',
          과제: parsedPref.과제 || '',
          팀플: parsedPref.팀플 || '',
          성적: parsedPref.성적 || '',
          출결: parsedPref.출결 || '',
          시험: parsedPref.시험 || '',
        },
      }));
    }
    if (excelStored) setExcelData(JSON.parse(excelStored));
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="mb-10 mt-3 h-[100dvh] space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">마이페이지</h2>
        <div className="flex gap-2">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="font-semibold text-blue-500">
              수정
            </button>
          ) : (
            <>
              <button onClick={handleCancel} className="text-gray-400">
                취소
              </button>
              <button onClick={handleSave} className="font-semibold text-blue-500">
                저장
              </button>
            </>
          )}
          <button
            onClick={handleLogout}
            className="rounded bg-red-100 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-200"
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* 사용자 정보 입력 */}
      <div className="grid grid-cols-2 gap-2">
        <input
          name="name"
          placeholder="이름"
          value={userInfo.name}
          onChange={handleUserInput}
          className={`w-full rounded border p-2 ${!isEditing ? 'pointer-events-none bg-gray-100 text-gray-500' : ''}`}
          disabled={!isEditing}
        />
        <select
          name="major"
          value={userInfo.major}
          onChange={handleUserInput}
          className={`w-full rounded border p-2 ${!isEditing ? 'pointer-events-none bg-gray-100 text-gray-500' : ''}`}
          disabled={!isEditing}
        >
          <option value="">학과 선택</option>
          <option value="컴퓨터공학과">컴퓨터공학과</option>
          <option value="콘텐츠소프트웨어학과">콘텐츠소프트웨어학과</option>
          <option value="인공지능데이터사이언스학과">인공지능데이터사이언스학과</option>
        </select>
        <input
          name="studentId"
          placeholder="학번"
          value={userInfo.studentId}
          onChange={handleUserInput}
          className={`w-full rounded border p-2 ${!isEditing ? 'pointer-events-none bg-gray-100 text-gray-500' : ''}`}
          disabled={!isEditing}
        />
        <select
          name="semesterCompleted"
          value={userInfo.semesterCompleted}
          onChange={handleUserInput}
          className={`w-full rounded border p-2 ${!isEditing ? 'pointer-events-none bg-gray-100 text-gray-500' : ''}`}
          disabled={!isEditing}
        >
          <option value="">이수 학기 선택</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}학기
            </option>
          ))}
        </select>
        <input
          name="careerGoal"
          placeholder="선호 직무"
          value={userInfo.careerGoal}
          onChange={handleUserInput}
          className={`col-span-2 rounded border p-2 ${!isEditing ? 'pointer-events-none bg-gray-100 text-gray-500' : ''}`}
          disabled={!isEditing}
        />
        <select
          name="semesterPlan"
          value={userInfo.semesterPlan}
          onChange={handleUserInput}
          className={`col-span-2 rounded border p-2 ${!isEditing ? 'pointer-events-none bg-gray-100 text-gray-500' : ''}`}
          disabled={!isEditing}
        >
          <option value="">재학 예정 학기 선택</option>
          {['2024-1', '2024-2', '2025-1', '2025-2', '2026-1'].map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>
      </div>

      {/* 선호도 설정 */}
      <div className="grid grid-cols-2 gap-1">
        {Object.entries(userInfo.lecturePref).map(([k, v]) => (
          <div key={k} className="space-y-1">
            <label className="text-sm font-medium">#{k}</label>
            <select
              disabled={!isEditing}
              value={v}
              onChange={(e) => handlePrefInput(k, e.target.value)}
              className={`w-full rounded border p-2 ${!isEditing ? 'pointer-events-none bg-gray-100 text-gray-500' : ''}`}
            >
              {(k === '과제' || k === '팀플') &&
                ['적음', '보통', '많음'].map((opt) => <option key={opt}>{opt}</option>)}
              {k === '성적' &&
                ['깐깐한', '너그러움'].map((opt) => <option key={opt}>{opt}</option>)}
              {k === '출결' &&
                ['직접호명', '유체크'].map((opt) => <option key={opt}>{opt}</option>)}
              {k === '시험' &&
                ['객관식', '주관식', '혼합'].map((opt) => <option key={opt}>{opt}</option>)}
              {k === '강의력' &&
                ['좋음', '보통', '나쁨'].map((opt) => <option key={opt}>{opt}</option>)}
            </select>
          </div>
        ))}
      </div>

      {/* 엑셀 업로드 */}
      {isEditing && (
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="mt-4" />
      )}

      {/* 강의 리스트 미리보기 */}
      {excelData.length > 0 && (
        <div className="mt-4 max-h-[15vh] overflow-y-auto rounded border p-4">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-1">학수번호</th>
                <th className="p-1">교과목명</th>
                <th className="p-1">이수구분</th>
                <th className="p-1">학점</th>
                <th className="p-1">등급</th>
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-1 text-center">{row.학수번호}</td>
                  <td className="p-1">{row.교과목명}</td>
                  <td className="p-1 text-center">{row.이수구분}</td>
                  <td className="p-1 text-center">{row.학점}</td>
                  <td className="p-1 text-center">{row.등급}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
