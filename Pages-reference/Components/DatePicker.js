/*jshint esversion: 6 */
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Tooltip } from "reactstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
    faCaretLeft as faLeftHour,
    faCaretRight as faRightHour,
    faAngleLeft as faLeftDay,
    faAngleRight as faRightDay
} from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { Trans } from "@lingui/macro";
import "./css/DatePicker.css";

class DatePicker extends Component {
    constructor(props) {
        super(props);
        let backward = {
                min: "hour",
                max: "day"
            },
            forward = {
                min: "hour",
                max: "day"
            };

        if (props.shifts !== undefined) {
            forward.min = props.shifts.min;
            forward.max = props.shifts.max;
            backward.min = props.shifts.min;
            backward.max = props.shifts.max;
        }
        this.shifts = {
            backward: {
                hour: {
                    text: <Trans id="tooltipBackHour">One hour backward</Trans>,
                    shift: -60 * 60 * 1000
                },
                day: {
                    text: <Trans id="tooltipBackDay">One day backward</Trans>,
                    shift: -24 * 60 * 60 * 1000
                },
                month: {
                    text: <Trans id="tooltipBackMonth">30 days backward</Trans>,
                    shift: -30 * 24 * 60 * 60 * 1000
                },
                year: {
                    text: <Trans id="tooltipBackYear">One year backward</Trans>,
                    shift: -365 * 24 * 60 * 60 * 1000
                },
                year5: {
                    text: (
                        <Trans id="tooltipBackYear5">Five years backward</Trans>
                    ),
                    shift: -5 * 365 * 24 * 60 * 60 * 1000
                }
            },
            forward: {
                hour: {
                    text: (
                        <Trans id="tooltipForwardHour">One hour forward</Trans>
                    ),
                    shift: 60 * 60 * 1000
                },
                day: {
                    text: <Trans id="tooltipForwardDay">One day forward</Trans>,
                    shift: 24 * 60 * 60 * 1000
                },
                month: {
                    text: (
                        <Trans id="tooltipForwardMonth">30 days forward</Trans>
                    ),
                    shift: 30 * 24 * 60 * 60 * 1000
                },
                year: {
                    text: (
                        <Trans id="tooltipForwardYear">One year forward</Trans>
                    ),
                    shift: 365 * 24 * 60 * 60 * 1000
                },
                year5: {
                    text: (
                        <Trans id="tooltipForwardYear5">
                            Five years forward
                        </Trans>
                    ),
                    shift: 5 * 365 * 24 * 60 * 60 * 1000
                }
            }
        };
        this.state = {
            backward: backward,
            forward: forward,
            tooltipCalendarOpen: false,
            tooltipBackHourOpen: false,
            tooltipForwardHourOpen: false,
            tooltipBackDayOpen: false,
            tooltipForwardDayOpen: false,
            datetime:
                typeof props.datetime === "string"
                    ? parseFloat(props.datetime)
                    : this.props.datetime
        };
        // console.log(props);
        // console.log(this.state);
    }
    componentWillReceiveProps(props) {
        this.setState({
            datetime:
                typeof props.datetime === "string"
                    ? parseFloat(props.datetime)
                    : this.props.datetime
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
        // console.log(this.shifts.backward[this.state.backward.max].shift);
        // console.log(this.shifts.backward[this.state.backward.min].text);
        return (
            <div className="DatePicker">
                <span
                    className="DatePickerSpan"
                    onClick={() =>
                        this.onDateTimeChange(
                            moment(
                                this.state.datetime +
                                    this.shifts.backward[
                                        this.state.backward.max
                                    ].shift
                            )
                        )
                    }
                    id="oneDayBack"
                >
                    <FontAwesomeIcon icon={faLeftDay} size="2x" />
                </span>
                <span
                    className="DatePickerSpan"
                    onClick={() =>
                        this.onDateTimeChange(
                            moment(
                                this.state.datetime +
                                    this.shifts.backward[
                                        this.state.backward.min
                                    ].shift
                            )
                        )
                    }
                    id="oneHourBack"
                >
                    <FontAwesomeIcon icon={faLeftHour} size="2x" />
                </span>
                <DateRangePicker
                    startDate={moment.unix(this.state.datetime / 1000)}
                    alwaysShowCalendars={true}
                    showDropdowns={true}
                    singleDatePicker={true}
                    timePicker={true}
                    timePicker24Hour={true}
                    timePickerIncrement={60}
                    onApply={(event, picker) =>
                        this.onDateTimeChange(picker.startDate)
                    }
                >
                    <InputGroup id="ParamodCalendar">
                        <InputGroupAddon addonType="prepend">
                            <span className="DatePickerCalendar">
                                <FontAwesomeIcon
                                    icon={faCalendarAlt}
                                    size="2x"
                                />
                            </span>
                        </InputGroupAddon>
                        <Input
                            placeholder={moment
                                .unix(this.state.datetime / 1000)
                                .format("YYYY-MM-DD HH:00")}
                            className="DatePickerInput"
                        />
                    </InputGroup>
                </DateRangePicker>
                <span
                    className="DatePickerSpan"
                    onClick={() =>
                        this.onDateTimeChange(
                            moment(
                                this.state.datetime +
                                    this.shifts.forward[this.state.forward.min]
                                        .shift
                            )
                        )
                    }
                    id="oneHourForward"
                >
                    <FontAwesomeIcon icon={faRightHour} size="2x" />
                </span>
                <span
                    className="DatePickerSpan"
                    onClick={() =>
                        this.onDateTimeChange(
                            moment(
                                this.state.datetime +
                                    this.shifts.forward[this.state.forward.max]
                                        .shift
                            )
                        )
                    }
                    id="oneDayForward"
                >
                    <FontAwesomeIcon icon={faRightDay} size="2x" />
                </span>
                <Tooltip
                    placement="bottom"
                    isOpen={this.state.tooltipBackHourOpen}
                    target="oneHourBack"
                    toggle={() => this.toggleTooltip("tooltipBackHourOpen")}
                >
                    {this.shifts.backward[this.state.backward.min].text}
                    {/*<Trans id="tooltipBackHour">One hour backward</Trans>*/}
                </Tooltip>
                <Tooltip
                    placement="bottom"
                    isOpen={this.state.tooltipForwardHourOpen}
                    target="oneHourForward"
                    toggle={() => this.toggleTooltip("tooltipForwardHourOpen")}
                >
                    {this.shifts.forward[this.state.forward.min].text}
                    {/*<Trans id="tooltipBackHour">One hour forward</Trans>*/}
                </Tooltip>
                <Tooltip
                    placement="bottom"
                    isOpen={this.state.tooltipForwardDayOpen}
                    target="oneDayForward"
                    toggle={() => this.toggleTooltip("tooltipForwardDayOpen")}
                >
                    {this.shifts.forward[this.state.forward.max].text}
                    {/*<Trans id="tooltipForwardDay">One day forward</Trans>*/}
                </Tooltip>
                <Tooltip
                    placement="bottom"
                    isOpen={this.state.tooltipBackDayOpen}
                    target="oneDayBack"
                    toggle={() => this.toggleTooltip("tooltipBackDayOpen")}
                >
                    {this.shifts.backward[this.state.backward.max].text}
                    {/*<Trans id="tooltipBackDay">One day backward</Trans>*/}
                </Tooltip>
                <Tooltip
                    placement="bottom"
                    isOpen={this.state.tooltipCalendarOpen}
                    target="ParamodCalendar"
                    toggle={() => this.toggleTooltip("tooltipCalendarOpen")}
                >
                    <Trans id="tooltipCalenda">
                        Click to select date and hour
                    </Trans>
                </Tooltip>
            </div>
        );
    }
}

export default DatePicker;
