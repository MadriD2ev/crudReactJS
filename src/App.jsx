import React from 'react';
import {firebase} from './firebase'

function App() {

  const [tareas, setTareas] = React.useState([])
  const [obtenerTareas, setobtenerTareas] = React.useState('')
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')


  React.useEffect(() => {

    const obtenerDatos = async () => {

      try {

        const db = firebase.firestore()
        const data = await db.collection('tareas').get()
        //console.log(data.docs);
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        console.log(arrayData);
        setTareas(arrayData)

      } catch (error) {
        console.log(error);
      }

    }

    obtenerDatos()

  },[])

  const agregar = async (e) => {
    e.preventDefault()

    if(!obtenerTareas.trim()){
      console.log('está vacío')
      return
    }

    try {

      const db = firebase.firestore()
      const nuevaTarea ={
        name: obtenerTareas,
        fecha: Date.now()
      }
      const data = await db.collection('tareas').add(nuevaTarea)
      setTareas([
        ...tareas,
        {...nuevaTarea, id: data.id}
      ])
      setobtenerTareas('')
      
    } catch (error) {
      console.log(error);
    }

    console.log(obtenerTareas);
  }

  const eliminar = async (id) => {
    try {
      
      const db = firebase.firestore()
      await db.collection('tareas').doc(id).delete()

      const arrayFiltrado = tareas.filter(item => item.id !== id)
      setTareas(arrayFiltrado)

    } catch (error) {
      console.log(error);
    }
  }

  const activarEdicion = (item) => {
    setModoEdicion(true)
    setobtenerTareas(item.name)
    setId(item.id)
  }

  const editar = async(e) => {
    e.preventDefault()
    if(!obtenerTareas.trim()){
      console.log('vacio');
      return
    }

    try {
      const db = firebase.firestore()
      await db.collection('tareas').doc(id).update({
        name: obtenerTareas
      })
      const arrayEditado = tareas.map(item => (
        item.id === id ? {id: item.id, fecha: item.fecha, name: obtenerTareas} : item
      ))
      setTareas(arrayEditado)

      setModoEdicion(false)
      setobtenerTareas('')
      setId('')

    } catch (error) {
      console.log(error);
    }
  } 

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {
              tareas.map(item => (
                <li className = "list-group-item" key={item.id}>
                  {item.name}
                  <button 
                    className="btn btn-danger btn-sm float-end"
                    onClick={()=> eliminar(item.id)}
                  >
                    Eliminar
                  </button>
                  <button 
                    className="btn btn-warning btn-sm float-end me-2"
                    onClick = {() => activarEdicion(item)}
                  >
                    Editar
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-md-6">
          <h3>
            {
              modoEdicion ? 'Editar tarea' : 'Agregar tarea'
            }
          </h3>
          <form onSubmit={modoEdicion ? editar : agregar}>
            <input 
              type="text" 
              placeholder="Ingrese tarea"
              className="form-control mb-2"
              onChange = { e => setobtenerTareas(e.target.value)}
              value = {obtenerTareas}
            />
            <button 
              className={
                modoEdicion ? 'btn-warning btn-block' : 'btn-dark btn-block'
              }
              type="submit"
            >
              {
                modoEdicion ? 'Editar' : 'Agregar'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
