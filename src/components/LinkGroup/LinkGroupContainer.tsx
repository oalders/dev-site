import PropTypes from 'prop-types';
import * as React from 'react';

import { ILinkGroup } from './LinkGroup';
import styles from './LinkGroup.module.scss';

interface ILinkGroupContainer {
  children: React.ReactElement<ILinkGroup> | React.ReactElement<ILinkGroup>[],
}

const LinkGroupContainer: React.FC<ILinkGroupContainer> = (props) => {
  return(
    <div
      className={styles.sections}
    >
      {props.children}
    </div>
  );
};

LinkGroupContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
    PropTypes.element.isRequired,
  ]).isRequired,
};

export default LinkGroupContainer;
