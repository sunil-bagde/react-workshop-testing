import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContentToggle from "./components/ContentToggle";
import StatefulContentToggle from "./components/StatefulContentToggle";
import Tabs from "./components/Tabs";
import Droppable from "./components/Droppable";

describe("<ContentToggle />", () => {
    it("renders its summary inside button", () => {
        const node = document.createElement("div");
        ReactDOM.render(<ContentToggle summary="Tacos" />, node);

        const button = node.querySelector("button");
        expect(button).not.toBe(null);
        expect(button.innerHTML).toEqual("Tacos");
    });
    describe("by default", () => {
        it("is closed does not render its children", () => {
            const node = document.createElement("div");
            ReactDOM.render(
                <ContentToggle summary="Tacos">
                    <p>The Best</p>
                </ContentToggle>,
                node
            );
            expect(node.innerHTML).not.toContain("The Best");
        });
    });

    describe("when isOpen='true'", () => {
        it("renders its children", () => {
            const node = document.createElement("div");
            ReactDOM.render(
                <ContentToggle summary="Tacos" isOpen={true}>
                    <p>The Best</p>
                </ContentToggle>,
                node
            );
            expect(node.innerHTML).toContain("The Best");
            expect(node.querySelector("p").textContent).toBe("The Best");
        });
    });
});

describe("StatefulContentToggle", () => {
    describe("by default", () => {
        it("is close", () => {});
    });

    describe("when the button is clicked", () => {
        test("is open", () => {
            const result = render(
                <StatefulContentToggle summary="Tacos">
                    <p>The best</p>
                </StatefulContentToggle>
            );
            userEvent.click(screen.getByText("Tacos"));

            expect(
                result.container.querySelector("#content").innerHTML
            ).toContain("The best");
        });
    });
});
