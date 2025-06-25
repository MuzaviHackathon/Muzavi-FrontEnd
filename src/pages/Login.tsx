import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userId.trim() && password.trim()) {
      localStorage.setItem('userId', userId);
      navigate('/initialsetup');
    } else {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-extrabold leading-tight text-sejongred">무자비</h1>
        <p className="mb-8 mt-1 text-center text-sm text-gray-500">
          트랙제 이수 관리 프로그램 개발
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sejongred"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sejongred"
          />
          <button
            onClick={handleLogin}
            className="w-full rounded-lg bg-sejongred py-3 font-semibold text-white transition hover:bg-red-600"
          >
            로그인
          </button>
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center justify-center gap-3 text-gray-700">
        <img
          src="/assets/logo.png"
          alt="무자비 로고"
          className="h-10 w-10 rounded-full object-cover shadow ring-1 ring-gray-300"
        />
        <span className="text-lg font-semibold tracking-tight">Team. Muzavi</span>
      </div>
    </div>
  );
};

export default Login;
