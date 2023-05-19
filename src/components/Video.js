import classes from '../styles/video.module.css';
//import image from "../assets/images/3.jpg";
export default function Video({ title, id, noq }){
    return(
        <>
            <div class={classes.video}>
              <img src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={title} />
              <p>{title}</p>
              <div class={classes.qmeta}>
                <p>{noq} Questions</p>
                <p>Score : {noq * 5}</p>
              </div>
            </div>
        </>
    );
}