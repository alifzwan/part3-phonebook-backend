import React from 'react'

const Person = ({ persons, onClick }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => 
          <li key={person.id}>
            {person.name} {person.number} 
            <button onClick={() => onClick(person.id)}>delete</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Person