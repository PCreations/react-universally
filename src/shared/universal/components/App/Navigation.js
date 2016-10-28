import React from 'react';
import { Link } from 'react-router';

const Navigation = (props) => {
  return (
    <nav className={props.className}>
      <ul>
        <li><Link activeClassName={props.activeClassName} to='/'>Home</Link></li>
        <li><Link activeClassName={props.activeClassName} to='/about'>About</Link></li>
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  activeClassName: React.PropTypes.string,
  className: React.PropTypes.string
};


Navigation.defaultProps = {
  activeClassName: '',
  className: ''
};

export default Navigation;
