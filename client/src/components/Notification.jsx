import React from 'react'

const Notification = ({ message, error }) => {
    if(message === null && error === null){
        return null
    }
    return (
      <div >
        {message && <div className='message'>{message}</div>}
        {error && <div className='error'>{error}</div>}
      </div>
    )
}

export default Notification