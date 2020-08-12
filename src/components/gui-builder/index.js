import React, { Component } from 'react'
import { Button, Col, Row, Container, Card } from 'react-bootstrap'
import { Rnd } from 'react-rnd';
import Resizeable from '../re-sizeable'
import './style.css';

class GuiBuilder extends Component {
    constructor(props) {
        super(props)

        const val = localStorage.getItem('storedDesign')
        this.state = {
            width: 200,
            height: 200,
            x: 10,
            y: 10,
            components: val ? JSON.parse(val) : []
        };
    }

    resizestart = (e, dir, ref, delta, position) => {
        this.setState({
            width: ref.style.width,
            height: ref.style.height
        })
    }

    allowDrop = (ev) => {
        ev.preventDefault();
    }

    drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    drop = (ev) => {
        ev.preventDefault();
        const { components } = this.state

        var data = ev.dataTransfer.getData("text");
        let updatedState = { id: Math.random(), name: data, width: 200, height: 50, x: 10, y: 10 }
        this.setState({
            components: [...components, updatedState]
        })
    }

    updateElement = (item) => {
        const { components } = this.state

        const updatedComponent = components.map(data => {
            if (data.id === item.id) {
                return item
            } else {
                return data
            }
        })
        this.setState({ components: updatedComponent })
    }

    render() {
        const { components } = this.state

        return (
            <>
            <div className="sidebar">
                <header className="sidebarHeader">Controls</header>
                <div style={{ padding: '5px' }}>
                    <Container>
                        <Row>
                            <Col md={5} sm={5} className="compContainer" id="button" name="button" draggable="true" onDragStart={this.drag}>
                                <Button style={{ marginTop: '11px' }}>Button</Button>
                                <span>Button</span>
                            </Col>
                            <Col md={5} sm={5} className="compContainer" id="input" name="input" draggable="true" onDragStart={this.drag}>
                                {/* <input id="input" style={{ width: '60px' }} /> */}
                                <div className="inputImg" />
                                <span>Input</span>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col className="compContainer" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                                <div id="textarea" name="textarea" draggable="true" onDragStart={this.drag} />
                                <span>Input Area</span>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <footer className="footerPanel">
                    <Button onClick={() => {
                        localStorage.setItem('storedDesign', JSON.stringify(components))
                    }}>Save</Button>
                    <Button onClick={() => {
                        localStorage.removeItem('storedDesign')
                        this.setState({ components: [] })
                    }}
                        style={{ marginLeft: '12px' }}>Clear</Button>
                </footer>
            </div>
            <div id="_builder_space" onDrop={this.drop} onDragOver={this.allowDrop}>
                {components.length ? components.map(item => {
                    return <Resizeable type={item.name} item={item} updateElement={this.updateElement} />
                }) : <div className="noContent">Drag and Drop components here</div>}
            </div>
            </>
        )
    }
}

export default GuiBuilder