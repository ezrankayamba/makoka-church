import React, { useEffect, useRef, useState } from 'react';
import MatIcon from "../icons/MatIcon"

function DropdownButton({ label, actions }) {
    const [open, setOpen] = useState(false)
    const [style, setStyle] = useState({})
    const btn = useRef(null)
    const toggleOpen = (e) => {
        e.stopPropagation()
        setOpen(!open)
        updateLocation()
    }
    const handleItemClick = (e, cb) => {
        e.stopPropagation()
        setOpen(false)
        cb()
    }
    const updateLocation = () => {
        if (btn.current) {
            let box = btn.current.getBoundingClientRect()
            setStyle({ top: box.top + 33, left: box.left })
        }
    }

    useEffect(() => {
        function handleScroll() {
            updateLocation()
        }
        function handleClickOut() {
            setOpen(false)
        }
        updateLocation()
        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('click', handleClickOut);
        return function () {
            window.removeEventListener('scroll', handleScroll, true)
            window.removeEventListener('click', handleClickOut)
        }
    }, [])
    return (
        <div className="dropdown-button">
            <button ref={btn} onClick={toggleOpen}>{label} <MatIcon name="menu_open" extra={"ml-1"} /></button>
            {open && <ul className="box-shadow p-0" style={style}>
                {actions.map(a => <li key={a.label} onClick={(e) => handleItemClick(e, a.clickHandler)}>{a.label}</li>)}
            </ul>
            }
        </div>
    );
}

export default DropdownButton;