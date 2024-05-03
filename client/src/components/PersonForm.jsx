import React, {useState} from 'react'

const PersonForm = ({ onSubmit,  nameValue, numberValue, nameChange, numberChange}) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input value={nameValue} onChange={nameChange} />
                </div>
                <div>
                    number: <input type={numberValue} onChange={numberChange}/>
                </div>

                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm