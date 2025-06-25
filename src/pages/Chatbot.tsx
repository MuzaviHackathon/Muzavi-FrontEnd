import { useEffect, useRef, useState } from 'react';

export default function KakaoStyleChat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' },
    { id: 2, sender: 'user', text: '꿀 강의를 좀 알려주세요!' },
    { id: 3, sender: 'bot', text: '어떤 스타일의 강의를 선호하시나요?' },
    { id: 4, sender: 'user', text: '저는 시험이 객관식이면 좋겠어요!' },
    {
      id: 5,
      sender: 'bot',
      text: '그렇다면 김문석 교수님의 강의 추천드려요. 컴퓨터네트워크, C#프로그래밍 등이 있어요',
    },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { id: prev.length + 1, sender: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, sender: 'bot', text: '확인했습니다. 더 궁금한 점이 있으신가요?' },
      ]);
    }, 1000);
  };

  return (
    <div className="flex h-screen flex-col bg-[#F6F7F9]">
      <header className="bg-[#5A8DEE] py-4 text-center text-lg font-semibold text-white">
        학교 생활의 꿀을 위해
      </header>
      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-2" ref={scrollRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm shadow ${msg.sender === 'user' ? 'bg-[#5A8DEE] text-white' : 'bg-white text-black'}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center bg-white px-4 py-3">
        <input
          className="mr-2 flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none"
          placeholder="메시지를 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          className="rounded-full bg-[#5A8DEE] px-4 py-2 text-sm text-white"
          onClick={handleSend}
        >
          전송
        </button>
      </div>
    </div>
  );
}
