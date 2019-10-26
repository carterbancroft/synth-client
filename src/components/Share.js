import React from 'react'

import './Share.scss'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'


class Share extends React.Component {
  state = {
    show: false,
    shortid: '',
  }

  toggle = () => {
    this.setState({ show: !this.state.show })
  }

  shareRecording = () => {
    this.refs.shareButton.setAttribute('disabled', 'disabled')

    const url = 'http://localhost:4000/graphql'

    const body = JSON.stringify({
      query: `mutation($recording: [InstrumentRecordingInput!]!) {
        createComposition(
          compositionInput: {
            recording: $recording
          }
        ){
          shortid
        }
      }`,
      variables: {
        recording: this.props.recording
      }
    })

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    }

    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        if (res.errors) return console.dir(res.errors)

        const shortid = res.data.createComposition.shortid

        this.refs.shareButton.removeAttribute('disabled')
        this.setState({ shortid, show: !this.state.show })
      })
  }

  render() {
    return (
      <div>
        <button
          ref="shareButton"
          key="shareRecording"
          onClick={ this.shareRecording }
          className="shareRecordingButton">Save</button>

        <Modal
          isOpen={ this.state.show }
          toggle={ this.toggle }
          centered={ true }>

          <ModalHeader toggle={ this.toggle }>Share</ModalHeader>

          <ModalBody className="test">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="shareInput"
                defaultValue={ `${window.location.origin}?${this.state.shortid}` }/>
                <div className="input-group-append">
                  <span className="input-group-text"><FontAwesomeIcon icon={ faClipboard } /></span>
                </div>
              </div>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={ this.toggle }>Close</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default Share
