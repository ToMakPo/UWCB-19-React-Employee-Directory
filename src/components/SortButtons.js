import {useContext, useRef} from 'react'
import SortContext from '../utils/SortContext'

const SortButtons = ({name, path}) => {
    const {sort, setSort} = useContext(SortContext)
    const root = useRef()

    const clsName = 'sort-active'

    function toggleSort(event, ascending) {
        event.preventDefault()
        
        let list = [...sort]
        let data = root.current.dataset.sort * 1

        // Remove the sort of the current filter
        if (data !== 0) {
            const dirc = data === 1
            list = list.filter(([n, a]) => !(n === name && a === dirc))
        }

        // Determain the new sort
        if (data === 0) {
            data = ascending ? 1 : -1
        } else if (data === 1) {
            data = ascending ? 0 : -1
        } else if (data === -1) {
            data = ascending ? 1 : 0
        }
        
        // Add the sort to the list
        if (data !== 0) {
            list.push([name, ascending, path])
        }

        setSort(list)
    }

    function getSort() {
        for (let i = 0; i < sort.length; i++) {
            const [n, v] = sort[i]
            if (n === name) {
                return [(v ? 1 : -1), i + 1]
            }
        }
        return [0, '']
    }

    const sortData = getSort()

    return (
        <span className='sort-buttons' ref={root} data-sort={sortData[0]}>
            <button className={'sort-asc ' + (sortData[0] === 1 ? clsName : '')} onClick={event => toggleSort(event, true)}>▲</button>
            <small>{sortData[1]}</small>
            <button className={'sort-dec ' + (sortData[0] === -1 ? clsName : '')} onClick={event => toggleSort(event, false)}>▼</button>
        </span>
    )
}

export default SortButtons