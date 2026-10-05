'use client'
import {useEffect,useRef,useState} from 'react'

export default function CameraCapture({onCapture}:{onCapture:(data:string)=>void}){
 const video=useRef<HTMLVideoElement>(null); const stream=useRef<MediaStream|null>(null); const [error,setError]=useState('')
 useEffect(()=>{ (async()=>{try{stream.current=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false}); if(video.current) video.current.srcObject=stream.current}catch(e){setError('Camera access was not available. You can use the device file picker instead.')}})(); return()=>stream.current?.getTracks().forEach(t=>t.stop())},[])
 function snap(){if(!video.current)return; const c=document.createElement('canvas'); c.width=video.current.videoWidth||1200;c.height=video.current.videoHeight||900;c.getContext('2d')?.drawImage(video.current,0,0,c.width,c.height);onCapture(c.toDataURL('image/jpeg',.86))}
 return <div className="grid">{error?<div className="notice">{error}</div>:<div className="cameraWrap"><video ref={video} autoPlay playsInline muted/><div className="cameraOverlay"/><div className="cameraControls"><button className="shutter" aria-label="Capture" onClick={snap}/></div></div>}</div>
}
