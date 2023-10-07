export function MoviesGallery({ movies = [], openModal }) {
  return (
    <ul>
      {movies.map(({ id, title, poster_path, vote_count, watched }) => {
        return (
          <li key={id}>
            <h2>{title}</h2>
            <p>Vote count: {vote_count}</p>
            <p>Watched: {watched ? 'yes' : 'no'}</p>
            <button
              type="button"
              onClick={() => openModal({ src: poster_path, alt: title })}
            >
              Show poster
            </button>
          </li>
        );
      })}
    </ul>
  );
}
