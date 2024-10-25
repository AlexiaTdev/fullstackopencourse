const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='newPersonAdded'>
        {message}
      </div>
    )
  }
export default Notification;