import React from 'react';

type TLectureItemProps = {
  lectureId: number;
  title: string;
  professor: string;
  tags: string[];
};

const LectureItem = ({ title, professor, tags }: TLectureItemProps) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-xl bg-gray-100 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold">{title}</div>
        <button className="rounded-md bg-sejongred px-3 py-1 text-sm text-white">
          AI 요약보기
        </button>
      </div>
      <div className="text-sm text-gray-600">교수명: {professor}</div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LectureItem;
