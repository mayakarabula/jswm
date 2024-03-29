import { useState, useRef } from 'react'
import styled from 'styled-components'
import { colors } from '../style.js'

const SelectImage = styled.div`
  width: 100%;
  height: 100%;
  color: ${colors.white};
  background-color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    display: none;
  }

  span {
    cursor: pointer;
  }
`

const Image = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('${(props) => props.url}');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`

const SentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const Component = (props) => {
  const [image, setImage] = useState(null)
  const fileInput = useRef(null)

  if (props.input) {
    return <SentImage src={`data:image/png;base64, ${props.input}`} alt="" />
  }

  if (!image) {
    return (
      <SelectImage>
        <input
          onChange={(event) => {
            const url = URL.createObjectURL(event.target.files[0])
            setImage(url)
          }}
          type="file"
          ref={fileInput}
        />

        <span
          onClick={() => {
            fileInput.current.click()
          }}
        >
          select image
        </span>
      </SelectImage>
    )
  }

  return <Image url={image} />
}

const config = {
  mode: 'float',
  name: 'Image',
}

const module = { Component, config }

export default module
