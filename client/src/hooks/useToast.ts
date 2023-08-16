import Toastify from 'toastify-js'

type ToastType = 'success' | 'error' | 'warring' | 'info'

export interface IToastConfig extends Toastify.Options {
  type: ToastType
  message: string | undefined;
}

const useToast = () => {
  const getExtraToastClass = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'notification-success'
      case 'error':
        return 'notification-error'
      case 'warring':
        return 'notification-warring'
      default:
        return 'notification-info'
    }
  }

  const showToast = ({ type, message, ...config }: IToastConfig) => {
    // close all notification before show new one
    // ...

    Toastify({
      text: message,
      duration: 5000,
      gravity: 'top',
      position: 'right',
      close: true,
      className: getExtraToastClass(type),
      ...config,
    }).showToast()
  }

  return {
    showToast,
  }
}

export default useToast
