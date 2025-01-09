import type { Meta, StoryObj } from '@storybook/angular';
import { AddressFormComponent } from './address-form.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<AddressFormComponent> = {
  component: AddressFormComponent,
  title: 'AddressFormComponent',
};
export default meta;
type Story = StoryObj<AddressFormComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/address-form works!/gi)).toBeTruthy();
  },
};
