import {ComponentStory, ComponentMeta} from "@storybook/react";
import React from "react";
import {action} from "@storybook/addon-actions";
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "../stories/additions/ReduxStoreProviderDecorator";

export default {
    title: "AppWithRedux Example",
    component: AppWithRedux,
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

const callback = action("button pressed")

export const AppWithReduxBaseExample = () => {
    return <AppWithRedux/>
}