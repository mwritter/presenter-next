import type { Meta, StoryObj } from "@storybook/react";
import LibraryPanal from "../components/LibraryPanel";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/LibraryPanal",
  component: LibraryPanal,
  tags: ["autodocs"],
} satisfies Meta<typeof LibraryPanal>;

export default meta;
type Story = StoryObj<typeof LibraryPanal>;

export const Default: Story = {
  render: () => (
    <LibraryPanal
      items={[
        {
          path: "/Users/matthewritter/Library/Application Support/com.presenter.dev/Library/Way Maker.json",
          name: "Way Maker.json",
        },
        {
          path: "/Users/matthewritter/Library/Application Support/com.presenter.dev/Library/See A Victory.json",
          name: "See A Victory.json",
        },
      ]}
    />
  ),
};
