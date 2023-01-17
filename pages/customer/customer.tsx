import React, { useState } from 'react'

import { BsUpload } from 'react-icons/bs'
import { ImSpinner2 } from 'react-icons/im'
import Logo from '../assets/logo.png'
import { setTimeout } from 'timers'
import { Container, Card, Button } from '@mui/material'
import axios from 'axios'

export default function Upload() {
  const [file, setFile] = useState<string>()
  const [imagePreview, setImagePreview] = useState<any>('')
  const [base64, setBase64] = useState<string>()
  const [name, setName] = useState<string>()
  const [size, setSize] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onChange = (e: any) => {
    console.log('file', e.target.files[0])
    let file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = _handleReaderLoaded
      reader.readAsBinaryString(file)
    }
  }

  const _handleReaderLoaded = (readerEvt: any) => {
    let binaryString = readerEvt.target.result
    setBase64(btoa(binaryString))
  }

  const onFileSubmit =async (e: any) => {
    setIsLoading(true)
    e.preventDefault()
    console.log('bine', base64)
    let payload = { image: base64 }
    const url = await axios.post("http://localhost:3000/api/customer/encode",payload);
    console.log('payload', url)

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const photoUpload = (e: any) => {
    e.preventDefault()
    const reader = new FileReader()
    const file = e.target.files[0]
    console.log('reader', reader)
    console.log('file', file)
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setFile(file)
        setSize(file.size)
        setName(file.name)
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const remove = () => {
    setFile('')
    setImagePreview('')
    setBase64('')
    setName('')
    setSize('')
  }

  return (
    <Container>
      <form  onSubmit={(e) => onFileSubmit(e)}   onChange={(e) => onChange(e)}>
        <Card
        >
            {imagePreview === '' ? (
              <BsUpload />
            ) : (
              <img src={imagePreview} alt='Icone adicionar' />
            )}
            <input
              type='file'
              name='avatar'
              id='file'
              accept='.jpef, .png, .jpg'
              onChange={photoUpload}
              src={imagePreview}
            />

          {imagePreview !== '' && (
            <>
              <section>
                <label>Nome</label>
                <span>{name}</span>

                <label>Tamanho</label>
                <span>{size}</span>
              </section>

              {/* <button type='submit'>
              </button> */}
              <Button type='button' variant="contained" color='error' onClick={remove}>
                Remover
              </Button>
              <Button type='submit'>Submit</Button>
            </>
          )}
        </Card>
      </form>
      
    </Container>
  )
}