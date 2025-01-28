import React, {useEffect, useState} from 'react'
import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg'
import Button  from './components/Button'
import Inputfile from './components/Inputfile'
import Header from './components/Header'
import Inputvideo from './components/Inputvdeo'
import Resultimg from './components/Resultimg'
import Dbutton from './components/Dbutton'


const ffmpeg = createFFmpeg({log: true});


function App() {

  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(()=> {
    load();
  },[])

  const convertToGif = async () => {
    ffmpeg.FS("writeFile", "video1.mp4", await fetchFile(video))

    await ffmpeg.run(
      '-i',
      'video1.mp4',
      '-t',
      '2.5',
      '-55',
      '2.0',
      '-f',
      'gif',
      'out.gif'
    )

    const data = ffmpeg.FS("readfile", 'out.gif');
    const url = URL.createObjectURL(
      new Blob([data.buffer], {type: 'image/gif'})
    );
    setGif(url);
  }

  const download = (e) => {
    console.log(e.target.href);

    fetch(e.target.href, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URl.createObjectURL(new Blob([buffer]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download" , "image.gif");
          document.body.appendChild(link);
          link.click;
        })
      })
      .catch((err)=> {
        console.log(err);
      })
  }


  return ready ? (
    <div className='App'>
      <Header />
      {video && <Inputvideo video={video}/>}
      <Inputfile setVideo={setVideo}/>
      <Button convertToGif={convertToGif} />
      <h1>Result</h1>
      {gif && <Resultimg gif={gif}/>}
      {gif && <Dbutton gif={gif} download={download}/>}
    </div>
  ) : (
    <p>Loading . . . </p>
  )
}

export default App