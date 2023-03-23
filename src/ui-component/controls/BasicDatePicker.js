import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';


export default function BasicDatePicker(props) {

  const { name, label, value, onChange } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name, value
    }
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateField']}>
        <DateField
          variant="outlined"
          label={label}
          name={name}
          value={value}
          onChange={date => onChange(convertToDefEventPara(name, date))}
          format="MM-DD-YYYY"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}