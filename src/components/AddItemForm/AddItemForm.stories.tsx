import AddItemForm from "./AddItemForm";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    title: "AddItemForm Example",
    component: AddItemForm,
    argTypes: {},
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemForm_v1 = Template.bind({});

AddItemForm_v1.args = {
    addItem: (title: string) => {
        alert(title)
    }
};

const callback = action("button pressed")

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={callback}/>
}