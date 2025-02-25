import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Paste = () => {

  const pastes = useSelector((state) => state.pastes.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  // function handelEdit(){
    
  // }
  // function handelView(){
  //   // <Link to='/pastes/${paste?._id}'/>
  // }
  function handelDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
  }
  function handelCopy(content){
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  }
  function handelShare(id){
    navigator.clipboard.writeText(`localhost:5173/?pasteid=${id}`);
  }

  return (
    <div className='flex flex-col gap-5 items-center justify-center p-2'>
      <input
        className='border border-black rounded-lg w-[90%] p-0.5'
        type="search"
        placeholder='Search here'
        value = {searchTerm}
        onChange = {(e) => setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-4 w-full items-center'>
      {
        filteredData.length > 0 && filteredData.map(
          (paste) =>{
            const cont = paste.content;
            return(
              <div className='flex justify-between border border-black rounded w-[90%] p-2' key={paste?._id}>
                <div className='flex flex-col gap-2'>
                  <div className='font-medium text-2xl'>
                    {paste.title}
                  </div>
                  <div className='text-gray-500'>
                    {
                      cont.split(/\s+/).slice(0, 20).join(" ")+"..."
                    }
                  </div>
                </div>
                <div className='flex flex-col items-end'>
                  <div className='flex gap-1 place-content-evenly'>
                    <Link to={`/?pasteid=${paste?._id}`}>Edit</Link>
                    <Link to={`/pastes/${paste?._id}`}>View</Link>
                    <button onClick={() => handelDelete(paste?._id)}
                      className='cursor-pointer'>Delete</button>
                    <button onClick={() => handelCopy(paste?.content)}
                      className='cursor-pointer'>Copy</button>
                    <button onClick={() => handelShare(paste?._id)}
                      className='cursor-pointer'>Share</button>
                  </div>
                  <div>
                    {new Date(paste.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            )
          }
        )
      }
      </div>
    </div>
  )
}

export default Paste
