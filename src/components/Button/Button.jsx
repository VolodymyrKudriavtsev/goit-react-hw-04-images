import PropTypes from 'prop-types';
import css from './button.module.css';

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className={css.button} type="button">
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
