import React from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ViewPaste = () => {

  const {id} = useParams();
  const allPastes = useSelector((state) => state.pastes.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  // console.log(paste);

  function handelCopy(){
    navigator.clipboard.writeText(paste.content);
    toast.success("Copied to clipboard");
  }
  function handelClick(){
    toast.error("To change use edit option!");
  }

  return (
    <div>
      <div className='w-full flex flex-col gap-4 p-4 items-center'
      >
        <div className='flex gap-2 w-[80%]'>
          <input
            className='w-full p-0.5 pl-3 border border-black rounded-2xl cursor-pointer'
            type="text" 
            placeholder='Enter the title: ' 
            value={paste.title}
            // disabled
            onClick={handelClick}
            // onChange={(e) => setTitle(e.target.value)}
            />

          {/* <button
            className='border border-black rounded-xl p-1'
            onClick={createPaste}>
            {
              (pasteID ? "Update my paste" : "Create my paste")
              }
              </button> */}
        </div>

        <div className='flex flex-col w-[80%] justify-center border border-black rounded-2xl overflow-hidden'>
          <div className='flex w-full p-1 bg-gray-300 justify-end'>
            <button
            onClick={handelCopy}
            className='cursor-pointer'
            >Copy</button>
          </div>
          <textarea
            className='p-2'
            value={paste.content}
            placeholder='Enter the content here'
            // onChange={(e) => setValue(e.target.value)}
            rows={20}
            onClick={handelClick}
            // disabled
            />
        </div>
      </div>
    </div>
  )
}

export default ViewPaste
