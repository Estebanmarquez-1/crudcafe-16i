export const campoRequerido = (valor) => {
  if (valor.trim().length > 0) {
    return true;
  } else {
    return false;
  }
};

export const rangoNumero = (valor) => {
  if (valor > 0 && valor < 5000) return true;
  else return false;
};

// const rangoNumero = (valor)=> {
//   // validar con expresion regular
 
//   let patron = /^(?:0*(?:[0-9]|[1-9][0-9][0-9]?|[1-4][0-9][0-9][0-9])(?:[.][0-9])?|5000(?:[.]0)?)$/;
//   if (patron.test(valor)) {
//    
//     return true;
//   } else {
//    
//     return false;
//   }
// }

// export {campoRequerido, rangoNumero}