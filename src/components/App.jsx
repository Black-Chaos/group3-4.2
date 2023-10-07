import { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { fetchMovies } from 'services/moviesAPI';
import { moviesMapper } from 'utils/muviesMapper';
import { MoviesGallery } from './MoviesGallery/MoviesGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [isListShow, setIsListShow] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPoster, setCurrentPoster] = useState(null);

  useEffect(() => {
    if (isListShow) {
      setIsLoading(true);
      fetchMovies(page)
        .then(({ data: { results } }) => {
          setMovies(prevMovies => [...prevMovies, ...moviesMapper(results)]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (!isListShow) {
      setMovies([]);
      setPage(1);
    }
  }, [isListShow, page]);

  // componentDidUpdate(_, prevState) {
  //   const { isListShow, page } = this.state;
  //   if (
  //     (prevState.isListShow !== isListShow || prevState.page !== page) &&
  //     isListShow
  //   ) {
  //     this.setState({
  //       isLoading: true,
  //     });
  //     fetchMovies(page)
  //       .then(({ data: { results } }) => {
  //         this.setState(({ movies }) => ({
  //           movies: [...movies, ...moviesMapper(results)],
  //         }));
  //       })
  //       .finally(() => {
  //         this.setState({
  //           isLoading: false,
  //         });
  //       });
  //   }

  //   if (prevState.isListShow !== isListShow && !isListShow) {
  //     this.setState({
  //       movies: [],
  //       page: 1,
  //     });
  //   }
  // }

  const toggleClick = () => {
    setIsListShow(prevIsListShow => !prevIsListShow);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const openModal = data => {
    setCurrentPoster(data);
  };

  const closeModal = () => {
    setCurrentPoster(null);
  };

  return (
    <>
      <Button
        text={isListShow ? 'Hide movies list' : 'Show movies list'}
        handleClick={toggleClick}
      />
      {isListShow && (
        <>
          <MoviesGallery movies={movies} openModal={openModal} />
          <Button text={'Load More'} handleClick={loadMore} />
        </>
      )}
      {currentPoster && (
        <Modal closeModal={closeModal} currentPoster={currentPoster} />
      )}
      {isLoading && <Loader />}
    </>
  );
};

// export class App extends Component {
//   state = {
//     isListShow: false,
//     movies: [],
//     page: 1,
//     isLoading: false,
//   };

//   componentDidUpdate(_, prevState) {
//     const { isListShow, page } = this.state;
//     if (
//       (prevState.isListShow !== isListShow || prevState.page !== page) &&
//       isListShow
//     ) {
//       this.setState({
//         isLoading: true,
//       });
//       fetchMovies(page)
//         .then(({ data: { results } }) => {
//           this.setState(({ movies }) => ({
//             movies: [...movies, ...moviesMapper(results)],
//           }));
//         })
//         .finally(() => {
//           this.setState({
//             isLoading: false,
//           });
//         });
//     }

//     if (prevState.isListShow !== isListShow && !isListShow) {
//       this.setState({
//         movies: [],
//         page: 1,
//       });
//     }
//   }

//   toggleClick = () => {
//     this.setState(s => ({
//       isListShow: !s.isListShow,
//     }));
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { isListShow, movies, isLoading } = this.state;

//     return (
//       <>
//         <Button
//           text={isListShow ? 'Hide movies list' : 'Show movies list'}
//           handleClick={this.toggleClick}
//         />
//         {isListShow && (
//           <>
//             <MoviesGallery movies={movies} />
//             <Button text={'Load More'} handleClick={this.loadMore} />
//           </>
//         )}

//         {isLoading && <Loader />}
//       </>
//     );
//   }
// }
