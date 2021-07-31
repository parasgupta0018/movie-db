import React, { useState, useRef } from "react";


const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const searchRef = useRef(searchValue);
  searchRef.current = searchValue;
  
  const handleSearchInputChanges = (e) => {
      
    setSearchValue(e.target.value);
    searchRef.current = e.target.value;
    props.setLoading(true);
    props.setErrorMessage(null);
    if(searchRef.current!=""){
        props.setEmpty(false);
        setTimeout(()=>{props.search(searchRef.current)},2000);
    }
    else{
        props.setEmpty(true);
    }
  }

  return (
      <form className="search">
        <div className="input-group mb-3">
          <input
            className="form-control"
            value={searchValue}
            onChange={handleSearchInputChanges}
            type="text"
            placeholder="Search to display movies"
          />
        </div>
      </form>
    );
}

export default Search;