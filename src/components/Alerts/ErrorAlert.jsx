import { ErrorMessage } from 'formik';
import React from 'react'
import Swal from 'sweetalert2';

const ErrorAlert = (error) => {

  var errorMessage = "Something went wrong"

  if(error.code != "ERR_NETWORK"){

    const data = error?.response?.data

    if(typeof data === "string"){
      errorMessage = data
    } else if(data instanceof Object){
      const firstKey = Object.keys(data).at();
      const firstElement = data[firstKey].at();
      errorMessage = firstElement
    }

    
  } else {
    errorMessage = "Connection error"
  }

  Swal.fire({
      title: errorMessage,
      icon: "error",
      // showConfirmButton: false,
      // timer: 2000
  })


}

export default ErrorAlert