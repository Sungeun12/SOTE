import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Path = props => (
  <motion.path fill="transparent" strokeLineCap="round" strokeWidth="3" {...props} />
);

const transition = { duration: 0.3 };

function MenuToggle({ toggle, isOpen }) {
  return (
    <Button onClick={toggle}>
      <svg width="23" height="21" viewBox="0 0 22 22">
        <Path
          animate={isOpen ? 'open' : 'closed'}
          initial={false}
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5', stroke: 'hsl(0, 0%, 18%)' },
            open: { d: 'M 3 16.5 L 17 2.5', stroke: 'hsl(0, 0%, 18%)' },
          }}
          transition={transition}
        />
        <Path
          animate={isOpen ? 'open' : 'closed'}
          initial={false}
          variants={{
            closed: { d: 'M 2 9.423 L 20 9.423', stroke: 'hsl(0, 0%, 18%)', opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={transition}
        />
        <Path
          animate={isOpen ? 'open' : 'closed'}
          initial={false}
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346', stroke: 'hsl(0, 0%, 18%)' },
            open: { d: 'M 3 2.5 L 17 16.346', stroke: 'hsl(0, 0%, 18%)' },
          }}
          transition={transition}
        />
      </svg>
    </Button>
  );
}

const Button = styled.div`
  cursor: pointer;
  z-index: 99;
  height: 21px;
`;

export default MenuToggle;
