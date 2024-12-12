import { Meta, StoryObj } from "@storybook/react";

import ActionButton from "./ActionButton";

const meta: Meta<typeof ActionButton> = {
  component: ActionButton,
};

export default meta;

type Story = StoryObj<typeof ActionButton>;

export const Primary: Story = {
  args: {
    // 必要なpropsをここに追加
  },
};