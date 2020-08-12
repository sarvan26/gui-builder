import React, { Component } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { Rnd } from 'react-rnd';
import extend from 'extend';


const style = {
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
};

class Resizeable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            width: props.item.width,
            height: props.item.height,
            x: props.item.x,
            y: props.item.y,
            type: props.type
        };
    }

    resizestart = (e, dir, ref, delta, position) => {
        const { item, updateElement } = this.props
        let newData = extend(true, {}, item)

        newData.width = ref.style.width
        newData.height = ref.style.height
        updateElement(newData)

        this.setState({
            width: ref.style.width,
            height: ref.style.height
        })
    }

    getComponent = (style) => {
        const { type } = this.state
        let renderGuiComponent;
        if (type === 'button') return <Button style={style}>Drag me</Button>
        else if (type === 'input') return <input style={style} />
        else return <textarea style={style} />
    }

    onDragStop = (e, d) => {
        const { item, updateElement } = this.props
        let newData = extend(true, {}, item)

        newData.x = d.x
        newData.y = d.y
        updateElement(newData)
        this.setState({ x: d.x, y: d.y });
    }

    render() {
        const { x, y, width, height } = this.state

        const componentStyle = { width: this.state.width, height: this.state.height }
        return (
            <React.Fragment>
                <Rnd
                    bounds="parent"
                    style={style}
                    size={{ width: this.state.width, height: this.state.height }}
                    position={{ x: this.state.x, y: this.state.y }}
                    onDragStop={this.onDragStop}
                    onResize={this.resizestart}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        this.setState({
                            width: ref.style.width,
                            height: ref.style.height,
                            ...position
                        });
                    }}
                >
                    {this.getComponent(componentStyle)}
                </Rnd>
            </React.Fragment>
        )
    }

}

export default Resizeable