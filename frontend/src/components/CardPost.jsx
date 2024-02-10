import { useEffect, useState } from "react"
import shareSVG from '../assets/share.svg'
import icon from '../assets/pageIcon.svg'

export default function CardPost({note, author, image, color}) {

    function share(e) {
        const title = "Posta Aí!";
        const text = e.target.innerText;
        const url = 'poste-ai-front.vercel.app/';
        
        if(!e.target.src) {
            createBlob(e.target.src)
        } else {
            sharing(title, text, url, icon)
        }
        async function createBlob(base64) {
            let res =    await fetch(base64)
            const myBlob = await res.blob()

            sharing(title, text, url, myBlob)   
        }
    }

    function sharing(title, text, url, myBlob) {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: text,
                url: url,
                file: myBlob
            })
            .then(() => console.log("Compartilhado com sucesso!"))
            .catch((error) => console.log('Erro:', error));
        } else {
            console.log('API não suportada.');
            navigator.clipboard.writeText("Acesse o Posta Aí! ->"+url);
        }
    }
    
    function handleClick(e) {
        if(wannaShare) {
            share(e);
            isWannaShare(false);
        } else {
            isWannaShare(true);
        }
    }

    const [wannaShare, isWannaShare] = useState(false);

    function handleHover() {
        isWannaShare(true)
    }

    return (
    <div onClick={handleClick} onMouseEnter={handleHover} className='cardo  h-[200px] w-[200px] cursor-pointer'>
        <div className="share absolute w-[200px] flex-col flex items-center text-center pointer-events-none ">
            <img className="w-10" src={shareSVG} alt="" />
        </div>

        <div className={' h-[200px] w-[200px] text-[#2D2A2A] gap-2 flex flex-col break-words shadow-2xl px-2 pt-2 '} style={{backgroundColor: color}}>
            {image==null?
                <><h2 className=" h-[80%] text-[30px] font-light text-wrap max-w-[100%]">{note}</h2>
                <h6 className="h-[0%] text-[25px] underline text-[#130c16] pr-2 text-right font-medium ">{author}</h6></>
            : 
                <img src={image} alt=""/>
            }
        </div>
    </div>
    )
}