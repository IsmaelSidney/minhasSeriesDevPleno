import React, { useState,useEffect} from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom'

const NovaSerie = ({match}) => {
    const [name,setName] = useState("")
    const [success,setSuccess] = useState(false)
    const [genres,setGenres] = useState([])
    const [genreId,setGenreId] = useState('')
    const onChange = evt => {
      setName(evt.target.value)
    }
    const [data,setData] = useState({})
    useEffect(() => {
      axios.get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data)
      //  setForm(res.data)
      })

    },[match.params.id])
    useEffect(() => {

      axios.get('/api/genres')
      .then(res => {
        setGenres(res.data.data)
        const genres = res.data.data
        const encontrado = genres.find(value => data.genre === value.name)
        if(encontrado){
           setGenreId(encontrado.id)
        }
      })
    },[data])
    const onChangeGenre = evt => {
      setGenreId(evt.target.value)
    }
    const save = () => {
      axios.post('/api/series' , {
        name
      })
      .then(res => {
        setSuccess(true)
      })
    }
    if(success){
      return <Redirect to='/series' />
    }
  return (
    <div className='container'>
        <h1>Nova Série</h1>
        <form>
        <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input type="text" value={name} onChange={onChange} className="form-control" id="name" placeholder="Nome da Série"/>
        </div>
        <div className="form-group">
            <label htmlFor="name">Gênero</label>
        <select className="custom-control" onChange={onChangeGenre} value={genreId}>
          { genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
        </select>
        </div>
        <button type="button"  onClick={save} className="btn btn-primary">Salvar</button>
        
        </form>
    </div>
  )
  };

  export default NovaSerie