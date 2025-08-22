import React from 'react'
import Swal from 'sweetalert2';

const SucessfulAlert = () => {
  return (
    Swal.fire({
        title: "Sucessful operation",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
    })
  )
}

export default SucessfulAlert