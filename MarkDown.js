function markupText(text){
	return {__html: marked(text)}
}
class MarkDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*'
    };

    	this.handleChange = this.handleChange.bind(this);
		this.markedOutput = this.markedOutput.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
 	}

	markedOutput(event){
		this.setState({value: event.target.value})
	}

  render() {
	  const value = this.state.value
	  const markedupText = markupText(value)
	  
    return (
		<div className = "row">
			<div className = "col-md-6">
				<textarea rows = "22" value={this.state.value} onChange={this.handleChange} />
			</div>
			<div className = "col-md-6">
				<div dangerouslySetInnerHTML={markedupText} />
			</div>
		</div>	
    );
  }
}
export default MarkDown
