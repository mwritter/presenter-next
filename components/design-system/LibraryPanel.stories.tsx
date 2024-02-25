import type { Meta, StoryObj } from "@storybook/react";
import LibraryPanal from "./LibraryPanel";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/LibraryPanal",
  component: LibraryPanal,
  tags: ["autodocs"],
} satisfies Meta<typeof LibraryPanal>;

export default meta;
type Story = StoryObj<typeof LibraryPanal>;

export const Default: Story = { render: () => <LibraryPanal /> };
