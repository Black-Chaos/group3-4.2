export const Modal = ({ closeModal, currentPoster: { src, alt } }) => {
  return (
    <div className="backDrop">
      <div className="modal">
        <img src={`https://image.tmdb.org/t/p/w500${src}`} alt={alt} />
        <button type="button" onClick={closeModal}>
          Close Modal
        </button>
      </div>
    </div>
  );
};
