import { Badge } from '@material-ui/core';
import {img_300, unavailable} from '../../Config/config'
import './SingleContent.css'
const SingleContent = ({
    id,poster,title,date,media_type,vote_average
})=>{
    return (
        <div className='media'>
            {/* Rating of the movie */}
            <Badge badgeContent={vote_average.toFixed(1)} color={vote_average>6 ? 'primary':'secondary'}/>
            <img className="poster" src={poster?`${img_300}/${poster}`:unavailable} alt={title}/>
            <p className='title'>{title}</p>
            <span className='subTitle'>
                {media_type === 'tv' ? 'TV Series':"Movie"}
                <span className='subTitle'>{date}</span>
            </span>
        </div>
    );
};
export default SingleContent