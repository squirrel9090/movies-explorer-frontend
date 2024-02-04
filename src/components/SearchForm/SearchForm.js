import './SearchForm.css'
import { useLocation } from 'react-router-dom'
import CheckBox from '../CheckBox/CheckBox'

const SearchForm = (props) => {
  const { filter, onChangeFilter, onSearch } = props
  const { pathname } = useLocation()
  return (
    <section className='seachform'>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSearch()
        }}
        className={`search ${
          pathname !== '/movies' ? '/saved-movies' : 'search_saved'
        }`}
      >
        <div className='seachform__input-container'>
          <input
            className='seachform__input'
            placeholder='Фильм'
            type='text'
            value={filter?.searchText || ''}
            onChange={(evevt) =>
              onChangeFilter({ ...filter, searchText: evevt.target.value })
            }
          />
          <button type='submit' className='seachform__btn button'></button>
        </div>
        <div className='search__toggle search__toggle-update'>
          <CheckBox
            className='search__checkbox'
            value={filter?.isShortMovies}
            onChange={(value) =>
              onChangeFilter({ ...filter, isShortMovies: value })
            }
          />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
