import React, { useEffect, useState } from 'react';
import { useRef } from 'react';

function Dropdown({ options, name, defaultValue, onChange, ...rest }) {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [value, setValue] = useState(options.find(option => option.id === defaultValue))
    console.log(defaultValue, rest);
    const toggle = () => {
        setOpen(prev => !prev)
    }
    const inputRef = useRef(null)
    const arrowRef = useRef(null)
    const clearRef = useRef(null)
    useEffect(() => {
        document.addEventListener('click', close)
        return () => document.removeEventListener('click', close)
    }, [])

    function close(e) {
        setOpen(e && (e.target === inputRef.current || e.target === arrowRef.current))
    }
    function filter(options) {
        return options.filter(option => option.name.toLowerCase().indexOf(query.toLocaleLowerCase()) > -1)
    }
    function displayValue() {
        if (query.length > 0) return query
        if (value) return value.name
        return ""
    }
    function selectValue(option) {
        setValue(option)
        setQuery("")
        onChange({ target: { value: option.id, name: name } })
        toggle()
    }
    const clearSelection = () => {
        setQuery("")
        setValue(null)
        onChange({ target: { name: name } })
    }
    const filtered = filter(options)
    return (
        <div className="dropdown">
            <div className="dropdown-control" onClick={toggle}  >
                <input
                    type="text"
                    ref={inputRef}
                    onClick={toggle}
                    value={displayValue()}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setValue(null)
                        if (query.length === 0) {
                            onChange({ target: { name: name } })
                        }
                    }}
                    placeholder={value ? value.name : "Select ..."}
                />
                {value && <svg onClick={(e) => {
                    e.preventDefault()
                    clearSelection()
                }} ref={clearRef} height="20" width="20" viewBox="0 0 20 20" fill="none" className="dropdown-clear" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>}
                <span className="dropdown-separator"></span>
                <svg ref={arrowRef} height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="dropdown-arrow"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </div>
            <ul className={`options ${open ? 'open' : ''}`}>
                {filtered.map(option =>
                    <li
                        onClick={() => selectValue(option)}
                        className={value && option.name === value.name ? "selected" : ""}
                        key={option.id}
                    >{option['name']}</li>)}
            </ul>
        </div>
    );
}

export default Dropdown;