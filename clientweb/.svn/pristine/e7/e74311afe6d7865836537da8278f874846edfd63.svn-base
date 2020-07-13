import addNotification from 'react-push-notification';

export const webNotification = (title, message, onClick) => {
  console.log("notification")
  addNotification({
    title,
    onClick,
    message,
    theme: 'darkblue',
    closeButton: "Đóng",
    duration: 10000,
    native: true,
    vibrate: 2
  });
}

const RenderNotification = {
  autoHideDuration: 3000,
  anchorOrigin: {
    vertical: "top",
    horizontal: "center"
  }
}
export default RenderNotification;