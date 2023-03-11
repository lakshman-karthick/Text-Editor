import React,{useEffect, useState} from 'react'
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import './Toolbar.css'
import axios from 'axios';
function Toolbar({messagesU}) {
  const [temp,setTemp] = useState("");
  const [isBold,setIsBold] = useState(false);
  const [isItalic,setIsItalic] = useState(false);
  const [color,setColor] = useState("");


  const postMessage = async(e)=>{
    e.preventDefault();
    
    console.log(temp);
    await axios.post('http://localhost:9000/texts',{
      Message: temp
    }).then((res)=>{
      console.log(res.data);
    });
    setTemp("");
  }

  const changeToTool =(style)=> {
    const selection = window.getSelection();
    if (selection.type === "Range") {
      const range = selection.getRangeAt(0);
      const boldNode = document.createElement("span");
      style === 'b' ? (boldNode.style.fontWeight = isBold ? 'normal' : 'bold'):(boldNode.style.fontStyle = isItalic ? 'normal' : 'italic');
      boldNode.innerHTML = range.toString();
      range.deleteContents();
      range.insertNode(boldNode);
      selection.removeAllRanges();
      selection.addRange(range);
      console.log(range);
      style === 'b'?setIsBold(!isBold):setIsItalic(!isItalic);
    }
  }

  const changeToColour =(colour)=> {
    const selection = window.getSelection();
    if (selection.type === "Range") {
      const range = selection.getRangeAt(0);
      const boldNode = document.createElement("span");
      boldNode.style.cssText = `color : ${colour}`;
      boldNode.innerHTML = range.toString();
      range.deleteContents();
      range.insertNode(boldNode);
      selection.removeAllRanges();
      selection.addRange(range);
      console.log(range);
    }
  }

  const changeAlign =(position)=> {
    const selection = window.getSelection();
    if (selection.type === "Range") {
      const range = selection.getRangeAt(0);
      const boldNode = document.createElement("div");
      console.log('Rest');
      boldNode.style.cssText = `text-align: ${position}`;
      boldNode.innerHTML = range.toString();
      range.deleteContents();
      range.insertNode(boldNode);
      selection.removeAllRanges();
      selection.addRange(range);
      console.log(range);
    }
  }

  function handleKeyPress() {
    const selection = window.getSelection()
    const textt = selection.toString();
    setTemp(textt)
  }



  return (
    <div className='tools'>
    <div className='toolsAlign'>
      <div className='tools1'>
        <div onClick={()=>changeToTool("b")}>
        <FormatBoldIcon sx={{ fontSize: "35px" }} className='order'/>
        </div>
        <div onClick={()=>changeToTool("i")}>
        <FormatItalicIcon sx={{ fontSize: "35px" }} className='order'/>
        </div>
        <div onClick={()=>changeToColour(color)}>
        <FormatColorTextIcon sx={{ fontSize: "35px" }} className='order'/>
        </div>
        <input className='lenIn' value={color} placeholder='  colour' onChange={(e)=>setColor(e.target.value)}></input>

       
      </div>
      <div className='tools2'>
        <FormatListBulletedIcon sx={{ fontSize: "35px" }} className='order'/>
        <FormatListNumberedIcon sx={{ fontSize: "35px" }} className='order'/>
      </div>
      <div className='tools3'>
      <div onClick={()=>changeAlign("left")}>
      <FormatAlignLeftIcon sx={{ fontSize: "35px" }} className='order'/>
      </div>
      <div onClick={()=>changeAlign("center")}>
      <FormatAlignJustifyIcon sx={{ fontSize: "35px" }} className='order'/> 
      </div>
      <div onClick={()=>changeAlign("right")}>
      <FormatAlignRightIcon sx={{ fontSize: "35px" }} className='order'/>
      </div>
       
      </div>
      
    </div>
    <div
        id="divPlace"
        content={temp}
        contentEditable={true}
        className="textEditor"
        suppressContentEditableWarning={true}
        onSelect={handleKeyPress}
      >
        {messagesU?.map((p)=>(
          <div>
            {p.Message}
          </div>
        ))}
      </div>
      <div className='posi'>
      <button type="button" onClick={postMessage} class="btn btn-success">Save</button>
      </div>
    </div>
  )
}



export default Toolbar
