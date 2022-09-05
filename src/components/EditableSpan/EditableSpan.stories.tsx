import {ComponentStory, ComponentMeta} from "@storybook/react";
import React from "react";
import {action} from "@storybook/addon-actions";
import EditableSpan from "./EditableSpan";

export default {
    title: "EditableSpan Example",
    component: EditableSpan,
    argTypes: {},
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

const callback = action("Title changed")

export const EditableSpan_v1 = Template.bind({});

EditableSpan_v1.args = {
    onChange: callback,
    title: "Hola",
};

export const EditableSpanBaseExample = () => {
    return <EditableSpan onChange={callback} title={"Hola"}/>
}