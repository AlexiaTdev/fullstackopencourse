const Filter = (props) => {
    return (
      <div>
        filter shown with
        <input 
          value={props.searchName}
          onChange={props.handleSearchByName}
        />
      </div>
    )
  }
export default Filter;