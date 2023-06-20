import { NextPage, GetServerSideProps } from 'next';
import React from 'react';
import { RecommendProps } from '@/types/Types';

const RecommendMovie: NextPage<RecommendProps> = ({ id }: RecommendProps) => {
  return (
    <div>{id}</div>
  );
};

export default RecommendMovie;

export const getServerSideProps: GetServerSideProps<RecommendProps> = async (context) => {
  const { id } = context.query; // クエリパラメータから'id'を取得

  // 'id'をnumberに変換する
  const parsedId = Number(id);

  // 'parsedId'を使用してRecommendPropsを作成
  const props: RecommendProps = { id: parsedId };

  return {
    props,
  };
};
