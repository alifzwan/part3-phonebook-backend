import React, {useState} from 'react'

const Filter = ({ value, onChange }) => {
    return (
        <div>
            <div>
                filter shown with <input value={value} onChange={onChange} />
            </div>
        </div>
    )
}

export default Filter