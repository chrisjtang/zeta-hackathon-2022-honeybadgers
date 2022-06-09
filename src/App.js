import './App.css';
import { useState } from 'react';
import './styles.scss'

const stickers = [
  {
    name: 'happy',
    src: 'https://assets1.lottiefiles.com/packages/lf20_xv1gn5by.json',
    adMessage: `<Any brand #1> Sale!`,
  },
  {
    name: 'cool',
    src: 'https://assets10.lottiefiles.com/packages/lf20_x9puwsf6.json',
    adMessage: `<Any brand #2> Sale!`
  },
  {
    name: 'sad',
    src: 'https://assets8.lottiefiles.com/private_files/lf30_aprp5fnm.json',
    adMessage: `<Any brand #3> Sale!`
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
                <div className="tooltip">{c.adMessage}</div>
              }
            </li>
          ))}
        </ul>}
      </div>
    </div>
  );
}

export default App;
