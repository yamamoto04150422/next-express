import { Meta, StoryFn } from "@storybook/react";

import MaskedCalendar, { MaskedCalendarProps } from "./MaskedCalendar";

export default {
  title: "Components/molecules/MaskedCalendar",
  component: MaskedCalendar,
  argTypes: {
    id: { control: "text" },
    colorChangeDates: {
      control: "object",
    },
  },
} as Meta<MaskedCalendarProps>;

const Template: StoryFn<MaskedCalendarProps> = (args) => (
  <MaskedCalendar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "testId1",
  colorChangeDates: [new Date()],
};

export const Secondary = Template.bind({});
Secondary.args = {
  id: "testId2",
  colorChangeDates: [new Date(), new Date(2024, 11, 10)],
};
Secondary.parameters = {
  docs: {
    description: {
      story: "本日と2024/12/10の色が変更されている",
    },
  },
};
