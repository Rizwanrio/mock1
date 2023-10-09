import {Component} from 'react'
import BtnEl from './BtnEl'
import './App.css'

const languageGreetingsList = [
  {
    id: 'bfdf40eb-eec9-4a66-a493-752fe689f0d0',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/multilingual_greeting/english-greetings-img.png',
    buttonText: 'English',
    imageAltText: 'english',
  },
  {
    id: '0ceda891-2a0c-49e2-8c62-68e78180bac6',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/multilingual_greeting/tamil-greetings-img.png',
    buttonText: 'Tamil',
    imageAltText: 'tamil',
  },
  {
    id: '89537778-7a46-4c58-988c-0adc931d087c',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/multilingual_greeting/telugu-greetings-img.png',
    buttonText: 'Telugu',
    imageAltText: 'telugu',
  },
]

// Replace your code here
class App extends Component {
  state = {
    selected: 'English',
  }

  onClickBtn = txt => {
    this.setState({selected: txt})
  }

  render() {
    const {selected} = this.state
    const selecList = languageGreetingsList.filter(
      el => el.buttonText === selected,
    )
    const srcVsl = selecList[0].imageUrl
    const altVal = selecList[0].imageAltText
    return (
      <div>
        <h1>Multilingual Greetings</h1>
        {languageGreetingsList.map(el => (
          <BtnEl key={el.id} element={el} onClickBtn={this.onClickBtn} />
        ))}
        <img src={srcVsl} alt={altVal} />
      </div>
    )
  }
}

export default App
