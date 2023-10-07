'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import link from '@/assets/link.svg'
import regroup from '@/assets/Regroup.svg'
 interface Data{
  content: string,
  author: string,
  tags:string[],
}

export default function Home() {
  const [quote, setQuote] = useState<Data|null>(null)
  useEffect(() => {
    getQuote()
  }, [])

  const getQuote = async () => {
    const res = await fetch('https://api.quotable.io/random')
    const data = await res.json()
    const newQuote: Data ={
      content: data.content,
      author: data.author,
      tags: data.tags,
    }
    setQuote(newQuote)

  }
  if(!quote) return (
    <main className="min-h-screen w-full grid place-content-center bg-background">
      <div className='flex flex-col items-center justify-center gap-5'>
        <div className='flex flex-col items-center justify-center gap-5 bg-dark-gray bg-[url("../assets/bg-image-random-quote.svg")]'>
          
        </div>
      </div>
    </main>
  )
  
  return (
    <main className="min-h-screen w-full grid place-content-center bg-background">
      <div className='flex flex-col items-center justify-center gap-5 '>
        <div className='flex flex-col items-center justify-center w-screen max-w-sm md:max-w-xl p-10 rounded-xl bg-cover gap-5 bg-dark-gray bg-[url("../assets/bg-image-random-quote.svg")]'>
          <div className='flex flex-col items-center justify-center gap-2.5'>
            <h3 className='font-semibold text-white'>{quote.author}</h3>
            <div className='flex gap-2 items-center'>
              {quote.tags.map((tag, index) => (
                <span key={index} className='text-xs text-primary border border-primary rounded-3xl py-1 px-2'>{tag}</span>
              ))}
            </div>
          </div>
          <p className='text-white text-opacity-50 text-xl text-center'>"{quote.content}"</p>
        </div>
        <div className='flex'>
          <button className='border border-light-gray rounded-l-md p-1' onClick={getQuote}><Image src={regroup} alt='regroup' /></button>
          <button className='border border-light-gray rounded-r-md border-l-0 p-1' ><Image src={link} alt='link' /></button>
        </div>
      </div>
    </main>
  )
}
