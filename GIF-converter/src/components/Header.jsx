import React from 'react'
import styled from 'styled-components'

const H1 = styled.h1`
            margin: 0;
            padding: 12px;
            background-color: #000;
            color: #fff;
            font-family: sans-serif;
            font-size: 3em;`

export default function Header() {
    
  return (
   <div>
    <H1>Video to GIF converter Webassembly</H1>
   </div>
  )
}
