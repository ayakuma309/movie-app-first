import { NextApiRequest, NextApiResponse } from 'next';
//バックエンドのAPIエンドポイントを介してリクエスト
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const APIKEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

    const detailUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=ja`;
    const recommendUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${APIKEY}&language=ja&page=1`;
    const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}&language=ja`;

    const [detailRes, recommendRes, videoRes] = await Promise.all([
      fetch(detailUrl),
      fetch(recommendUrl),
      fetch(videoUrl),
    ]);

    const [detailData, recommendData, videoData] = await Promise.all([
      detailRes.json(),
      recommendRes.json(),
      videoRes.json(),
    ]);

    const movieData = {
      movieDetail: detailData,
      movieRecommend: recommendData.results,
      trailerUrl: videoData,
    };

    res.status(200).json(movieData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

export default handler;
