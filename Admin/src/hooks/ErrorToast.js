import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ErrorToast = ({ error }) => {

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error, toast]);

  return null;
};

export default ErrorToast;