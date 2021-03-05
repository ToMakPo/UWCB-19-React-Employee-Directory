const Filter = ({name, changeFunction, ...attr}) => {
    return (
        <input
            id={name + '-filter'}
            className='filter-input'
            onChange={changeFunction}
            type="search"
            {...attr}
        />
    )
}

export default Filter