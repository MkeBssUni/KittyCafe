function confirmarEliminacion(){
    Swal.fire({
        title: '¿Est&aacute; seguro de eliminar el registro?',
        text: "No podr&aacute; recuperar el registro",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DB0F0F',
        cancelButtonColor: '#FFDC00',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'El registro ha sido elimado correctamente.',
            'success'
          )
        }
      })
}

function confirmarRegistro(){
    Swal.fire({
        title: '¿Est&aacute; seguro de guardar el registro?',
        text: "Podr&aacute; modificarlo o eliminarlo posteriormente",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1BFF00',
        cancelButtonColor: '#FFDC00',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            
            'Guardado!',
            'El registro ha sido guardado correctamente.',
            'success'
          )
        }
      })
}


function confirmarModificacion(){
    Swal.fire({
        title: '¿Est&aacute; seguro de modificar el registro?',
        text: "Podr&aacute; modificarlo o eliminarlo posteriormente",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1BFF00',
        cancelButtonColor: '#FFDC00',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Guardado!',
            'El registro ha sido modificado correctamente.',
            'success'
          )
        }
      })
}