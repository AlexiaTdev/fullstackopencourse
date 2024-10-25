const Notification = ({ message, unsuccessfulEvent }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={unsuccessfulEvent ? 'messageStyle errorOnDeletion' : 'messageStyle newPersonAdded'}>
        {message}
      </div>
    )
  }
export default Notification;