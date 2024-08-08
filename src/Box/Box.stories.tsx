import type { Meta, StoryObj } from '@storybook/react';
import style from './BoxExample.module.css'
import  '../index.css'

import { Box } from './Box';
import { list } from '../static';

const meta: Meta<typeof Box> = {
  component: Box,
  title: 'Example/Box', 
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Primary: Story = {
  args: {
    className: style.container,
    children: list.map(item => (
      <div
        data-id={`${item.id}`}
        key={item.id}
        className={style.card}
      >
        <img
          className={style.roundedTop}
          src={item.img}
          alt={item.title}
        />
        <h2 className={style.title}>
          {item.title}
        </h2>
      </div>
    )),
  },
};