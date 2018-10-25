/*jshint esversion: 6 */
import React, {Component} from 'react';
import { Card, CardTitle, CardText, CardBody, CardHeader, ListGroup, ListGroupItem } from 'reactstrap';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';

class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lang: (props.lang === 'ru') ? 'ru' : 'en'
        };
    }

    render() {
        return (
            <Card body>
                <CardHeader>
                    <CardTitle><Trans id='Earth'>Earth</Trans></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardText>
                        <ListGroup flush>
                            <ListGroupItem><Link to={'/'+this.state.lang+'/earthdesc'}><Trans id='menuEarthDescription'>Model description</Trans></Link></ListGroupItem>
                            <ListGroupItem><Link to={'/'+this.state.lang+'/earth2d'}><Trans id='menuEarth2D'>2D Magnetic Field Lines</Trans></Link></ListGroupItem>
                            <ListGroupItem><Link to={'/'+this.state.lang+'/earth3d'}><Trans id='menuEarth3D'>3D Magnetic Field Lines</Trans></Link></ListGroupItem>
                        </ListGroup>
                    </CardText>
                </CardBody>
            </Card>
        );
    }
}

export default SideMenu;
