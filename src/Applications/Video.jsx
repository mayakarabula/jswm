import { useRef } from 'react';
import { useState } from 'react';
import ReactPlayer from 'react-player'
import styled from 'styled-components'

const VideoWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`


const Component = () => {
    const [videoFilePath, setVideoFilePath] = useState(null);
    const [subtitlesPath, setSubtitlesPath] = useState(null);
    const videoInputEl = useRef(null);
    const subtitlesInputEl = useRef(null);

    const handleVideoUpload = (event) => {
        setVideoFilePath(URL.createObjectURL(event.target.files[0]));
    };

    const handleSubtitlesUpload = (event) => {
        console.log(event.target.files[0])
        console.log(URL.createObjectURL(event.target.files[0]))
        setSubtitlesPath(URL.createObjectURL(event.target.files[0]));
    };

    return (
        <VideoWrapper>
          <details class="dropdown" style={{ zIndex: 1000 }}>
             <summary class="dd-toggle">
               File
             </summary>
             <ul class="dd-menu">
                 <li onClick={() => {
                    videoInputEl.current.click()
                 }}>Open file</li>
                 <li onClick={() => {
                    subtitlesInputEl.current.click()
                 }}>Open subtitles</li>
             </ul>
             
             <input ref={videoInputEl} type="file" onChange={handleVideoUpload} style={{ display: 'none' }} />
             <input ref={subtitlesInputEl} type="file" onChange={handleSubtitlesUpload} style={{ display: 'none' }} />
           </details>
     
         <ReactPlayer 
             url={videoFilePath}
             width='100%'
             height='100%'
             controls={true}
             config={{
                file: {
                  attributes: {
                    crossOrigin: "true",
                  },
                  tracks: [
                    {
                      kind: "subtitles",
                      src: subtitlesPath,
                      srcLang: "en",
                      default: true,
                    },
                  ],
                },
              }}
         />
        </VideoWrapper>
     )
}

const config = {
  mode: 'float',
  name: 'Video',
}

const module = { Component, config }

export default module