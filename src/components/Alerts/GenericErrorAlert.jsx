import React from 'react'
import Swal from 'sweetalert2';

const GenericErrorAlert = (errorCode) => {
  return (
    errorCode == "ERR_NETWORK"? 
    Swal.fire({
        title: "Connection error",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
    })
    :
    Swal.fire({
        title: "Something went wrong",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
    })
  )
}

export default GenericErrorAlert