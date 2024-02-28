import React, { useState, useEffect, useRef } from "react";
import "./dropdown.css";
import { Link } from "react-router-dom";

function Dropdown({ items = [], dropdownTitle, children, _logout }) {
    const activatorRef = useRef(null);
    const dropdownListRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const clickHandler = () => {
        setIsOpen(!isOpen);
    };

    const keyHandler = event => {
        if (event.key === "Escape" && isOpen) {
            setIsOpen(false);
        }
    };

    const clickOutsideHandler = event => {
        if (dropdownListRef.current) {
            if (
                dropdownListRef.current.contains(event.target) ||
                activatorRef.current.contains(event.target)
            ) {
                return;
            }

            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            dropdownListRef.current.querySelector("a").focus();
            document.addEventListener("mousedown", clickOutsideHandler);
        } else {
            document.addEventListener("mousedown", clickOutsideHandler);
        }
    }, [isOpen]);

    return (
        <div className="dropdown_wrapper" onKeyUp={keyHandler}>
            <button
                className="dropdown_activator"
                aria-haspopup="true"
                aria-controls={dropdownTitle}
                onClick={clickHandler}
                ref={activatorRef}
            >
                {children}
            </button>
            <ul
                ref={dropdownListRef}
                className={`dropdown_item_list ${isOpen ? "active" : ""}`}>
                {items.map((item, index) => {
                    return (
                        <li className="item_list" key={index}>
                            {item.onClick ? (
                                <Link onClick={item.onClick}>{item.anchor}</Link>
                            ) : (
                                <Link to={item.slug}>{item.anchor}</Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Dropdown;