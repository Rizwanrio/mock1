const BtnEl = props => {
  const {element, onClickBtn} = props
  const btnClk = () => {
    onClickBtn(element.buttonText)
  }

  return (
    <div>
      <button type="button" onClick={btnClk}>
        {element.buttonText}
      </button>
    </div>
  )
}

export default BtnEl
