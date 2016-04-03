var url = "/api/item";

var itemDbManipulator = {
    changeDone: function(id, isDone) {
        var item = { isDone: !isDone };
        $.ajax({
            url: url + '/' + id,
            dataType: 'json',
            type: 'PUT',
            data: item,
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }
        });
    },
    delete: function(id) {
        $.ajax({
            url: url + '/' + id,
            type: 'DELETE',
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }
        });
    }
};

var ItemsContainer = React.createClass({
    loadItemsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({ data: data });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleItemSubmit: function(item) {
        item.isDone = false;
        item.hasAttachment = false;
        var items = this.state.data;
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: item,
            success: function(data) {
                this.setState({ data: data });
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({ data: items });
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return { data: [] };
    },
    componentDidMount: function() {
        this.loadItemsFromServer();
        setInterval(this.loadItemsFromServer, this.props.pollInterval);
    },
    render: function() {
        var itemNodes = this.state.data.map(function(item) {
            return (
                <Item key={item._id} id={item._id} done={item.isDone}>            
                    {item.content}
                </Item>
            );
        });
        return (
            <div className="items-container">
                <ItemForm onItemSubmit={this.handleItemSubmit} />
                <div className="ui cards">
                    {itemNodes}
                </div>  
            </div>
        );
    }
});

var Item = React.createClass({
    changeDone: function() {
        itemDbManipulator.changeDone(this.props.id, this.props.done);
    },
    deleteItem: function() {
        itemDbManipulator.delete(this.props.id);
    },
    render: function() {
        var styleClassCard = this.props.done ?  'ui card green' : 'ui card';
        var styleClassButton = this.props.done ?  'circular ui icon button green' : 'circular ui icon button';
        return (
            <div className={styleClassCard}>
                <div className="content">
                    <div className="description">
                        {this.props.children}
                    </div>
                </div>
                <div className="extra content">
                    <span className="left floated">
                        <button className={styleClassButton} onClick={this.changeDone}>
                            <i className="checkmark icon"></i>
                        </button>
                    </span>
                    {this.props.key}
                    <span className="right floated">
                        <button className="circular ui icon button" onClick={this.deleteItem}>
                            <i className="trash outline icon"></i>
                        </button>
                    </span>
                </div>
            </div>
        );
    }
});

var ItemForm = React.createClass({
    getInitialState: function() {
        return { content: '' };
    },
    handleContentChange: function(e) {
        this.setState({ content: e.target.value });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var content = this.state.content.trim();
        if (!content) {
            return;
        }
        this.props.onItemSubmit({ content: content });
        this.setState({ content: ''});
    },
    render: function() {
        return (
            <div className="ui card">
                <div className="content">
                    <div className="meta">New item</div>
                    <div className="description">
                    <form className="item-form" onSubmit={this.handleSubmit}>
                        <div className="ui input">
                        <input
                            type="text"
                            value={this.state.content}
                            onChange={this.handleContentChange}
                            />
                        </div>
                        <input type="submit" className="ui button" value="Add" />
                    </form>
                    </div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <ItemsContainer url={url} pollInterval={2000} />,
    document.getElementById('content')
);