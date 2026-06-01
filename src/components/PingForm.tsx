import { useState } from "react";
import { sendPing } from "../api/ping";
import { validate, isValid, type FormValues, type FormErrors } from "../validation";
import Message from "./Message";

type Status = "idle" | "loading" | "success" | "error";

export default function PingForm() {
  const [values, setValues] = useState<FormValues>({
    uuid: "",
    battery_percent: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (!isValid(validationErrors)) {
      return;
    }

    setStatus("loading");
    try {
      await sendPing({
        uuid: values.uuid.trim(),
        battery_percent: Number(values.battery_percent),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="uuid">uuid</label>
        <input
          id="uuid"
          name="uuid"
          type="text"
          value={values.uuid}
          onChange={handleChange}
        />
        {errors.uuid && <span className="field-error">{errors.uuid}</span>}
      </div>

      <div className="field">
        <label htmlFor="battery_percent">battery_percent</label>
        <input
          id="battery_percent"
          name="battery_percent"
          type="number"
          value={values.battery_percent}
          onChange={handleChange}
        />
        {errors.battery_percent && (
          <span className="field-error">{errors.battery_percent}</span>
        )}
      </div>

      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send"}
      </button>

      {status === "success" && <Message type="success">Data sent successfully</Message>}
      {status === "error" && (
        <Message type="error">Something went wrong. Please try again.</Message>
      )}
    </form>
  );
}
