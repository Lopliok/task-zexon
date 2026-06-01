export interface FormValues {
  uuid: string;
  battery_percent: string;
}

export interface FormErrors {
  uuid?: string;
  battery_percent?: string;
}

export function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.uuid.trim()) {
    errors.uuid = "uuid je povinné";
  }

  const battery = values.battery_percent.trim();
  if (!battery) {
    errors.battery_percent = "battery_percent je povinné";
  } else {
    const num = Number(battery);
    if (!Number.isFinite(num)) {
      errors.battery_percent = "battery_percent musí být číslo";
    } else if (num < 0 || num > 100) {
      errors.battery_percent = "battery_percent musí být od 0 do 100";
    }
  }

  return errors;
}

export function isValid(errors: FormErrors): boolean {
  return Object.keys(errors).length === 0;
}
