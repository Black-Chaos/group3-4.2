export function moviesMapper(arr) {
  return arr.map(({ id, title, poster_path, vote_count }) => {
    return {
      id,
      title,
      poster_path,
      vote_count,
      watched: false,
    };
  });
}
