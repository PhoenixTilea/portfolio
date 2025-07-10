import {Grid} from "@mui/material";
import {DateField} from "@mui/x-date-pickers";
import type {} from "@mui/x-date-pickers/adapterDayjs";
import type {PickerValidDate} from "@mui/x-date-pickers/models";
import dayJs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import type {FC} from "react";
import {memo, useMemo} from "react";

type Props = {
  startDate: Date;
  endDate?: Date;
  onDateChange: (start: Date, end?: Date, valid?: boolean) => void;
};

dayJs.extend(isSameOrBefore);
dayJs.extend(isSameOrAfter);
const minDate = dayJs("2020-10-01");
const maxDate = dayJs();

const JobDateRange: FC<Props> = ({startDate, endDate, onDateChange}) => {
  const start = useMemo(() => dayJs(startDate), [startDate]);
  const end = useMemo(() => endDate ? dayJs(endDate) : undefined, [endDate]);

  const handleStartChange = (value: PickerValidDate | null) => {
    const date = value ?? minDate;
    const isValid = datesValid(date, end ?? maxDate);
    onDateChange(date.toDate(), end?.toDate(), isValid);
  }

  const handleEndChange = (value: PickerValidDate | null) => {
    const isValid = datesValid(start, value ?? maxDate);
    onDateChange(start.toDate(), value?.toDate() ?? undefined, isValid);
  }

  const datesValid = (start: PickerValidDate, end: PickerValidDate): boolean => (
    start.isBefore(end)
    && start.isSameOrAfter(minDate)
    && end.isSameOrBefore(maxDate)
  );

  return (
    <Grid container>
      <Grid size={6}>
        <DateField
          label="Start Date *"
          format="mm-yyyy"
          value={start}
          onChange={handleStartChange}
          minDate={minDate}
          maxDate={end ?? maxDate}
          disableFuture
          required
        />
      </Grid>
      <Grid size={6}>
        <DateField
          label="End Date"
          format="mm-yyyy"
          value={end}
          onChange={handleEndChange}
          clearable
          minDate={start ?? minDate}
          maxDate={maxDate}
        />
      </Grid>
    </Grid>
  );
}

export default memo(JobDateRange);