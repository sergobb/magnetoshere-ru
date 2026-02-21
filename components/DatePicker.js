"use client";

import React, { useState, useEffect } from "react";
import { InputGroup, InputGroupText, Input, Tooltip } from "reactstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faCaretLeft as faLeftHour,
  faCaretRight as faRightHour,
  faAngleLeft as faLeftDay,
  faAngleRight as faRightDay,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "bootstrap-daterangepicker/daterangepicker.css";
import { Trans } from "@lingui/react";
import "./css/DatePicker.css";

export default function DatePicker({ datetime, onDateChange }) {
  const [tooltipCalendarOpen, setTooltipCalendarOpen] = useState(false);
  const [tooltipBackHourOpen, setTooltipBackHourOpen] = useState(false);
  const [tooltipForwardHourOpen, setTooltipForwardHourOpen] = useState(false);
  const [tooltipBackDayOpen, setTooltipBackDayOpen] = useState(false);
  const [tooltipForwardDayOpen, setTooltipForwardDayOpen] = useState(false);
  const [internalDatetime, setInternalDatetime] = useState(
    typeof datetime === "string" ? parseFloat(datetime) : datetime
  );

  useEffect(() => {
    setInternalDatetime(
      typeof datetime === "string" ? parseFloat(datetime) : datetime
    );
  }, [datetime]);

  const toggleTooltip = (tip) => {
    if (tip === "tooltipCalendarOpen") setTooltipCalendarOpen((v) => !v);
    if (tip === "tooltipBackHourOpen") setTooltipBackHourOpen((v) => !v);
    if (tip === "tooltipForwardHourOpen") setTooltipForwardHourOpen((v) => !v);
    if (tip === "tooltipBackDayOpen") setTooltipBackDayOpen((v) => !v);
    if (tip === "tooltipForwardDayOpen") setTooltipForwardDayOpen((v) => !v);
  };

  const onDateTimeChange = (dt) => {
    onDateChange({ startDate: dt });
  };

  const dt = internalDatetime;

  return (
    <div className="DatePicker">
      <span
        className="DatePickerSpan"
        onClick={() =>
          onDateTimeChange(moment(dt - 24 * 60 * 60 * 1000))
        }
        id="oneDayBack"
      >
        <FontAwesomeIcon icon={faLeftDay} size="2x" />
      </span>
      <span
        className="DatePickerSpan"
        onClick={() => onDateTimeChange(moment(dt - 60 * 60 * 1000))}
        id="oneHourBack"
      >
        <FontAwesomeIcon icon={faLeftHour} size="2x" />
      </span>
      <DateRangePicker
        startDate={moment.unix(dt / 1000)}
        alwaysShowCalendars={true}
        showDropdowns={true}
        singleDatePicker={true}
        timePicker={true}
        timePicker24Hour={true}
        timePickerIncrement={60}
        onApply={(event, picker) => onDateTimeChange(picker.startDate)}
      >
        <InputGroup id="ParamodCalendar">
          <InputGroupText>
            <span className="DatePickerCalendar">
              <FontAwesomeIcon icon={faCalendarAlt} size="2x" />
            </span>
          </InputGroupText>
          <Input
            placeholder={moment.unix(dt / 1000).format("YYYY-MM-DD HH:00")}
            className="DatePickerInput"
          />
        </InputGroup>
      </DateRangePicker>
      <span
        className="DatePickerSpan"
        onClick={() => onDateTimeChange(moment(dt + 60 * 60 * 1000))}
        id="oneHourForward"
      >
        <FontAwesomeIcon icon={faRightHour} size="2x" />
      </span>
      <span
        className="DatePickerSpan"
        onClick={() =>
          onDateTimeChange(moment(dt + 24 * 60 * 60 * 1000))
        }
        id="oneDayForward"
      >
        <FontAwesomeIcon icon={faRightDay} size="2x" />
      </span>
      <Tooltip
        placement="bottom"
        isOpen={tooltipBackHourOpen}
        target="oneHourBack"
        toggle={() => toggleTooltip("tooltipBackHourOpen")}
      >
        <Trans id="tooltipForwardkHour">One hour backward</Trans>
      </Tooltip>
      <Tooltip
        placement="bottom"
        isOpen={tooltipForwardHourOpen}
        target="oneHourForward"
        toggle={() => toggleTooltip("tooltipForwardHourOpen")}
      >
        <Trans id="tooltipBackHour">One hour forward</Trans>
      </Tooltip>
      <Tooltip
        placement="bottom"
        isOpen={tooltipForwardDayOpen}
        target="oneDayForward"
        toggle={() => toggleTooltip("tooltipForwardDayOpen")}
      >
        <Trans id="tooltipForwardDay">One day forward</Trans>
      </Tooltip>
      <Tooltip
        placement="bottom"
        isOpen={tooltipBackDayOpen}
        target="oneDayBack"
        toggle={() => toggleTooltip("tooltipBackDayOpen")}
      >
        <Trans id="tooltipBackDay">One day backward</Trans>
      </Tooltip>
      <Tooltip
        placement="bottom"
        isOpen={tooltipCalendarOpen}
        target="ParamodCalendar"
        toggle={() => toggleTooltip("tooltipCalendarOpen")}
      >
        <Trans id="tooltipCalenda">Click to select date and hour</Trans>
      </Tooltip>
    </div>
  );
}
