/*jshint esversion: 6 */
import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Tooltip } from 'reactstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import {
    faCaretLeft as faLeftHour,
    faCaretRight as faRightHour,
    faAngleLeft as faLeftDay,
    faAngleRight as faRightDay
} from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { Trans } from '@lingui/macro';

class DatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tooltipCalendarOpen: false,
            tooltipBackHourOpen: false,
            tooltipForwardHourOpen: false,
            tooltipBackDayOpen: false,
            tooltipForwardDayOpen: false,
            datetime: (typeof props.datetime === "string") ? parseFloat(props.datetime) : this.props.datetime
        };

    }
    componentWillReceiveProps(props) {
        this.setState({
            datetime: (typeof props.datetime === "string") ? parseFloat(props.datetime) : this.props.datetime
        });

    }

    toggleTooltip(tip) {
        var state = {};

        state[tip] = !this.state[tip];
        this.setState(state);
    }

    onDateTimeChange(datetime) {
        this.props.onDateChange({
            startDate: datetime
        });
    }

    render() {
        return (
            <div className="DatePicker"> 
                <span 
                    style = {{padding:"5px"}}
                    onClick = { () => this.onDateTimeChange( moment(this.state.datetime - 24 * 60 * 60 * 1000) ) }
                    id = "oneDayBack"
                >
                    <FontAwesomeIcon 
                        icon = {faLeftDay} 
                        size = "2x" 
                    /> 
                </span>
                <span 
                    style = {{padding:"5px"}}
                    onClick = { () => this.onDateTimeChange( moment(this.state.datetime - 60 * 60 * 1000) ) }
                    id = "oneHourBack"
                >
                    <FontAwesomeIcon 
                        icon = {faLeftHour} 
                        size = "2x" 
                    /> 
                </span>
                <DateRangePicker 
                    startDate = {moment.unix(this.state.datetime / 1000)}
                    alwaysShowCalendars = {true}
                    showDropdowns = {true}
                    singleDatePicker = {true}
                    timePicker = {true}
                    timePicker24Hour = {true}
                    timePickerIncrement = {60}
                    onApply = { (event, picker) => this.onDateTimeChange( picker.startDate ) }
                >
                    <InputGroup id = "ParamodCalendar">
                        <InputGroupAddon addonType="prepend">
                            <span style = {{paddingRight:"5px", paddingTop: "3px", paddingLeft: "5px"}}>
                                <FontAwesomeIcon 
                                    icon = {faCalendarAlt} 
                                    size = "2x" 
                                /> 
                            </span>
                        </InputGroupAddon>
                        <Input placeholder={moment.unix(this.state.datetime / 1000).format("YYYY-MM-DD HH:00")} />
                    </InputGroup>
                </DateRangePicker>
                <span 
                    style = {{padding:"5px"}}
                    onClick = { () => this.onDateTimeChange( moment(this.state.datetime + 60 * 60 * 1000) ) }
                    id = "oneHourForward"
                >
                    <FontAwesomeIcon 
                        icon = {faRightHour} 
                        size = "2x" 
                    /> 
                </span>
                <span 
                    style = {{padding:"5px"}}
                    onClick = { () => this.onDateTimeChange( moment(this.state.datetime + 24 * 60 * 60 * 1000) ) }
                    id = "oneDayForward"
                >
                    <FontAwesomeIcon 
                        icon = {faRightDay} 
                        size = "2x" 
                    /> 
                </span>
                <Tooltip 
                    placement = "bottom"
                    isOpen = {this.state.tooltipBackHourOpen}
                    target = "oneHourBack"
                    toggle = { () => this.toggleTooltip("tooltipBackHourOpen") }
                >
                    <Trans id="tooltipForwardkHour">One hour backward</Trans>
                </Tooltip>
                <Tooltip 
                    placement = "bottom"
                    isOpen = {this.state.tooltipForwardHourOpen}
                    target = "oneHourForward"
                    toggle = { () => this.toggleTooltip("tooltipForwardHourOpen") }
                >
                    <Trans id="tooltipBackHour">One hour forward</Trans>
                </Tooltip>
                <Tooltip 
                    placement = "bottom"
                    isOpen = {this.state.tooltipForwardDayOpen}
                    target = "oneDayForward"
                    toggle = { () => this.toggleTooltip("tooltipForwardDayOpen") }
                >
                    <Trans id="tooltipForwardDay">One day forward</Trans>
                </Tooltip>
                <Tooltip 
                    placement = "bottom"
                    isOpen = {this.state.tooltipBackDayOpen}
                    target = "oneDayBack"
                    toggle = { () => this.toggleTooltip("tooltipBackDayOpen") }
                >
                    <Trans id="tooltipBackDay">One day backward</Trans>
                </Tooltip>
                <Tooltip 
                    placement = "bottom"
                    isOpen = {this.state.tooltipCalendarOpen}
                    target = "ParamodCalendar"
                    toggle = { () => this.toggleTooltip("tooltipCalendarOpen") }
                >
                    <Trans id="tooltipCalenda">Click to select date and hour</Trans>
                </Tooltip>
            </div>
        );
    }
}

export default DatePicker;