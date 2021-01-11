import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { IconType } from 'react-icons';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimesCircle,
} from 'react-icons/fa';

import { renderMarkdown } from '../utils/markdown';
import styles from './Alert.module.scss';

interface IAlert {
  children: React.ReactNode,
  type: 'error' | 'info' | 'success' | 'warning'
}

const Alert: React.FC<IAlert> = (props) => {
  let Icon: IconType;

  switch(props.type) {
  case 'error':
    Icon = FaTimesCircle;
    break;
  case 'success':
    Icon = FaCheckCircle;
    break;
  case 'warning':
    Icon = FaExclamationCircle;
    break;
  case 'info':
    Icon = FaInfoCircle;
    break;
  }

  return (
    <div
      className={classNames(
        styles.alert,
        props.type && styles[props.type],
      )}
    >
      <Icon
        className={styles.icon}
      />
      {renderMarkdown(props.children)}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    'error',
    'info',
    'success',
    'warning',
  ] as const).isRequired,
};

export default Alert;
