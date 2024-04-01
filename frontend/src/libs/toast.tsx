import {toast} from 'react-toastify';

const toastOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'light',
}

export const toastDefault = (message, options = {}) => {
  options = {
    ...toastOptions,
    ...options,
  }

  toast(message, options)
}

export const info = (message, options = {}) => {
  options = {
    ...toastOptions,
    ...options,
  }

  toast.info(message, options)
}

export const success = (message, options = {}) => {
  options = {
    ...toastOptions,
    ...options,
  }

  toast.success(message, options)
}

export const warning = (message, options = {}) => {
  options = {
    ...toastOptions,
    ...options,
  }

  toast.warning(message, options)
}

export const error = (message, options = {}) => {
  options = {
    ...toastOptions,
    ...options,
  }

  toast.error(message, options)
}

