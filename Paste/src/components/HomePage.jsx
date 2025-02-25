import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';


const HomePage = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteID = searchParams.get("pasteid")
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.pastes.pastes);

  useEffect(() => {
    if(pasteID){
      const paste = allPastes.find((p) => p._id === pasteID);
      setTitle(paste.title);
      setValue(paste.content);
    }
    // setTitle();
  }, [pasteID])

  function createPaste(){
    // console.log("Clicked");
    const paste = {
      title: title,
      content: value,
      _id: pasteID || Date.now().toString(36),
      createdAt: new Date().toISOString()
    }

    

    if(pasteID){
      dispatch(updateToPastes(paste));
    }
    else{
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className='w-full flex flex-col gap-4 p-4 items-center'>
      <div className='flex gap-2 w-[80%]'>
        <input
          className='w-[72%] p-0.5 pl-3 border rounded-2xl'
          type="text" 
          placeholder='Enter the title: ' 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className='cursor-pointer border border-black rounded-xl p-1.5 bg-indigo-600 text-white'
          onClick={createPaste}>
          {
            (pasteID ? "Update my paste" : "Create my paste")
          }
        </button>
      </div>

      <div className='flex w-full justify-center'>
        <textarea
          className='w-[80%] p-2 border border-black rounded-2xl'
          value={value}
          placeholder='Enter the content here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default HomePage
