import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import "./ListBox.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown, faCheck } from '@fortawesome/free-solid-svg-icons';

function MyListbox({ options, selectedOption, setSelectedOption}) {
    return (
        <Listbox value={selectedOption} onChange={setSelectedOption}>
            <div className="lb-container">
                <Listbox.Button className='lb-button'>{selectedOption.name}<FontAwesomeIcon className='list-icon' icon={faArrowsUpDown} /></Listbox.Button>
                <Listbox.Options className='lb-options'>
                    {options.map((option) => (
                        <Listbox.Option
                            className={({ active }) => `lb-option ${active ? 'bg-morado2 txt-white' : ''}`}
                            key={option.id}
                            value={option}
                        >
                            {({ selected }) => (
                                <>
                                    <span>{selected ? (<FontAwesomeIcon icon={faCheck} />) : null}</span>
                                    {option.name}
                                </>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    )
}

export default MyListbox