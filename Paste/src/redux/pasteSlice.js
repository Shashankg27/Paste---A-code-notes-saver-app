import { createSlice } from '@reduxjs/toolkit'
import { stringify } from 'postcss';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState: {
    pastes: localStorage.getItem("pastes")?JSON.parse(localStorage.getItem("pastes")) : []
  },
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      const title = paste.title;
      const content = paste.content;
      const temp = state.pastes.filter((p) => p.title === title && p.content === content);
      // console.log(temp.length);
      if(temp.length > 0){
        toast("Paste already exists!");
      }
      else{
        state.pastes.push(paste);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste created successfully");
      }
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const idx = state.pastes.findIndex((item) => item._id === paste._id);
      
      if(idx >= 0){
        state.pastes[idx] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        
        toast.success("Paste Updated");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      
      const idx = state.pastes.findIndex((item) => item._id === pasteId);

      if(idx >= 0){
        state.pastes.splice(idx, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste deleted");
      }
    }
  }
})

export const { updateToPastes, addToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer