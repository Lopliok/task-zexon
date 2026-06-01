import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PingForm from "./PingForm";
import * as api from "../api/ping";

describe("PingForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("zobrazí validační chyby a nevolá API u prázdného formuláře", async () => {
    const spy = vi.spyOn(api, "sendPing");
    render(<PingForm />);

    await userEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(screen.getByText("uuid je povinné")).toBeInTheDocument();
    expect(spy).not.toHaveBeenCalled();
  });

  it("odešle data a zobrazí success zprávu", async () => {
    vi.spyOn(api, "sendPing").mockResolvedValue();
    render(<PingForm />);

    await userEvent.type(screen.getByLabelText("uuid"), "device-1");
    await userEvent.type(screen.getByLabelText("battery_percent"), "85");
    await userEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(await screen.findByText("Data sent successfully")).toBeInTheDocument();
  });

  it("zobrazí chybovou zprávu když API selže", async () => {
    vi.spyOn(api, "sendPing").mockRejectedValue(new Error("fail"));
    render(<PingForm />);

    await userEvent.type(screen.getByLabelText("uuid"), "device-1");
    await userEvent.type(screen.getByLabelText("battery_percent"), "85");
    await userEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });
});
