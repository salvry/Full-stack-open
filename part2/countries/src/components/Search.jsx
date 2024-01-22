import React from 'react'

const Search = (props) => {
    return(
        <div>
            Search<input value = {props.searchName} onChange = {props.handle}  /> 
        </div>
    )
}

export default Search