import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

class LoadingModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: props.show
		};

		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	componentWillReceiveProps(props) {
		this.setState({
			modal: props.show
		});
	}

	render() {
		return (
			<div>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}
				>
					<ModalBody>Calculating and loading</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.toggle}>
							Close
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default LoadingModal;
