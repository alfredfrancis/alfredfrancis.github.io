/**
 * Created by alfred on 26/12/16.
 */


class Chat extends React.Component {
    constructor() {
        super();
        this.state = {parameters:[]}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  loadDataFromServer() {
    $.ajax({
      url: '/stories/'+this.props.storyId,
      dataType: 'json',
      success: (data) => {
        this.setState(data);
      }
    });
  }

  componentWillMount() {
  }

    handleChange(event) {
        var nextState = {}
        nextState[event.target.id] = event.target.value
        this.setState(nextState)
    }

    handleSubmit(event) {
        event.preventDefault();
        $.ajax({
            url: '/stories/'+this.props.storyId,
            type: 'PUT',
            data: JSON.stringify(this.state),
            contentType: 'application/json; charset=utf-8',
            success: function() {
                  alert("Story updated sucessfully")
            }
        });
    }

    onUpdate(index,data){
        var nextState = this.state
        nextState.parameters[index] = data
        this.setState(nextState)
    }
    render() {
        return (
                    <div className="chat-window">
                      <div className="inner" id="inner">
                        <div className="content" id="content"></div>
                      </div>
                      <div className="bottom" id="bottom">
                        <input id="user-input" type="text" className="form-control input-sm"
                           placeholder="Ask something.."/>
                      </div>
                    </div>
        );
    }
}
;

ReactDOM.render(
    <Chat/>,
    document.getElementById('app')
);