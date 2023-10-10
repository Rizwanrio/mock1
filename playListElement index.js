import { AiOutlineDelete } from "react-icons/ai";
import './index.css'


const PlayList = (props) =>{
    const {element, delEl} = props

    const onDel = {
        delEl(element.id)
    }

    return(
        <li>
<img src={element.imageUrl} alt='track'/>
<div>
    <p>{element.duration}</p>
    <button type='button' onClick={onDel}>
<AiOutlineDelete/>
    </button>
</div>
        </li>
    )
}

export default PlayList
