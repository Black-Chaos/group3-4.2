import { Component } from "react";
import { Button } from "./Button/Button";
import { fetchMovies } from "services/moviesAPI";
import { moviesMapper } from "utils/muviesMapper";
import { MoviesGallery } from "./MoviesGallery/MoviesGallery";
import { Loader } from "./Loader/Loader";

export class App extends Component {
  state = {
    isListShow: false,
    movies: [],
    page: 1,
    isLoading: false,
  }

  componentDidUpdate(_, prevState) {
    const {isListShow, page} = this.state
    if (prevState.isListShow !== isListShow && isListShow) {
      this.setState({
        isLoading: true,
      })
      fetchMovies(page).then(({ data: {results} }) => {
        this.setState(({movies}) => ({movies: [...movies, ...moviesMapper(results)]}))
      }).finally(() => {
        this.setState({
          isLoading: false,
        })
      })
    }

    if (prevState.isListShow !== isListShow && !isListShow) {
      this.setState({
        movies: [],
      });
    }
  }

  toggleClick = () => {
    this.setState(s => ({
      isListShow: !s.isListShow,
    }))
  }
  
  render() {
    const { isListShow, movies, isLoading } = this.state;

    return (
      <>
        <Button text={isListShow ? 'Hide movies list' : 'Show movies list'} handleClick={this.toggleClick} />
        {isListShow && <MoviesGallery movies={movies}/>}
        {isLoading && <Loader/>}
      </>
    )
  }
}