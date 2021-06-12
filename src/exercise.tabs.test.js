import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import data from "./data";
import Tabs, { styles } from "./components/Tabs";

describe("Tabs", () => {
  test("First tab is active", () => {
    const result = render(<Tabs data={data} />);
    const element = screen.getByTestId("tab-0");
    expect(element.innerHTML).toEqual(data[0].name);
  });

  test("When user click tab is active", () => {
    const result = render(<Tabs data={data} />);
    const tab = screen.getByTestId("tab-2");
    const panel = screen.getByTestId("panel");
    userEvent.click(tab);
    expect(tab.innerHTML).toEqual(data[2].name); // 3 tab
    expect(panel.innerHTML).toEqual(data[2].description); // 3 panel
  });

  test("check active style", () => {
    const { container } = render(<Tabs data={data} />);
    const tab = screen.getByTestId("tab-2");
    const panel = screen.getByTestId("panel");

    userEvent.click(tab);
    const style = window.getComputedStyle(tab);
    expect(panel.innerHTML).toEqual(data[2].description); // 3 panel

    expect(tab).toMatchInlineSnapshot(`
      <div
        class="Tab"
        data-testid="tab-2"
        style="display: inline-block; padding: 10px; margin: 10px; border-bottom: 4px solid; border-bottom-color: #000; cursor: pointer;"
      >
        Tennis
      </div>
    `);
  });
});
