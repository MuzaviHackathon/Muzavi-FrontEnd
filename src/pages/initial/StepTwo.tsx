import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const StepTwo = ({ onNext, onPrev, onChange }: any) => {
  const [excelData, setExcelData] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { range: 3 });

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
      onChange('excelData', filtered);
    };
    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    const saved = localStorage.getItem('excelData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setExcelData(parsed);
        onChange('excelData', parsed);
      } catch (err) {
        console.error('엑셀 데이터 파싱 오류:', err);
      }
    }
  }, []);

  return (
    <div className="mx-auto mt-8 max-w-4xl space-y-6 overflow-y-auto rounded-xl bg-white p-6 shadow">
      <h2 className="text-center text-2xl font-bold text-sejongred">📚 기이수 과목 업로드</h2>
      <p className="text-center text-gray-600">
        이전에 이수한 과목의 성적 엑셀 파일을 업로드해주세요.
      </p>

      <div className="flex flex-col items-center">
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="mb-2" />
        <span className="text-sm text-gray-500">* 파일은 .xlsx 형식이어야 합니다</span>
      </div>

      {excelData.length > 0 && (
        <div className="mt-4 max-h-[40vh] overflow-y-auto rounded border p-4">
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

      <div className="mt-6 flex justify-between gap-4">
        <button
          onClick={onPrev}
          className="w-full rounded-lg border border-gray-300 bg-white py-3 font-semibold text-gray-700 hover:bg-gray-100"
        >
          이전
        </button>
        <button
          onClick={onNext}
          disabled={excelData.length === 0}
          className={`w-full rounded-lg py-3 font-semibold text-white transition ${
            excelData.length > 0
              ? 'bg-sejongred hover:bg-red-600'
              : 'cursor-not-allowed bg-gray-300'
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
