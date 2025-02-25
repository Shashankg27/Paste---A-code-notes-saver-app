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
    <div className='flex flex-col gap-5 items-center justify-center'>
      <input
        className='border border-black rounded-lg w-[90%]'
        type="search"
        placeholder='Search here'
        value = {searchTerm}
        onChange = {(e) => setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-4'>
      {
        filteredData.length > 0 && filteredData.map(
          (paste) =>{
            return(
              <div className='border border-black rounded' key={paste?._id}>
                <div>
                  {paste.title}
                </div>
                <div>
                  {paste.content}
                </div>
                <div className='flex gap-1 place-content-evenly'>
                  <Link to={`/?pasteid=${paste?._id}`}>Edit</Link>
                  <Link to={`/pastes/${paste?._id}`}>View</Link>
                  <button onClick={() => handelDelete(paste?._id)}>Delete</button>
                  <button onClick={() => handelCopy(paste?.content)}>Copy</button>
                  <button onClick={() => handelShare(paste?._id)}>Share</button>
                </div>
                <div>
                  {paste.createdAt}
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
