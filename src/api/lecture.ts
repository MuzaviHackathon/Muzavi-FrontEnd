// api/lecture.ts
import { mockLectures } from '../mock/mockLectures';

export const fetchLectures = async (page: number) => {
  return {
    hasNext: false,
    lectures: mockLectures,
  };
};

export const searchLectures = async (keyword: string) => {
  return mockLectures.filter((lecture) =>
    lecture.title.toLowerCase().includes(keyword.toLowerCase())
  );
};
