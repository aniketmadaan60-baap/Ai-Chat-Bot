import React, { useEffect, useState } from 'react'
import "./App.css"
import { Navbar } from './components/Navbar'
import { GoogleGenAI } from "@google/genai";
import { BeatLoader } from 'react-spinners';
import Markdown from 'react-markdown';
import { RiComputerFill } from 'react-icons/ri';
import { GiOpenBook, GiWhiteBook } from 'react-icons/gi';
import { FaBloggerB } from 'react-icons/fa6';
// AIzaSyBfo3UKppd9jKLje8SqnTGwiO1xNbi8qd0
function App() {
  const[screen, setScreen] = useState(1);
  const[prompt, setPrompt] = useState("")
  const [loading, setLoading]  = useState(false)
  const ai = new GoogleGenAI({apiKey : "AIzaSyB7sMzutnmkDRiwTC9f6EZFxG7d5hK4PyU"});
  let Card1 = "Create a site using html css and js"
  let Card2 = "Write a book for me. Topic is coding."
  let Card3 = "Tell me a comedy Story."
  let Card4 = "Create a website using html css and js"
  let messages = [
    
  ]
  const [data, setData] = useState(messages)

  const handleCall = (sentence)=>{
    
    setPrompt(sentence)
    getResponse()
  }
  
  async function getResponse() {
    if(prompt === ""){
      alert("Please enter a prompt!")
      return;
    }
    setData(prevData => [...prevData, {role : "user", content: prompt}])
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    
    setData(prevData => [...prevData, {role : "ai", content: response.text}])
    console.log(response.text);
    setScreen(2)
    setLoading(false)
    
  }
  
  
  return (
    
    <div>
      <Navbar/>
      <div className='screens'>
      {
        screen===1 ?
        <div className='screen-1 w-screen h-[65vh] flex items-center justify-center flex-col'>
          <h3 className='!text-[40px] font[700]'>Bot<span className='text-purple-500'>GPT</span></h3>
          <div className='cardList flex items-center gap-[15px]'>
            <div onClick={()=>handleCall(Card1)} className='card w-[200px] h-[150px] cursor-pointer bg-zinc-800 transition-all hover:bg-gray-800 rounded-lg'>
              <i className='text-[30px]'><RiComputerFill /></i>
              <p className='cardText'>{Card1}</p>
            </div>
            <div onClick={()=>handleCall(Card2)} className='card w-[200px] h-[150px] cursor-pointer bg-zinc-800 transition-all hover:bg-gray-800 rounded-lg'>
              <i className='text-[30px]'><GiWhiteBook /></i>
              <p className='cardText'>{Card2}</p>
            </div>
            <div onClick={()=>handleCall(Card3)} className='card w-[200px] h-[150px] cursor-pointer bg-zinc-800 transition-all hover:bg-gray-800 rounded-lg'>
              <i className='text-[30px]'><GiOpenBook /></i>
              <p className='cardText'>{Card3}</p>
            </div>
            <div onClick={()=>handleCall(Card4)} className='card w-[200px] h-[150px] cursor-pointer bg-zinc-800 transition-all hover:bg-gray-800 rounded-lg'>
              <i className='text-[30px]'><FaBloggerB /></i>
              <p className='cardText'>{Card4}</p>
            </div>
          </div>
        </div> : <>
        <div className='screen-2 overflow-y-auto w-screen h-[70vh]'>
        {
          data ? data.map((item, index)=>{
            return (
              <div key={index}>
                {
                  item.role === "user"?
                  <div className='user rounded-lg bg-gray-800 w-fit max-w-[40vw] ml-auto'>
                    <p className='text-[14px] text-[gray]'>User</p>
                    {/* <p>{(!aiResponse) ? item.content : item.content}</p> */}
                    <p>{item?.content}</p>
                  </div> :
                  <div className='rounded-lg ai bg-gray-800  w-fit max-w-[40vw] mr-auto'>
                    <p className='text-[14px] text-[gray]'>BotGPT</p>
                    {/* <p>{(aiResponse) ? item.content : "response"}</p> */}
                    <Markdown >{item?.content}</Markdown>
                  </div> 
                }
              </div>

            )
          }) : "No Messages Yet !"
        } 
        {
          loading ?
          <div className='loader '><BeatLoader color='#fff'/></div> : ""

        }

        </div>
        </>
      }
      </div>
      <div className='inputBox h-[15vh]  '>
        <div className='input bg-zinc-800 rounded-lg mx-auto flex items-center gap-2.5 h-15'>
          <input 
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
              getResponse();
              setPrompt('')
            }
            }} value={prompt} onChange={(e) => {setPrompt(e.target.value)
              setScreen(2)
            }} type='text' placeholder='Enter your Prompt' className='promptInput rounded-lg flex-1 bg-transparent  outline-none text-[18px] font-medium'></input>
        </div>
        <p className='disclaimer text-[gray] text-center mt-3'>BotGPT can make mistake! cross check it.</p>
      </div>
    </div>
  )
}

export default App