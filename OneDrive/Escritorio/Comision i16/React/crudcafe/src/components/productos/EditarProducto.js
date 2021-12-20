import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { campoRequerido, rangoNumero } from "../helpers/helpers";
import Swal from "sweetalert2";

const EditarProducto = (props) => {
  const { id } = useParams();
  // console.log(id);
  const [producto, setProducto] = useState({});
  const [categoria, setCategoria] = useState('');
  const URL = process.env.REACT_APP_API_URL + "/" + id;
  //crear variables ref
  const nombreProductoRef = useRef('');
  const precioProductoRef = useRef(0);

  useEffect(async () => {
    // consultar a la api el producto que tiene el id
    try {
      // realizar una consulta GET
      const respuesta = await fetch(URL);
      // console.log(respuesta)
      if (respuesta.status === 200) {
        const dato = await respuesta.json();
        // console.log(dato);
        setProducto(dato);
        setCategoria(dato.categoria)
      }
    } catch (error) {
      console.log(error);
      //mostrar cartel error al usuario
    }
  }, []);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    //validar los campos
    // console.log(nombreProductoRef)
    // console.log(nombreProductoRef.current.value)
    if(campoRequerido(nombreProductoRef.current.value) && rangoNumero(precioProductoRef.current.value) && campoRequerido(categoria)){
      //console.log('aqui envio los datos')
       //construir el objeto a enviar a la api
      const productoModificado ={
        nombreProducto: nombreProductoRef.current.value,
        precioProducto: precioProductoRef.current.value,
        categoria
      }
     // console.log(productoModificado)
     try{
       //consulta PUT para modificar valores en la api
      const respuesta = await fetch(URL,{
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(productoModificado)
      })

      console.log(respuesta);
      if(respuesta.status === 200){
        //mostrar un cartel al usuario
        Swal.fire(
          'Producto modificado',
          'Su producto fue correctamente actualizado',
          'success'
        )
        //consultar nuevamente a la api
        props.consultaAPI();
      }

     }catch(error){
       console.log(error);
     }
    }else{
      //mostrar un cartel error
      console.log('mostrar el error')
    } 
  }

  return (
    <Container>
      <h1 className="display-3 text-center my-4">Editar Producto</h1>
      <hr />
      <Form className="my-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre del producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: café"
            defaultValue={producto.nombreProducto}
            ref={nombreProductoRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="ej: 50"
            defaultValue={producto.precioProducto}
            ref={precioProductoRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Categoria*</Form.Label>
          <Form.Select value={categoria} onChange={(e)=> setCategoria(e.target.value)}>
            <option value="">Seleccione una opcion</option>
            <option value="bebida-caliente">Bebida Caliente</option>
            <option value="bebida-fria">Bebida Fria</option>
            <option value="sandwich">Sandwich</option>
            <option value="dulce">Dulce</option>
            <option value="salado">Salado</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Guardar cambios
        </Button>
      </Form>
    </Container>
  );
};

export default EditarProducto;
