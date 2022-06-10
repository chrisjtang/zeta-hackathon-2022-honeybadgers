import './App.css';
import { useState } from 'react';
import './styles.scss'

const stickers = [
  {
    name: 'happy',
    src: 'https://assets5.lottiefiles.com/packages/lf20_kyusfkfp.json',
    adLink: 'https://marketplacestrategy.com/wp-content/uploads/2019/03/Amazon-Fresh-Ad.jpg',
  },
  {
    name: 'cool',
    src: 'https://assets7.lottiefiles.com/private_files/lf30_9cjtxpa3.json',
    adLink: `https://www.macv.in/wp-content/uploads/2021/12/MacV-Website-Home-Banner-5.jpg`
  },
  {
    name: 'sad',
    src: 'https://assets8.lottiefiles.com/private_files/lf30_aprp5fnm.json',
    adLink: `https://images-cdn.ispot.tv/ad/wgw1/default-large.jpg`,
  },
]

function App() {
  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [stickersToRender, setStickersToRender] = useState(stickers)
  const [comments, setComments] = useState([])
  const [tooltip, setTooltip] = useState(null)

  const stickerNames = stickers.map((s) => s.name);

  const onChangeHandler = (e) => {
    setValue(e.target.value)
    if (stickerNames.includes(e.target.value)) {
      setStickersToRender(prev => prev.filter((s) => s.name === e.target.value))
      setIsOpen(true)
    } else {
      setStickersToRender(stickers)
      setIsOpen(false)
    }
  }

  const pickStickerHandler = (e) => {
    setComments(prev => [...prev, stickers.find((s) => s.name === e.target.id)])
    setStickersToRender(stickers)
    setIsOpen(false)
    setValue('')
  }

  return (
    <div className="App">
      <div className="container">
        <div className="formWrapper">
          <img className="avatar" src="noavatar92.png"/>
          <div className="textWrapper">
            <input className="input" value={value} onChange={onChangeHandler} placeholder="Join the discussion..."/>
            <div className="editArea">
              <button
                className="button"
                onClick={() => setIsOpen(prev => !prev)}>
                <img src="sticker-picker.svg" />
              </button>
            </div>
            {isOpen && stickersToRender &&
            <div className="stickersContainer">
              {stickersToRender.map((s) => (
                <div key={s.name} className="sticker">
                  <lottie-player
                    onClick={pickStickerHandler}
                    id={s.name}
                    src={s.src}
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                  >
                  </lottie-player>
                </div>
              ))}
            </div>
            }
          </div>
        </div>
        {comments && <ul className="comments">
          {comments.map((c, i) => (
            <li className="comment">
              <img className="avatar" src="noavatar92.png"/>
              <lottie-player
                onMouseEnter={() => setTooltip(i + 1)}
                onMouseLeave={() => setTooltip(null)}
                src={c.src}
                background="transparent"
                speed="1"
                style={{width: "300px", height: "300px;"}}
                loop
                autoplay
              >
              </lottie-player>
              {tooltip && tooltip === i + 1 &&
                <div className="tooltip">
                    <img src={c.adLink} alt={'an ad for your sticker'} width={350} height={175}>
                    </img>
                    </div>
              }
            </li>
          ))}
        </ul>}
      </div>
    </div>
  );
}

export default App;
