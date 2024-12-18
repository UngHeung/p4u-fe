import { baseAxios } from '@/apis/axiosInstance';
import { TagProps } from '@/components/tag/Tag';
import { SetStateAction } from 'react';

export const handleTagSearch = async ({
  tagKeyword,
  setTagList,
  setIsTagLoading,
}: {
  tagKeyword: string;
  setTagList: React.Dispatch<React.SetStateAction<TagProps[]>>;
  setIsTagLoading: React.Dispatch<SetStateAction<boolean>>;
}) => {
  try {
    const url = `/tag/keyword?keyword=${tagKeyword}`;
    const response = await baseAxios.get(url);

    setTagList(response.data);
  } catch (error: any) {
    console.error(error);
  } finally {
    setIsTagLoading(false);
  }
};
